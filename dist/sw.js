// public/sw.js
// ─── Aesthetic Homes Service Worker ───────────────────────────────────────
// Handles: offline caching, background sync for enquiry forms, push notifications

const CACHE_VER    = 'ah-v1';
const STATIC_CACHE = `${CACHE_VER}-static`;
const IMAGE_CACHE  = `${CACHE_VER}-images`;
const API_CACHE    = `${CACHE_VER}-api`;

const STATIC_SHELL = ['/', '/index.html', '/offline.html', '/manifest.json'];

// ── INSTALL: cache static shell ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => cache.addAll(STATIC_SHELL))
      .then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: purge old cache versions ──────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k.startsWith('ah-') && ![STATIC_CACHE, IMAGE_CACHE, API_CACHE].includes(k))
            .map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: routing strategy per resource type ────────────────────────────────
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') return;

  // Fonts → Cache-first (very stable, year-long TTL)
  if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Sanity CDN images → Cache-first (stable once published)
  if (url.hostname.includes('cdn.sanity.io') || request.destination === 'image') {
    event.respondWith(cacheFirst(request, IMAGE_CACHE));
    return;
  }

  // Sanity API → Network-first (fresh data preferred, fallback to cache)
  if (url.hostname.includes('apicdn.sanity.io')) {
    event.respondWith(networkFirst(request, API_CACHE));
    return;
  }

  // HTML navigation → Network-first with offline page fallback
  if (request.mode === 'navigate') {
    event.respondWith(navigateWithFallback(request));
    return;
  }

  // Everything else → Stale-while-revalidate
  event.respondWith(staleWhileRevalidate(request, STATIC_CACHE));
});

// ── Cache-first ──────────────────────────────────────────────────────────────
async function cacheFirst(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch { return new Response('', { status: 408 }); }
}

// ── Network-first ────────────────────────────────────────────────────────────
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  try {
    const response = await fetch(request);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || new Response('', { status: 503 });
  }
}

// ── Stale-while-revalidate ───────────────────────────────────────────────────
async function staleWhileRevalidate(request, cacheName) {
  const cache  = await caches.open(cacheName);
  const cached = await cache.match(request);
  const networkFetch = fetch(request).then(r => { if (r.ok) cache.put(request, r.clone()); return r; }).catch(() => null);
  return cached || await networkFetch;
}

// ── Navigate with offline fallback ───────────────────────────────────────────
async function navigateWithFallback(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(STATIC_CACHE);
    cache.put(request, response.clone());
    return response;
  } catch {
    return (await caches.match(request)) ||
           (await caches.match('/index.html')) ||
           (await caches.match('/offline.html'));
  }
}

// ── Background sync: flush queued enquiries ──────────────────────────────────
self.addEventListener('sync', event => {
  if (event.tag === 'enquiry-sync') {
    event.waitUntil(flushEnquiryQueue());
  }
});
async function flushEnquiryQueue() {
  // In production: read from IndexedDB, POST to your API endpoint
  console.log('[SW] Syncing queued enquiries…');
}

// ── Push notifications ───────────────────────────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data?.json() ?? {};
  event.waitUntil(self.registration.showNotification(data.title ?? 'Aesthetic Homes', {
    body:    data.body    ?? 'You have a new update.',
    icon:    '/icons/icon-192.png',
    badge:   '/icons/icon-96.png',
    vibrate: [100, 50, 100],
    data:    { url: data.url ?? '/' },
    actions: [{ action: 'view', title: 'View' }, { action: 'dismiss', title: 'Dismiss' }],
  }));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action !== 'dismiss') {
    event.waitUntil(clients.openWindow(event.notification.data?.url ?? '/'));
  }
});

// ── Message relay ────────────────────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING')  self.skipWaiting();
  if (event.data?.type === 'CLEAR_CACHE')   caches.keys().then(k => k.forEach(c => caches.delete(c)));
});
