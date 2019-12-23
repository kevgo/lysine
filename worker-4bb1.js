// This is the source code for the service worker.

const CACHE_KEY = "lysine"

self.addEventListener("install", async function() {
  const cache = await caches.open(CACHE_KEY)
  return cache.add(self.location.pathname.substr(0, self.location.pathname.length - 9))
})

self.addEventListener("activate", async function() {
  await self.clients.claim()
})

self.addEventListener("fetch", async function(event) {
  const cache = await caches.open(CACHE_KEY)
  const cached = await cache.match(event.request)
  if (cached) {
    return cached
  }
  const fetched = await fetch(event.request)
  cache.put(event.request, fetched.clone())
  return fetched
})
