const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", function (event) {
  /* console.log("[ServiceWorker] Install");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      // await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
      // await cache.add(new Request("favicon.png"));
      // await cache.add(new Request("assets/fonts/yekan/Sans.woff"));
      // await cache.add(new Request("static/js/bundle.js"));
      // await cache.add(new Request("assets/js/bootstrap.bundle.min.js"));
      // await cache.add(new Request("assets/mmenu-js-master/dist/mmenu.js"));
      // await cache.add(
      //   new Request("assets/mburger-webcomponent-master/dist/mburger/index.js")
      // );
    })()
  );

  self.skipWaiting(); */
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim();
});

self.addEventListener("fetch", function (event) {
  if (event.request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        } catch (error) {
          console.log(
            "[Service Worker] Fetch failed; returning offline page instead.",
            error
          );

          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(OFFLINE_URL);
          return cachedResponse;
        }
      })()
    );
  } else if (event.request.mode === "no-corsss") {
    //console.log(event.request.url);
    event.respondWith(
      (async () => {
        try {
          const cache = await caches.open(CACHE_NAME);
          const cachedResponse = await cache.match(event.request.url);
          console.log(cachedResponse);
          if (typeof cachedResponse === "undefined") {
            const preloadResponse = await event.preloadResponse;
            if (preloadResponse) {
              return preloadResponse;
            }

            const networkResponse = await fetch(event.request);
            return networkResponse;
          } else {
            return cachedResponse;
          }
        } catch (error) {
          const preloadResponse = await event.preloadResponse;
          if (preloadResponse) {
            return preloadResponse;
          }

          const networkResponse = await fetch(event.request);
          return networkResponse;
        }
      })()
    );
  }
});
