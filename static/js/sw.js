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
  if (/app/.test(event.request.url)) {
    event.respondWith(fromCache(event.request));

    event.waitUntil(updateCache(event.request));
  }
});

const fromCache = request => {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.match(request).then(matching => {
      return matching || Promise.reject("no match");
    });
  });
};

const updateCache = request => {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(request).then(response => cache.put(request, response));
  });
};
