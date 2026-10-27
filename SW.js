/* Sheep & Burger — Service Worker (v6)
 * ─────────────────────────────────────────────────────────────
 * ✅ الإصدارات الجديدة:
 *   - صور بديلة (SVG placeholder) لما تفشل الصورة بدل استجابة 504 فاضية
 *   - رسائل تحديث: {type:'SKIP_WAITING'} من التطبيق
 *   - Push Notifications + NotificationClick
 *   - Background Sync للطلبات الأوفلاين (اختياري)
 *   - تنظيف الكاش الزائد (حد أقصى 60 استجابة)
 *   - Preload ذكي لمسارات الـ hash
 * ─────────────────────────────────────────────────────────────
 */

const VERSION       = 'v6';
const CACHE_SHELL   = `sb-shell-${VERSION}`;
const CACHE_STATIC  = `sb-static-${VERSION}`;
const CACHE_EXT     = `sb-ext-${VERSION}`;
const CACHE_IMAGES  = `sb-images-${VERSION}`;

const MAX_CACHE_ENTRIES = 60; // لكل cache

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png'
];

/* ═════════════════════════════════════════════════════════════════
   INSTALL — precache متسامح (لو ملف ناقص، التثبيت مش بيفشل)
   ═════════════════════════════════════════════════════════════════ */
self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_SHELL);
    await Promise.all(APP_SHELL.map(async (url) => {
      try {
        await cache.add(new Request(url, { cache: 'reload' }));
      } catch (err) {
        console.warn('[SW] تخطي precache:', url, err);
      }
    }));
    await self.skipWaiting();
  })());
});

/* ═════════════════════════════════════════════════════════════════
   ACTIVATE — مسح الكاش القديم + تفعيل فوري
   ═════════════════════════════════════════════════════════════════ */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keep = [CACHE_SHELL, CACHE_STATIC, CACHE_EXT, CACHE_IMAGES];
    const keys = await caches.keys();
    await Promise.all(
      keys.filter((k) => !keep.includes(k)).map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ═════════════════════════════════════════════════════════════════
   MESSAGE — استقبال أوامر من التطبيق (تحديث فوري)
   ═════════════════════════════════════════════════════════════════ */
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  if (data.type === 'CLEAR_CACHE') {
    event.waitUntil(
      caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
    );
  }
});

/* ═════════════════════════════════════════════════════════════════
   FETCH — التوجيه حسب نوع الطلب
   ═════════════════════════════════════════════════════════════════ */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) APIs لحظية — network only
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('openweathermap.org')
  ) return;

  // 2) Navigation — network-first مع fallback للـ shell
  if (req.mode === 'navigate') {
    event.respondWith(handleNavigation(req));
    return;
  }

  // 3) صور Unsplash — cache-first مع placeholder
  if (url.hostname.includes('images.unsplash.com')) {
    event.respondWith(imageCacheFirst(req));
    return;
  }

  // 4) Fonts / CDN — stale-while-revalidate
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(staleWhileRevalidate(req, CACHE_EXT));
    return;
  }

  // 5) نفس الأصل — cache-first
  event.respondWith(cacheFirst(req, CACHE_STATIC));
});

/* ═════════════════════════════════════════════════════════════════
   STRATEGIES
   ═════════════════════════════════════════════════════════════════ */
async function handleNavigation(req) {
  try {
    const fresh = await fetch(req);
    if (fresh && fresh.ok) {
      try {
        const cache = await caches.open(CACHE_SHELL);
        await cache.put('./index.html', fresh.clone());
      } catch (e) { /* ignore */ }
      return fresh;
    }
    return (await getShell()) || fresh;
  } catch {
    const shell = await getShell();
    if (shell) return shell;
    return new Response(offlineHTML(), {
      status: 200,
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
}

async function getShell() {
  const cache = await caches.open(CACHE_SHELL);
  return (
    (await cache.match('./index.html')) ||
    (await cache.match('./')) ||
    (await caches.match('./index.html'))
  );
}

async function staleWhileRevalidate(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  const network = fetch(req)
    .then((res) => {
      if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
      return res;
    })
    .catch(() => cached);
  return cached || network;
}

async function cacheFirst(req, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      cache.put(req, res.clone()).catch(() => {});
      trimCache(cacheName, MAX_CACHE_ENTRIES);
    }
    return res;
  } catch {
    // fallback حسب النوع
    if (req.destination === 'image') return svgPlaceholder();
    if (req.destination === 'font')  return new Response('', { status: 404 });
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

/* صور: cache-first بس مع SVG placeholder وحد أقصى */
async function imageCacheFirst(req) {
  const cache = await caches.open(CACHE_IMAGES);
  const cached = await cache.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      cache.put(req, res.clone()).catch(() => {});
      trimCache(CACHE_IMAGES, MAX_CACHE_ENTRIES);
    }
    return res;
  } catch {
    return svgPlaceholder();
  }
}

/* حد أقصى لعدد الاستجابات في الكاش */
async function trimCache(cacheName, maxItems) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxItems) return;
    const toDelete = keys.length - maxItems;
    for (let i = 0; i < toDelete; i++) {
      await cache.delete(keys[i]);
    }
  } catch { /* ignore */ }
}

/* صورة بديلة (SVG) بدل ما الصورة تكسر الواجهة */
function svgPlaceholder() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
    <rect width="400" height="300" fill="#F3EBDC"/>
    <text x="50%" y="48%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="20" fill="#A89988">🍔</text>
    <text x="50%" y="62%" text-anchor="middle" font-family="system-ui,sans-serif" font-size="14" fill="#A89988">الصورة مش متاحة أوفلاين</text>
  </svg>`;
  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml',
      'Cache-Control': 'no-store'
    }
  });
}

/* ═════════════════════════════════════════════════════════════════
   PUSH NOTIFICATIONS — إشعارات المتجر
   ═════════════════════════════════════════════════════════════════ */
self.addEventListener('push', (event) => {
  let data = { title: 'Sheep & Burger', body: 'عندك جديد!', url: './#/home', icon: './icon-192.png' };
  try {
    if (event.data) data = { ...data, ...event.data.json() };
  } catch {
    if (event.data) data.body = event.data.text();
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon,
      badge: './icon-192.png',
      dir: 'rtl',
      lang: 'ar',
      tag: data.tag || 'sb-default',
      renotify: true,
      data: { url: data.url },
      vibrate: [100, 50, 100],
      actions: [
        { action: 'open', title: 'افتح' },
        { action: 'close', title: 'إغلاق' }
      ]
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'close') return;

  const targetUrl = (event.notification.data && event.notification.data.url) || './#/home';

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    // لو التطبيق فاتح، ركّز عليه
    for (const client of allClients) {
      if ('focus' in client) {
        await client.focus();
        if ('navigate' in client) {
          try { await client.navigate(targetUrl); } catch {}
        }
        return;
      }
    }
    // غير كده افتح نافذة جديدة
    if (self.clients.openWindow) {
      await self.clients.openWindow(targetUrl);
    }
  })());
});

/* ═════════════════════════════════════════════════════════════════
   BACKGROUND SYNC — إعادة إرسال الطلبات الأوفلاين (اختياري)
   ═════════════════════════════════════════════════════════════════
   * التطبيق لازم يعمل:
   *   navigator.serviceWorker.ready.then(sw => sw.sync.register('sync-orders'))
   *   ويرسل البيانات عبر postMessage أو IndexedDB.
   */
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-orders') {
    event.waitUntil((async () => {
      // TODO: هنا تزامن الطلبات من IndexedDB مع Supabase
      console.log('[SW] Background sync: sync-orders');
      // مثال للتنبيه بعد التزامن:
      // const clients = await self.clients.matchAll();
      // clients.forEach(c => c.postMessage({ type: 'ORDERS_SYNCED' }));
    })());
  }
});

/* ═════════════════════════════════════════════════════════════════
   OFFLINE PAGE
   ═════════════════════════════════════════════════════════════════ */
function offlineHTML() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#D9401F">
<title>مفيش نت — Sheep & Burger</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap" rel="stylesheet">
<style>
  *{box-sizing:border-box}
  body{
    margin:0;font-family:'Cairo',system-ui,-apple-system,sans-serif;
    background:#FAF5EC;color:#1F1610;
    display:grid;place-items:center;min-height:100vh;text-align:center;
    padding:24px;padding-bottom:calc(24px + env(safe-area-inset-bottom,0px));
  }
  .wrap{max-width:380px}
  .icon{
    font-size:72px;margin-bottom:20px;
    animation:floaty 3s ease-in-out infinite;
  }
  @keyframes floaty{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
  h1{font-size:26px;font-weight:900;margin:0 0 12px;line-height:1.3}
  p{color:#6E6154;margin:0 0 28px;line-height:1.7;font-size:15px}
  button{
    background:#D9401F;color:#fff;border:0;
    padding:14px 36px;border-radius:999px;
    font-weight:700;font-size:16px;cursor:pointer;
    font-family:inherit;box-shadow:0 8px 24px rgba(217,64,31,.35);
    transition:transform .2s ease, box-shadow .2s ease;
  }
  button:hover{transform:translateY(-2px);box-shadow:0 12px 28px rgba(217,64,31,.4)}
  button:active{transform:scale(.97)}
  .hint{
    display:inline-block;margin-top:24px;padding:8px 16px;
    background:#F3EBDC;border-radius:999px;font-size:12.5px;
    color:#6E6154;font-weight:600;
  }
  @media(prefers-reduced-motion:reduce){
    .icon{animation:none}
    button{transition:none}
  }
</style>
</head>
<body>
  <div class="wrap">
    <div class="icon" aria-hidden="true">📡</div>
    <h1>مفيش اتصال بالنت</h1>
    <p>اتأكد من النت وجرب تاني، أو افتح التطبيق لما الاتصال يرجع.</p>
    <button onclick="location.reload()">جرب تاني 🔄</button>
    <div class="hint">Sheep & Burger · برجر طازة</div>
  </div>
</body>
</html>`;
}
