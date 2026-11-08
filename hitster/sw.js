/* Hitparty: deja la app disponible sin internet. El audio (iTunes) nunca se guarda aquí. */
const APP = 'hp-app-0.1.0';
const SHELL = ['./', './index.html', './songs.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-180.png'];
self.addEventListener('install', e => e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())));
self.addEventListener('activate', e => e.waitUntil(caches.keys()
  .then(ks => Promise.all(ks.filter(k => k.startsWith('hp-app-') && k !== APP).map(k => caches.delete(k))))
  .then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET' || url.origin !== self.location.origin) return;
  e.respondWith(fetch(req).then(res => { if (res.ok) { const cp = res.clone(); caches.open(APP).then(c => c.put(req, cp)); } return res; })
    .catch(() => caches.match(req, { ignoreSearch: true }).then(h => h || caches.match('./index.html'))));
});
