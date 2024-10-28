const cacheName = "MiDES-DesignerKit-0.1.0";
const contentToCache = [
    "Build/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js",
    "Build/6da6446d90c050c1834e3e852e54a734.framework.js",
    "Build/92730a87ffa0d44502143f74d3f4e670.data",
    "Build/bde4b2814ae68b3162d64e2b32cf7a1b.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
