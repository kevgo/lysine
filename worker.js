const cacheName = "lysine"
const filesToCache = ["/lysine/", "/lysine/index.html", "/lysine/index.css", "/lysine/index.js"]

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache)
    })
  )
})

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then(response => {
      return response || fetch(event.request)
    })
  )
})
