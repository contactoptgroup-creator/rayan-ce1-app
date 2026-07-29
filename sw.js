// Service worker de Champion.
// Objectif : l'application se lance et fonctionne même sans connexion.
// Les progrès continuent d'être écrits en local, puis remontés dès le retour du réseau.

const CACHE = 'champion-v3.2';
const SHELL = [
    '/',
    '/index.html',
    '/styles.css?v=3.2',
    '/data.js?v=3.2',
    '/data-ce2.js?v=3.2',
    '/app.js?v=3.2',
    '/manifest.json',
    '/icon.svg',
    '/icon-180.png'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE)
            // addAll échoue en bloc si une seule ressource manque : on tolère les absences.
            .then(cache => Promise.allSettled(SHELL.map(url => cache.add(url))))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', event => {
    const { request } = event;
    if (request.method !== 'GET') return;

    const url = new URL(request.url);
    if (url.origin !== self.location.origin) return;

    // La sauvegarde ne doit JAMAIS être servie depuis le cache : on veut
    // toujours la version en ligne la plus récente des progrès.
    if (url.pathname.startsWith('/api/')) {
        event.respondWith(fetch(request).catch(() => new Response(
            JSON.stringify({ ok: false, error: 'hors_ligne' }),
            { status: 503, headers: { 'Content-Type': 'application/json' } }
        )));
        return;
    }

    // Réseau d'abord (pour avoir les nouveautés), cache en secours (pour l'avion).
    event.respondWith(
        fetch(request)
            .then(response => {
                if (response && response.status === 200) {
                    const copy = response.clone();
                    caches.open(CACHE).then(cache => cache.put(request, copy));
                }
                return response;
            })
            .catch(() => caches.match(request).then(hit => hit || caches.match('/index.html')))
    );
});
