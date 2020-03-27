/**
 * sw.js
 */
// Helpers
const CACHE_NAME = "cache-0.0.1";
let assets = [
  "/static/css/app-shell.css",
  "/static/js/main.bundle.js",
  "/static/svgs/list-bg.svg",
  "/static/favicon.ico",
  "/static/android-chrome-192x192.png",
  "/app/",
  "/app/list/",
  "/app/share/"
];

self.addEventListener("install", event => {
  console.log("sw install", event);
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("sw activate", event);
});

self.addEventListener("fetch", event => {
  console.log("sw fetch", event.request.url);
  event.respondWith(
    caches.match(event.request.url).then(cachedResponse => {
      if (cachedResponse) {
        console.log("sw fetch hit", event.request.url);
        return cachedResponse;
      } else {
        console.log("sw fetch miss", event.request.url);
        return fetch(event.request);
      }
    })
  );
});
