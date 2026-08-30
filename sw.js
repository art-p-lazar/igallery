const CACHE_NAME = 'pooneh-lazar-v1';
const URLS_TO_CACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/app.js',
  './images/signboard.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});