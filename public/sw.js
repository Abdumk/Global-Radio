// // public/sw.js
// const CACHE_NAME = "radio-app-v1";
// const urlsToCache = [
//   "/",
//   "/index.html",
//   "/assets/**", // Vite puts JS/CSS here
//   "/icon-192.png",
//   "/icon-512.png",
//   "/manifest.json",
// ];

// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       return cache.addAll(urlsToCache).catch((err) => {
//         console.warn("Failed to cache:", err);
//       });
//     })
//   );
//   self.skipWaiting();
// });

// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     clients.claim()
//   );
// });

// self.addEventListener("fetch", (event) => {
//   // Cache HTML, CSS, JS, images
//   if (event.request.destination === "document" ||
//       event.request.destination === "script" ||
//       event.request.destination === "style" ||
//       event.request.destination === "image") {
//     event.respondWith(
//       caches.match(event.request).then((response) => {
//         return response || fetch(event.request);
//       })
//     );
//   }
// });
// public/sw.js
const CACHE_NAME = "radio-app-v3";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192.png",
  "/icon-512.png",
];

// Install → pre-cache app shell
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

// Activate → clear old cache
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

// Fetch handler
self.addEventListener("fetch", (event) => {
  const req = event.request;

  // Ignore radio streams (network only)
  if (req.url.includes("radiofrance.fr") || req.url.includes("stream")) {
    return;
  }

  // Cache-first strategy
  event.respondWith(
    caches.match(req).then((res) =>
      res ||
      fetch(req).then((fetchRes) => {
        if (req.method === "GET" && fetchRes.status === 200) {
          const respClone = fetchRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, respClone));
        }
        return fetchRes;
      })
    )
  );
});
