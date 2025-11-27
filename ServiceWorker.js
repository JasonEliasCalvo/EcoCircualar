const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/cee3bfd5589651a8b16e2a12b8abe5b3.loader.js",
    "Build/0110c139a0f9bedb85dad73d8bbfe4a6.framework.js.unityweb",
    "Build/1a4e437da08184049c9601c3780dfa10.data.unityweb",
    "Build/7241a171b4d082551c510f804e0c1091.wasm.unityweb",
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
