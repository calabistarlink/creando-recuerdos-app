/* Creando Recuerdos (versión local): deja la app disponible sin internet.
   Solo guarda los archivos de la app y las tipografías. Los datos del usuario no pasan por aquí:
   viven en localStorage e IndexedDB, y los pedidos a las IAs van directo, sin caché. */
const VERSION = 'local-0.1.1';
const APP = 'cr-app-' + VERSION;
const FONTS = 'cr-fonts';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './icon-180.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(APP).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k.startsWith('cr-app-') && k !== APP).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // La página: primero la red (así llega la versión nueva), y sin conexión la copia guardada.
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(APP).then(c => c.put('./index.html', copy)); } return res; })
      .catch(() => caches.match('./index.html', { ignoreSearch: true })));
    return;
  }

  // Archivos propios de la app: la copia guardada, o la red si no está.
  if (url.origin === self.location.origin) {
    e.respondWith(caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req)));
    return;
  }

  // Tipografías de Google: la copia guardada de inmediato, y se refresca por detrás.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(caches.open(FONTS).then(async c => {
      const hit = await c.match(req);
      const net = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; }).catch(() => hit);
      return hit || net;
    }));
  }
});
