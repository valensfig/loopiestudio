/* ================================================================
   LOOPIESTUDIO — sw.js v9 (Iconos Minimalistas + Ovillo Giratorio)
   ================================================================ */
const CACHE_NAME = 'loopiestudio-v9';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=4',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('api.php')) return;
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request))
  );
});
