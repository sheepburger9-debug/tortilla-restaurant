/* Tortilla Service Worker — offline shell (tolerant version) */
const CACHE_VERSION = 'tortilla-v3-2';
const EXT_CACHE = 'tortilla-ext-v3';
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    // إصلاح: إضافة كل ملف على حدة حتى لا يفشل التثبيت بالكامل عند نقص أيقونة
    await Promise.all(APP_SHELL.map(async (url) => {
      try { await cache.add(url); }
      catch (err) { console.warn('Precache skipped:', url, err); }
    }));
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
    .then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE_VERSION && k !== EXT_CACHE).map((k) => caches.delete(k))
    ))
    .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  
  const url = new URL(req.url);
  
  // Network-only: real-time data
  if (url.hostname.includes('supabase.co') || url.hostname.includes('openweathermap.org')) return;
  
  // Cache-first with revalidation: fonts, images, CDN
  if (
    url.hostname.includes('fonts.googleapis.com') ||
    url.hostname.includes('fonts.gstatic.com') ||
    url.hostname.includes('images.unsplash.com') ||
    url.hostname.includes('cdn.jsdelivr.net')
  ) {
    event.respondWith(
      caches.open(EXT_CACHE).then((cache) =>
        cache.match(req).then((cached) => {
          const network = fetch(req)
            .then((res) => { if (res.ok) cache.put(req, res.clone()); return res; })
            .catch(() => cached || Response.error());
          return cached || network;
        })
      )
    );
    return;
  }
  
  // Navigation: network-first, fallback to cached index
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
      .then((res) => {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put('./index.html', clone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match('./index.html').then((cached) => cached || caches.match('./')))
    );
    return;
  }
  
  // Same-origin: cache-first, network fallback
  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        if (res.ok && url.origin === self.location.origin) {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, clone)).catch(() => {});
        }
        return res;
      }).catch(() => Response.error());
    })
  );
});