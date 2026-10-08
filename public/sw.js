/* TCF Prep — Service Worker (PWA).
 * Enregistré uniquement en production (HTTPS requis par Safari/iOS).
 * Stratégie : network-first pour la navigation, cache-first pour les assets.
 */
const CACHE = "tcf-prep-v2";
const START_URL = "/dashboard";
const PRECACHE = [START_URL, "/", "/login", "/grammaire", "/vocabulaire", "/manifest.json"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Navigation : network-first, puis fallback sur la dernière page mise en cache
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
          return response;
        })
        .catch(() =>
          caches.match(request).then((cached) => cached || caches.match(START_URL))
        )
    );
    return;
  }

  // Assets & pages (API données incluses) : cache-first
  event.respondWith(
    caches.match(request).then(
      (cached) =>
        cached ||
        fetch(request)
          .then((response) => {
            if (response.ok) {
              const copy = response.clone();
              caches.open(CACHE).then((cache) => cache.put(request, copy)).catch(() => {});
            }
            return response;
          })
          .catch(() => caches.match(START_URL))
    )
  );
});