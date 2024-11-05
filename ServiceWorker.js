const cacheName = "MiDES-DesignerKit-0.1.0";
const contentToCache = [
    "Build/bb0d9ecdb05db3e84da20bd14a4f84dc.loader.js",
    "Build/b3a5797b50d202b59b7c74b1a50764d0.framework.js",
    "Build/533b0900d2556fcfac95aadc9521f797.data",
    "Build/ad744f2e8fcea060d04fbffd91f1bcbb.wasm",
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
