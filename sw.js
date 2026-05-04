const CACHE_NAME = "gamehub-v6";

const ASSETS = [
  "./",
  "./index.html",
  "./game1.html",
  "./game2.html",
  "./game3.html",
  "./elevator.mp3",
  "./logochess.png",
  "./logocheckers.png",
  "./logocrosssum.png"
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
