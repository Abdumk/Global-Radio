// public/sw.js
const CACHE_NAME = "radio-app-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/assets/**", // Vite puts JS/CSS here
  "/icon-192.png",
  "/icon-512.png",
  "/manifest.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache).catch((err) => {
        console.warn("Failed to cache:", err);
      });
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    clients.claim()
  );
});

self.addEventListener("fetch", (event) => {
  // Cache HTML, CSS, JS, images
  if (event.request.destination === "document" ||
      event.request.destination === "script" ||
      event.request.destination === "style" ||
      event.request.destination === "image") {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});