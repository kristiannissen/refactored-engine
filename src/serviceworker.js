/**
 * sw.js
 */
// Helpers
"use strict";

const CACHE_NAME = "cache-0.0.1";
let assets = [
  "/static/css/app-shell.css",
  "/static/svgs/list-bg.svg",
  "/static/favicon.ico",
  "/static/192x192.png",
  "https://fonts.googleapis.com/css?family=Lato|Playfair+Display&display=swap",
  "https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wXiWtFCc.woff2"
];

self.addEventListener("install", event => {
  // console.log("sw install", event);

  self.skipWaiting();

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", event => {
  // console.log("sw activate", event);

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
  event.respondWith(
    caches
      .match(event.request)
      .then(resp => {
        return (
          resp ||
          fetch(event.request).then(response => {
            let url = new URL(event.request.url);
            if (
              event.request.method === "GET" &&
              /app\/service/.test(url.pathName == true)
            ) {
              let respClone = response.clone();

              /*caches
                .open(CACHE_NAME)
                .then(cache => cache.put(event.request, respClone));
              */
            }

            return response;
          })
        );
      })
      .catch(error => console.log("post", error))
  );
});

// self.addEventListener("sync", event => console.log("sw sync", event));

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
