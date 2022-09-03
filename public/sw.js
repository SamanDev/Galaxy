self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open("fox-store")
      .then((cache) =>
        cache.addAll([
          "/assets/mmenu-js-master/dist/mmenu.css",
          "/assets/css/bootstrap.min.css",
          "/assets/css/style.css",
          "/assets/images/bgs/bg.svg",
          "/assets/images/bgs/1.png",

          "/assets/images/svg/topplayer/icon.svg",
          "/assets/images/svg/topplayer/deposit.svg",
          "/assets/images/svg/topplayer/cashout.svg",

          "/assets/images/svg/level/icon.svg",
          "/assets/images/svg/vip/icon.svg",
          "/assets/images/svg/gift/icon.svg",
          "/assets/images/svg/league/icon.svg",
          "/assets/images/svg/league/1.svg",
          "/assets/images/svg/league/2.svg",

          "/assets/images/svg/tournament/icon.svg",
          "/assets/images/svg/tournament/1.svg",
          "/assets/images/svg/tournament/2.svg",
          "/assets/images/svg/vip/1.svg",
          "/assets/images/svg/vip/2.svg",
          "/assets/mburger-webcomponent-master/dist/mburger/index.js",
          "/assets/mburger-webcomponent-master/dist/mburger/js/index.js",
          "/assets/js/bootstrap.bundle.min.js",
        ])
      )
  );
});

self.addEventListener("fetch", (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
