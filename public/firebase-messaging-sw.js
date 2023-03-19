importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: "AIzaSyCGTpxJqdzeBpgV2Uq8KniTQWLHb69DONM",
  authDomain: "loole-b974f.firebaseapp.com",
  projectId: "loole-b974f",
  storageBucket: "loole-b974f.appspot.com",
  messagingSenderId: "30488129618",
  appId: "1:30488129618:web:99f67dea2fe2823b332f8b",
};

const init = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging(init);

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
const CACHE_NAME = "offline";
const OFFLINE_URL = "offline.html";

self.addEventListener("install", function (event) {
  console.log("[ServiceWorker] Install");

  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      // Setting {cache: 'reload'} in the new request will ensure that the response
      // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
      await cache.add(new Request(OFFLINE_URL, { cache: "reload" }));
    })()
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[ServiceWorker] Activate");
  /* event.waitUntil(
    (async () => {
      // Enable navigation preload if it's supported.
      // See https://developers.google.com/web/updates/2017/02/navigation-preload
      if ("navigationPreload" in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })()
  );

  // Tell the active service worker to take control of the page immediately.
  self.clients.claim(); */
});

self.addEventListener("fetch", function (event) {
  // console.log('[Service Worker] Fetch', event.request.url);
  /* if (event.request.mode === "navigate") {
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
  } */
});
