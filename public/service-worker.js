const CACHE_NAME = "submission-1-pwa";
const urlsToCache = [
    "/",
    "/manifest.json",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2",
    "/nav.html",
    "/index.html",
    "/pages/home.html",
    "/pages/galaxy.html",
    "/pages/bima-sakti.html",
    "/pages/about.html",
    "/css/materialize.min.css",
    "/js/materialize.min.js",
    "/js/sw-register.js ",
    "/js/nav.js",
    "/img/2.jpg",
    "/img/merkuri.jpeg",
    "/img/venus.jpg",
    "/img/bumi.jpg",
    "/icon/favicon.ico",
    "/icon/favicon-16x16.png",
    "/icon/favicon-32x32.png",
    "/icon/favicon-96x96.png",
    "/icon/apple-icon.png",
    "/icon/maskable-icon-192x192.png",
    "/icon/maskable-icon-512x512.png",
    "/icon/android-icon-36x36.png",
    "/icon/android-icon-48x48.png",
    "/icon/android-icon-72x72.png",
    "/icon/android-icon-96x96.png",
    "/icon/android-icon-144x144.png",
    "/icon/android-icon-192x192.png",
    "/icon/apple-icon-57x57.png",
    "/icon/apple-icon-60x60.png",
    "/icon/apple-icon-72x72.png",
    "/icon/apple-icon-76x76.png",
    "/icon/apple-icon-114x114.png",
    "/icon/apple-icon-120x120.png",
    "/icon/apple-icon-144x144.png",
    "/icon/apple-icon-152x152.png",
    "/icon/apple-icon-180x180.png",
    "/icon/apple-icon-precomposed.png",
    "/icon/icon-192x192.png",
    "/icon/icon-256x256.png",
    "/icon/icon-384x384.png",
    "/icon/icon-512x512.png",
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches
            .match(event.request, {cacheName: CACHE_NAME})
            .then(function (response) {
                if (response) {
                    console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
                    return response;
                }
                console.log(
                    "ServiceWorker: Memuat aset dari server: ",
                    event.request.url
                );
                return fetch(event.request);
            })
    );
});

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
