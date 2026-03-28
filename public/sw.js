const CACHE_NAME = 'jaiswal-packers-v5';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo.png',
  '/icons/favicon-32x32.png',
  '/icons/icon-72.png',
  '/icons/icon-96.png',
  '/icons/icon-128.png',
  '/logo.png',
  '/icons/icon-152.png',
  '/icons/icon-192.png',
  '/icons/icon-384.png',
  '/icons/icon-512.png',
  '/icons/icon-72-maskable.png',
  '/icons/icon-96-maskable.png',
  '/icons/icon-128-maskable.png',
  '/icons/icon-144-maskable.png',
  '/icons/icon-152-maskable.png',
  '/icons/icon-192-maskable.png',
  '/icons/icon-384-maskable.png',
  '/icons/icon-512-maskable.png'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Network First for navigation requests (HTML)
  const acceptHeader = event.request.headers.get('accept');
  if (event.request.mode === 'navigate' || (acceptHeader && acceptHeader.includes('text/html'))) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          return caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match(event.request).then(response => {
            if (response) return response;
            return caches.match('/');
          });
        })
    );
    return;
  }

  // Cache First for other assets (images, etc.)
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request).then(response => {
          // Don't cache opaque responses or non-success responses
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
  );
});
