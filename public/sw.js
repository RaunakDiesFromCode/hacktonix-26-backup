const CACHE_NAME = "hacktonix-v1";

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  "/",
  "/index.html",
  "/header.webp",
  "/logo_hacktonix_small.jpg",
  "/logo_hacktonix_medium.jpg",
  "/logo-text-small.png",
  "/gradient.webp",
  "/gifs/mew.gif",
];

// Install event - precache critical assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    }),
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - NETWORK FIRST, cache only used when offline
self.addEventListener("fetch", (event) => {
  const request = event.request;

  // Only handle GET requests
  if (request.method !== "GET") return;

  // Skip cross-origin requests (like Google Fonts, Cloudflare Turnstile)
  if (!request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    // Try network first
    fetch(request)
      .then((networkResponse) => {
        // Network succeeded - cache the response for offline use
        if (networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(async () => {
        // Network failed (offline) - try to serve from cache
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
          return cachedResponse;
        }

        // For navigation requests, return cached index.html (SPA fallback)
        if (request.mode === "navigate") {
          return caches.match("/index.html");
        }

        // No cache available
        return new Response("Offline - content not available", {
          status: 503,
          statusText: "Service Unavailable",
        });
      }),
  );
});
