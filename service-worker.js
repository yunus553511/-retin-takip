const CACHE_NAME = 'extruzyon-kalip-arama-v2';
const urlsToCache = [
  './',
  './index.html',
  './style.css',
  './icons.js',
  './manifest.json'
];

// Icon URL'lerini saklamak için
let iconUrls = {};

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  // Icon istekleri için özel işleme
  if (event.request.url.includes('/icons/icon-')) {
    const iconSize = event.request.url.includes('192x192') ? '192' : '512';
    if (iconUrls[iconSize]) {
      event.respondWith(fetch(iconUrls[iconSize]));
      return;
    }
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// İkon URL'lerini al
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'ICONS_READY') {
    iconUrls = event.data.icons;
    console.log('Received icon URLs in service worker');
  }
});
