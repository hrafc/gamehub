const CACHE_NAME = "gamehub-v4.1.";

/* ALL FILES TO CACHE */
const ASSETS = [

  "./",
  "./index.html",

  "./game1.html",
  "./game2.html",
  "./game3.html",

  "./fruit.html",
  "./uno.html",

  "./elevator.mp3",

  "./logochess.png",
  "./logocheckers.png",
  "./logocrosssum.png",

  "./fruit.png",
  "./unologo.png"
];

/* INSTALL */
self.addEventListener("install", event => {

  console.log("✅ Service Worker Installed");

  event.waitUntil(

    caches.open(CACHE_NAME).then(cache => {

      console.log("📦 Caching files");

      return cache.addAll(ASSETS);
    })

  );

  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", event => {

  console.log("🚀 Service Worker Activated");

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          /* delete old cache versions */
          if(key !== CACHE_NAME){

            console.log("🗑 Removing old cache:", key);

            return caches.delete(key);
          }

        })

      );

    })

  );

  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request).then(response => {

      /* return cached file if exists */
      if(response){
        return response;
      }

      /* otherwise fetch normally */
      return fetch(event.request)
      .then(networkResponse => {

        /* save new files automatically */
        return caches.open(CACHE_NAME)
        .then(cache => {

          cache.put(
            event.request,
            networkResponse.clone()
          );

          return networkResponse;
        });

      })

      .catch(() => {

        /* offline fallback */
        if(event.request.destination === "document"){

          return caches.match("./index.html");
        }

      });

    })

  );

});
