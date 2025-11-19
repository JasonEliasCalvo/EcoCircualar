const cacheName = "DefaultCompany-Metaverso-0.1.0";
const contentToCache = [
    "Build/ea153e321edf23b9a40b38d65ce41d01.loader.js",
    "Build/1984b52cc15501383ac7f421be4d9d2c.framework.js",
    "Build/6923d42d318892fc367d14f6478617b7.data",
    "Build/ff480d44087c69516f6b44113b101c60.wasm",
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
