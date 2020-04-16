webpackJsonp([9],{

/***/ 9:
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


/***/ })

});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvc2VydmljZXdvcmtlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7QUFDWDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIIiwiZmlsZSI6IjkuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBzdy5qc1xuICovXG4vLyBIZWxwZXJzXG5cInVzZSBzdHJpY3RcIjtcblxuY29uc3QgQ0FDSEVfTkFNRSA9IFwiY2FjaGUtMC4wLjFcIjtcbmxldCBhc3NldHMgPSBbXG4gIFwiL3N0YXRpYy9jc3MvYXBwLXNoZWxsLmNzc1wiLFxuICBcIi9zdGF0aWMvc3Zncy9saXN0LWJnLnN2Z1wiLFxuICBcIi9zdGF0aWMvZmF2aWNvbi5pY29cIixcbiAgXCIvc3RhdGljLzE5MngxOTIucG5nXCIsXG4gIFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3M/ZmFtaWx5PUxhdG98UGxheWZhaXIrRGlzcGxheSZkaXNwbGF5PXN3YXBcIixcbiAgXCJodHRwczovL2ZvbnRzLmdzdGF0aWMuY29tL3MvbGF0by92MTYvUzZ1eXc0Qk1VVFBIang0d1hpV3RGQ2Mud29mZjJcIlxuXTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiaW5zdGFsbFwiLCBldmVudCA9PiB7XG4gIGNvbnNvbGUubG9nKFwic3cgaW5zdGFsbFwiLCBldmVudCk7XG5cbiAgc2VsZi5za2lwV2FpdGluZygpO1xuXG4gIGV2ZW50LndhaXRVbnRpbChcbiAgICBjYWNoZXMub3BlbihDQUNIRV9OQU1FKS50aGVuKGNhY2hlID0+IHtcbiAgICAgIHJldHVybiBjYWNoZS5hZGRBbGwoYXNzZXRzKTtcbiAgICB9KVxuICApO1xufSk7XG5cbnNlbGYuYWRkRXZlbnRMaXN0ZW5lcihcImFjdGl2YXRlXCIsIGV2ZW50ID0+IHtcbiAgY29uc29sZS5sb2coXCJzdyBhY3RpdmF0ZVwiLCBldmVudCk7XG5cbiAgc2VsZi5jbGllbnRzLmNsYWltKCk7XG5cbiAgZXZlbnQud2FpdFVudGlsKFxuICAgIGNhY2hlcy5rZXlzKCkudGhlbihjYWNoZU5hbWVzID0+IHtcbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgY2FjaGVOYW1lc1xuICAgICAgICAgIC5maWx0ZXIoY2FjaGVOYW1lID0+IHtcbiAgICAgICAgICAgIHJldHVybiBjYWNoZU5hbWUgIT09IENBQ0hFX05BTUU7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAubWFwKGNhY2hlTmFtZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVzLmRlbGV0ZShjYWNoZU5hbWUpO1xuICAgICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pXG4gICk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwiZmV0Y2hcIiwgZXZlbnQgPT4ge1xuICBldmVudC5yZXNwb25kV2l0aChcbiAgICBjYWNoZXNcbiAgICAgIC5tYXRjaChldmVudC5yZXF1ZXN0KVxuICAgICAgLnRoZW4ocmVzcCA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgcmVzcCB8fFxuICAgICAgICAgIGZldGNoKGV2ZW50LnJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IG5ldyBVUkwoZXZlbnQucmVxdWVzdC51cmwpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBldmVudC5yZXF1ZXN0Lm1ldGhvZCA9PT0gXCJHRVRcIiAmJlxuICAgICAgICAgICAgICAvYXBwXFwvc2VydmljZS8udGVzdCh1cmwucGF0aE5hbWUgPT0gdHJ1ZSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBsZXQgcmVzcENsb25lID0gcmVzcG9uc2UuY2xvbmUoKTtcblxuICAgICAgICAgICAgICBjYWNoZXNcbiAgICAgICAgICAgICAgICAub3BlbihDQUNIRV9OQU1FKVxuICAgICAgICAgICAgICAgIC50aGVuKGNhY2hlID0+IGNhY2hlLnB1dChldmVudC5yZXF1ZXN0LCByZXNwQ2xvbmUpKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICB9KVxuICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwicG9zdFwiLCBlcnJvcikpXG4gICk7XG59KTtcblxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwic3luY1wiLCBldmVudCA9PiBjb25zb2xlLmxvZyhcInN3IHN5bmNcIiwgZXZlbnQpKTtcblxuY29uc3QgZnJvbUNhY2hlID0gcmVxdWVzdCA9PiB7XG4gIHJldHVybiBjYWNoZXMub3BlbihDQUNIRV9OQU1FKS50aGVuKGNhY2hlID0+IHtcbiAgICByZXR1cm4gY2FjaGUubWF0Y2gocmVxdWVzdCkudGhlbihtYXRjaGluZyA9PiB7XG4gICAgICByZXR1cm4gbWF0Y2hpbmcgfHwgUHJvbWlzZS5yZWplY3QoXCJubyBtYXRjaFwiKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5jb25zdCB1cGRhdGVDYWNoZSA9IHJlcXVlc3QgPT4ge1xuICByZXR1cm4gY2FjaGVzLm9wZW4oQ0FDSEVfTkFNRSkudGhlbihjYWNoZSA9PiB7XG4gICAgcmV0dXJuIGZldGNoKHJlcXVlc3QpLnRoZW4ocmVzcG9uc2UgPT4gY2FjaGUucHV0KHJlcXVlc3QsIHJlc3BvbnNlKSk7XG4gIH0pO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3NlcnZpY2V3b3JrZXIuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSA5Il0sInNvdXJjZVJvb3QiOiIifQ==