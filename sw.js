const appShellCacheName = 'app-shell-v1';
const appShellFilesToCache = [
    // TODO: 2a - Declare files and URLs to cache at Service Worker installation
    '/',
    '/assets/css/desktop.css',
    '/assets/css/fonts.css',
    '/assets/css/mobile.css',
    '/assets/css/normalize.css',
    '/assets/css/shell.css',
    '/assets/fonts/balsamiq-sans-v1-latin-700.woff',
    '/assets/js/dexie.min.js',
    '/assets/js/fontawesome-pro-5.13.0.min.js',
    '/assets/js/lazysizes.min.js',
    '/assets/js/trending.js',
    '/assets/js/saved.js',
    '/assets/js/search.js',
];

const appCaches = [
    appShellCacheName,
];

// TODO: 2b - On install, add app shell files to cache
self.addEventListener('install', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.open(appShellCacheName)
    .then(cache => {
      return cache.addAll(appShellFilesToCache);
    })
  );
});

// TODO: 2c - On activation, remove obsolete caches
self.addEventListener('activate', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return false;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      )
    })
  );
});

// TODO: 2d - On intercepted fetch, use the strategy of your choice to respond to requests
self.addEventListener('fetch', event => {
  console.log('Attempting to install service worker and cache static assets');
  event.respondWith(
    caches.open('dynamic-cache').then(cache => {
      return cache.match(event.request).then(response => {
        var fetchPromise = fetch(event.request).then(networkResponse => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        })
        return response || fetchPromise;
      })
    })
  );
});