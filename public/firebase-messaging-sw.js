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
  // event.waitUntil(self.clients.claim());
});

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("fox-store")
      .then((cache) =>
        cache.addAll([
          "/assets/js/bootstrap.bundle.min.js",
          "/assets/mmenu-js-master/dist/mmenu.js",
          "/assets/mburger-webcomponent-master/dist/mburger/index.js",
          "/assets/js/main.js",
          "/assets/mmenu-js-master/dist/mmenu.css",
          "/assets/mburger-webcomponent-master/dist/mburger/js/index.js",

          "/assets/images/svg/level/icon.svg",
          "/assets/images/svg/topplayer/deposit.svg",
          "/assets/images/svg/topplayer/cashout.svg",
          "/assets/images/svg/topplayer/icon.svg",
          "/assets/topplayer.svg",
          "/assets/chipblack.svg",
          "/assets/images/svg/vip/icon.svg",
          "/assets/images/svg/league/icon.svg",
          "/assets/commission.svg",
          "/assets/images/svg/tournament/icon.svg",
          "/assets/images/svg/gift/icon.svg",
          "/assets/gift.svg",
          "/assets/images/svg/kingof/icon.svg",
          "/assets/images/svg/tournament/1.svg",
          "/assets/images/svg/tournament/2.svg",
          "/assets/images/svg/vip/1.svg",
          "/assets/images/svg/vip/2.svg",
          "/assets/images/svg/league/1.svg",
          "/assets/images/svg/league/2.svg",
          "/assets/images/games/poker-min.webp",
          "/assets/images/games/bet-min.webp",
          "/assets/images/games/boom-min.webp",
          "/assets/images/games/backgammon-min.webp",

          "/assets/css/bootstrap.min.css",
          "/auth/fonts/font-awesome-4.7.0/css/font-awesome.min.css",

          "/assets/fontawesome/css/all.css",
          "/assets/css/style.css",

          "/assets/images/bgs/bg.svg",
          "/assets/images/bgs/1-min.webp",
          "/assets/fonts/yekan/Sans.woff",
          "/assets/images/logo.png",

          "https://fonts.googleapis.com/css?family=Lato:400,700,400italic,700italic&subset=latin",
          "/assets/fontawesome/webfonts/fa-solid-900.woff2",

          "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css",
          "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css",
          "/assets/fontawesome/webfonts/fa-regular-400.woff2",
          "https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js",
          "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/themes/default/assets/fonts/icons.woff2",
          "https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/themes/default/assets/fonts/brand-icons.woff2",

          "/maskable_icon_x192.png",
          "/manifest.json",
          "/favicon.png",
          "/static/js/bundle.js",

          "/",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request.url))
  );
});
