const CACHE_NAME = "gamehub-v0.0.0.9";

const ASSETS = [
  "./",
  "./index.html",
  "./game1.html",
  "./game2.html",
  "./game3.html",
  "./fruit.html",
  "./elevator.mp3",
  "./logochess.png",
  "./logocheckers.png",
  "./logocrosssum.png",
  ",/fruit.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
