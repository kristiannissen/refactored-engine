/**
 * sw.js
 */
const CACHE_NAME = "cache-0.0.1";
let assets = [
  "/static/css/app-shell.css",
  "/static/js/main.bundle.js",
  "/app/",
  "/app/list/",
  "/app/share/"
];
// Assets
self.addEventListener("install", e => {
  console.log("sw install", e);

  e.waitUntil(preCache());
});
// Fetch
self.addEventListener("fetch", e => {
  console.log("sw fetch", e);

  e.respondWith(fromCache(e.request));

  e.waitUntil(updateCache(e.request));
});
// Activate

// Helpers
const preCache = () => {
  return caches.open(CACHE_NAME).then(cache => {
    return cache.addAll(assets);
  });
};

const fromCache = req => {
  return caches.open(CAHCE_NAME).then(cache => {
    return cache.match(req).then(matching => {
      return matching || Promise.reject("no-match");
    });
  });
};

const updateCaache = req => {
  return caches.open(CACHE_NAME).then(cache => {
    return fetch(req).then(resp => {
      return cache.put(req, res);
    });
  });
};
