// 캐시 이름 및 캐시할 파일 목록
const CACHE_NAME = 'sugar-map-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// 서비스 워커 설치 및 파일 캐싱
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// 오프라인일 때 캐시된 파일 제공
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});