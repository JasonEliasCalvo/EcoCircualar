const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/e44a56aec4ea4bd146e240f5611f96db.loader.js",
    "Build/afdc48bbd36607ce00828760d9abcea7.framework.js",
    "Build/6506327d635a3a7f61b6f3cb3cc2967b.data",
    "Build/c30e717472ba502246fe2fd401644a05.wasm",
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
