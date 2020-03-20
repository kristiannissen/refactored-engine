/**
 * sw.js
 */
var CACHE_NAME = 'cache-0.0.1'
var assets = [
  '/static/css/app-shell.css',
  '/static/js/main.bundle.js',
  '/app/',
  '/app/list/',
  '/app/share/'
]
// Assets
self.addEventListener('install', function(event) {
  console.log('installing')
  event.waitUntil(
    caches.open(CACHE_NAME)
    .then(function(cache) {
      console.log('cache open')
      return cache.addAll(assets)
    })
  )
})
// Fetch
self.addEventListener('fetch', function(event) {
  console.log('fetch', event.request.url)
  event.respondWith(
    caches.match(event.request)
    .then(function(response) {
      if (response) {
        console.log('cache hit', event.request)
        return response
      } else {
        console.log('cache miss', event.request)
        return fetch(event.request)
      }      
    })
  )
})
// Activate
self.addEventListener('activate', function(event) {
  console.log(event)
})