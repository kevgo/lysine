// This is the source code for the service worker.

const cacheKey = "lysine"
const assetNames = ["", "index.html", "index.css", "index.js"]
const url = self.location.pathname.substr(0, self.location.pathname.length - 9)
const filePaths = assetNames.map(filename => url + filename)

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(cacheKey).then(function(cache) {
      return cache.addAll(filePaths)
    })
  )
})

self.addEventListener("activate", event => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener("fetch", event => {
  console.log("request to fetch:", event.url)
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        console.log("found cached file response")
      } else {
        console.log("found cached file response")
      }
      console.log(response)
      return response || fetch(event.request)
    })
  )
})
