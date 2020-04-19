(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./src/serviceworker.js":
/*!******************************!*\
  !*** ./src/serviceworker.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * sw.js
 */
// Helpers


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXdvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwiZmlsZSI6IjUuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBzdy5qc1xuICovXG4vLyBIZWxwZXJzXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgQ0FDSEVfTkFNRSA9IFwiY2FjaGUtMC4wLjFcIjtcbmxldCBhc3NldHMgPSBbXG4gIFwiL3N0YXRpYy9jc3MvYXBwLXNoZWxsLmNzc1wiLFxuICBcIi9zdGF0aWMvc3Zncy9saXN0LWJnLnN2Z1wiLFxuICBcIi9zdGF0aWMvZmF2aWNvbi5pY29cIixcbiAgXCIvc3RhdGljLzE5MngxOTIucG5nXCIsXG4gIFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUxhdG98UGxheWZhaXIrRGlzcGxheSZkaXNwbGF5PXN3YXBcIixcbiAgXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvbGF0by92MTYvUzZ1eXc0Qk1VVFBIang0d1hpV3RGQ2Mud29mZjJcIlxuXTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiaW5zdGFsbFwiLCBldmVudCA9PiB7XG4gIGNvbnNvbGUubG9nKFwic3cgaW5zdGFsbFwiLCBldmVudCk7XG5cbiAgc2VsZi5za2lwV2FpdGluZygpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihDQUNIRV9OQU1FKS50aGVuKGNhY2hlID0+IHtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoYXNzZXRzKTtcbiAgICB9KVxuICApO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImFjdGl2YXRlXCIsIGV2ZW50ID0+IHtcbiAgY29uc29sZS5sb2coXCJzdyBhY3RpdmF0ZVwiLCBldmVudCk7XG5cbiAgc2VsZi5jbGllbnRzLmNsYWltKCk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgY2FjaGVOYW1lc1xuICAgICAgICAgIC5maWx0ZXIoY2FjaGVOYW1lID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZU5hbWUgIT09IENBQ0hFX05BTUU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGNhY2hlTmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIiwgZXZlbnQgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXNcbiAgICAgIC5tYXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgcmVzcCB8fFxuICAgICAgICAgIGZldGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBldmVudC5yZXF1ZXN0Lm1ldGhvZCA9PT0gXCJHRVRcIiAmJlxuICAgICAgICAgICAgICAvYXBwXFwvc2VydmljZS8udGVzdCh1cmwucGF0aE5hbWUgPT0gdHJ1ZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBsZXQgcmVzcENsb25lID0gcmVzcG9uc2UuY2xvbmUoKTtcblxuICAgICAgICAgICAgICAvKmNhY2hlc1xuICAgICAgICAgICAgICAgIC5vcGVuKENBQ0hFX05BTUUpXG4gICAgICAgICAgICAgICAgLnRoZW4oY2FjaGUgPT4gY2FjaGUucHV0KGV2ZW50LnJlcXVlc3QsIHJlc3BDbG9uZSkpO1xuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcmVzcG9uc2U7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJwb3N0XCIsIGVycm9yKSlcbiAgKTtcbn0pO1xuXG5zZWxmLmFkZEV2ZW50TGlzdGVuZXIoXCJzeW5jXCIsIGV2ZW50ID0+IGNvbnNvbGUubG9nKFwic3cgc3luY1wiLCBldmVudCkpO1xuXG5jb25zdCBmcm9tQ2FjaGUgPSByZXF1ZXN0ID0+IHtcbiAgcmV0dXJuIGNhY2hlcy5vcGVuKENBQ0hFX05BTUUpLnRoZW4oY2FjaGUgPT4ge1xuICAgIHJldHVybiBjYWNoZS5tYXRjaChyZXF1ZXN0KS50aGVuKG1hdGNoaW5nID0+IHtcbiAgICAgIHJldHVybiBtYXRjaGluZyB8fCBQcm9taXNlLnJlamVjdChcIm5vIG1hdGNoXCIpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZUNhY2hlID0gcmVxdWVzdCA9PiB7XG4gIHJldHVybiBjYWNoZXMub3BlbihDQUNIRV9OQU1FKS50aGVuKGNhY2hlID0+IHtcbiAgICByZXR1cm4gZmV0Y2gocmVxdWVzdCkudGhlbihyZXNwb25zZSA9PiBjYWNoZS5wdXQocmVxdWVzdCwgcmVzcG9uc2UpKTtcbiAgfSk7XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==