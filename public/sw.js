const CACHE_NAME = 'jaiswal-packers-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/icons/icon-72x72-maskable.png',
  '/icons/icon-96x96-maskable.png',
  '/icons/icon-128x128-maskable.png',
  '/icons/icon-144x144-maskable.png',
  '/icons/icon-152x152-maskable.png',
  '/icons/icon-192x192-maskable.png',
  '/icons/icon-384x384-maskable.png',
  '/icons/icon-512x512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});
