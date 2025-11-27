const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/e44a56aec4ea4bd146e240f5611f96db.loader.js",
    "Build/0110c139a0f9bedb85dad73d8bbfe4a6.framework.js",
    "Build/7b3eb5791176d45000c7f2601655fbe5.data",
    "Build/18a5a8422d8c3ad42e8f59d09440d81d.wasm",
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
