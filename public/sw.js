
self.addEventListener("install", (e) => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(clients.claim());
});

self.addEventListener("fetch", (e) => {
  // Cache HTML, CSS, JS
  if (e.request.destination === "document" || e.request.destination === "style" || e.request.destination === "script") {
    e.respondWith(
      caches.match(e.request).then((r) => r || fetch(e.request))
    );
  }
});