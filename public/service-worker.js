const CACHE_NAME = "pwa2submission";
const urlsToCache = [
    "/",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "https://unpkg.com/snarkdown@1.0.2/dist/snarkdown.umd.js",
    "/manifest.json",
    "/nav.html",
    "/index.html",
    "/football-club.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/saved.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/api.js",
    "/js/idb.js",
    "/js/db.js",
    "/js/sw-register.js",
    "/icon/favicon.ico",
    "/icon/favicon-16x16.png",
    "/icon/favicon-32x32.png",
    "/icon/favicon-96x96.png",
    "/icon/apple-icon.png",
    "/icon/android-icon-36x36.png",
    "/icon/android-icon-48x48.png",
    "/icon/android-icon-72x72.png",
    "/icon/android-icon-96x96.png",
    "/icon/android-icon-144x144.png",
    "/icon/android-icon-192x192.png",
    "/icon/android-icon-512x512.png",
    "/icon/apple-icon-57x57.png",
    "/icon/apple-icon-60x60.png",
    "/icon/apple-icon-72x72.png",
    "/icon/apple-icon-76x76.png",
    "/icon/apple-icon-114x114.png",
    "/icon/apple-icon-120x120.png",
    "/icon/apple-icon-144x144.png",
    "/icon/apple-icon-152x152.png",
    "/icon/apple-icon-180x180.png",
    "/icon/apple-icon-precomposed.png"
];
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
        let base_url = "https://api.football-data.org/v2/";
        let base_url_img = "https://crests.football-data.org/";
        //  if (event.request.url.indexOf(base_url) > -1) {
        if (event.request.url.indexOf(base_url) > -1 || event.request.url.indexOf(base_url_img) > -1) {
            event.respondWith(
                caches.open(CACHE_NAME).then(function (cache) {
                    return fetch(event.request).then(function (response) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    })
                })
            );
        } else {
            event.respondWith(
                caches.match(event.request, {ignoreSearch: true}).then(function (response) {
                    return response || fetch(event.request);
                })
            )
        }
    }
);

self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.map(function (cacheName) {
                    if (cacheName !== CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " dihapus");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    let body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    let options = {
        body: body,
        icon: '/icon/apple-icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
