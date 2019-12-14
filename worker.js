// This is the source code for the service worker.

const cacheKey = "lysine"
const assetNames = ["", "index.html", "index.css", "index.js"]
const url = self.location.pathname.substr(0, self.location.pathname.length - 9)

self.addEventListener("install", async function() {
  const cache = await caches.open(cacheKey)
  return cache.add(url)
})

self.addEventListener("activate", async function() {
  await self.clients.claim()
})

self.addEventListener("fetch", async function(event) {
  console.log("request to fetch:", event.request.url)

  // step 1: look in cache
  const cache = await caches.open(cacheKey)
  const cached = await cache.match(event.request)
  if (cached) {
    console.log("found cached file response")
    console.log(cached)
  } else {
    console.log("no cached file response")
  }
  if (!navigator.onLine) {
    if (!cached) {
      alert("Not online and no cached content found.")
    }
    return
  }

  // fetch from server
  console.log("refreshing", event.request.url)
  const fetchPromise = fetch(event.request)
    .then(function(fetched) {
      console.log("received")
      console.log(fetched)
      // store in cache
      console.log("storing in cache")
      cache.put(event.request, fetched)

      // detect changes
      // if (cached) {
      // const cachedValue = await streamToString(cached.body)
      // console.log("cached value:", cachedValue)
      // const fetchedValue = await streamToString(fetched.body)
      // console.log("fetched value:", fetchedValue)
      // if (cachedValue != fetchedValue) {
      //   // TODO: signal
      // }
      // }
    })
    .catch(function(err) {
      console.log(err)
    })
  return cached || fetchPromise
})

function streamToString(stream) {
  const chunks = []
  return new Promise((resolve, reject) => {
    stream.on("data", chunk => chunks.push(chunk))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")))
  })
}
