/**
 * sw.js
 */
// Helpers
"use strict";

const CACHE_NAME = "cache-0.0.1";
let assets = [
  "/static/css/app-shell.css",
  "/static/js/main.js",
  "/static/svgs/list-bg.svg",
  "/static/favicon.ico",
  "/app/",
  "/app/list/",
  "/app/share/"
];

self.addEventListener("install", event => {
  console.log("sw install", event);

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  console.log("sw activate", event);

  self.clients.claim();

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => {
            return cacheName !== CACHE_NAME;
          })
          .map(cacheName => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", event => {
  console.log("sw fetch", event.request.url);

  event.respondWith(
    caches
      .match(event.request)
      .then(resp => {
        return (
          resp ||
          fetch(event.request).then(response => {
            if (event.request.method === "GET") {
              let respClone = response.clone();

              caches
                .open(CACHE_NAME)
                .then(cache => cache.put(event.request, respClone));
            }

            return response;
          })
        );
      })
      .catch(error => console.log("post", error))
  );
});

self.addEventListener("sync", event => console.log("sw sync", event));

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
