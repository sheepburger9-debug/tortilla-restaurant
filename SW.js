/* Sheep & Burger — Service Worker (نسخة آمنة للـ PWA)
 * - مفيش Response.error() في الـ navigation (ده اللي بيكسر التثبيت)
 * - Fallback = صفحة offline كاملة
 * - Precache متسامح: لو أيقونة ناقصة، التثبيت مش بيفشل
 */
const VERSION = 'v5';
const CACHE_SHELL  = `sb-shell-${VERSION}`;
const CACHE_STATIC = `sb-static-${VERSION}`;
const CACHE_EXT    = `sb-ext-${VERSION}`;

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
];

/* ============ INSTALL ============ */
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

/* ============ ACTIVATE ============ */
self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(
      keys
        .filter((k) => ![CACHE_SHELL, CACHE_STATIC, CACHE_EXT].includes(k))
        .map((k) => caches.delete(k))
    );
    await self.clients.claim();
  })());
});

/* ============ FETCH ============ */
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // 1) APIs لحظية — network only
  if (
    url.hostname.includes('supabase.co') ||
    url.hostname.includes('openweathermap.org')
  ) return;

  // 2) Navigation — network-first، وفي حالة الفشل دايماً shell
  if (req.mode === 'navigate') {
    event.respondWith(handleNavigation(req));
    return;
  }

  // 3) CDN / Fonts / صور — stale-while-revalidate
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(staleWhileRevalidate(req, CACHE_EXT));
    return;
  }

  // 4) نفس الأصل — cache-first
  event.respondWith(cacheFirst(req, CACHE_STATIC));
});

/* ============ STRATEGIES ============ */
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
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
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
    if (res && res.ok) cache.put(req, res.clone()).catch(() => {});
    return res;
  } catch {
    return new Response('', { status: 504, statusText: 'Offline' });
  }
}

/* ============ OFFLINE PAGE ============ */
function offlineHTML() {
  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>مفيش نت — Sheep & Burger</title>
<style>
  body{margin:0;font-family:'Cairo',system-ui,sans-serif;background:#FAF5EC;color:#1F1610;
       display:grid;place-items:center;min-height:100vh;text-align:center;padding:24px}
  h1{font-size:26px;margin:0 0 10px}
  p{color:#6E6154;margin:0 0 24px;max-width:320px;line-height:1.6}
  button{background:#D9401F;color:#fff;border:0;padding:14px 32px;border-radius:999px;
         font-weight:700;font-size:16px;cursor:pointer;font-family:inherit}
  .icon{font-size:64px;margin-bottom:16px}
</style>
</head>
<body>
  <div>
    <div class="icon">📡</div>
    <h1>مفيش اتصال بالنت</h1>
    <p>اتأكد من النت وجرب تاني، أو افتح التطبيق لما الاتصال يرجع.</p>
    <button onclick="location.reload()">جرب تاني</button>
  </div>
</body>
</html>`;
}
