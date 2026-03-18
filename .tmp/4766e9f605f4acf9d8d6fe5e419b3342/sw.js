import {registerRoute as workbox_routing_registerRoute} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-routing/registerRoute.mjs';
import {NetworkFirst as workbox_strategies_NetworkFirst} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-strategies/NetworkFirst.mjs';
import {ExpirationPlugin as workbox_expiration_ExpirationPlugin} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-expiration/ExpirationPlugin.mjs';
import {CacheFirst as workbox_strategies_CacheFirst} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-strategies/CacheFirst.mjs';
import {clientsClaim as workbox_core_clientsClaim} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-core/clientsClaim.mjs';
import {precacheAndRoute as workbox_precaching_precacheAndRoute} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-precaching/precacheAndRoute.mjs';
import {cleanupOutdatedCaches as workbox_precaching_cleanupOutdatedCaches} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-precaching/cleanupOutdatedCaches.mjs';/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */


importScripts(
  
);







self.skipWaiting();

workbox_core_clientsClaim();


/**
 * The precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
workbox_precaching_precacheAndRoute([
  {
    "url": "/_next/app-build-manifest.json",
    "revision": "68c102a119d1ec3e55b0405f0d0a1bc9"
  },
  {
    "url": "/_next/static/9PtOh4V6fUjHjruqWNepr/_buildManifest.js",
    "revision": "172e769da91baa11de9b258fb2d92f86"
  },
  {
    "url": "/_next/static/9PtOh4V6fUjHjruqWNepr/_ssgManifest.js",
    "revision": "b6652df95db52feb4daf4eca35380933"
  },
  {
    "url": "/_next/static/chunks/06f0e697.10a17f4d9f5dc96a.js",
    "revision": "10a17f4d9f5dc96a"
  },
  {
    "url": "/_next/static/chunks/117-1eec2d3a02f2d10a.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/122.5ddad486a44ce0c9.js",
    "revision": "5ddad486a44ce0c9"
  },
  {
    "url": "/_next/static/chunks/133.15341f85415ff78c.js",
    "revision": "15341f85415ff78c"
  },
  {
    "url": "/_next/static/chunks/138.a91c609bd332d8bd.js",
    "revision": "a91c609bd332d8bd"
  },
  {
    "url": "/_next/static/chunks/153.39a5f557d3b272f8.js",
    "revision": "39a5f557d3b272f8"
  },
  {
    "url": "/_next/static/chunks/247.95e0addaa457f6ba.js",
    "revision": "95e0addaa457f6ba"
  },
  {
    "url": "/_next/static/chunks/313.ff2cbf11febe1981.js",
    "revision": "ff2cbf11febe1981"
  },
  {
    "url": "/_next/static/chunks/3204862b.bd455a40387ace7c.js",
    "revision": "bd455a40387ace7c"
  },
  {
    "url": "/_next/static/chunks/332.4fecc2c6a3a546fd.js",
    "revision": "4fecc2c6a3a546fd"
  },
  {
    "url": "/_next/static/chunks/554-bb35b98ff9e77012.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/566-03be7b481ecca714.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/741-d79c1ce7cfe0a5e0.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/765-7609b57de8ee2c5a.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/803.d61d6d6568c95576.js",
    "revision": "d61d6d6568c95576"
  },
  {
    "url": "/_next/static/chunks/83.4c8290d9319a2223.js",
    "revision": "4c8290d9319a2223"
  },
  {
    "url": "/_next/static/chunks/831.43b8d722cd8afd9c.js",
    "revision": "43b8d722cd8afd9c"
  },
  {
    "url": "/_next/static/chunks/954-3fcbfff0b83af4bf.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/972-7e19056680530bec.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/_not-found/page-d593605c1dd1d49c.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/about/page-871a4591343135d8.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/accessibility/page-578d024569e58829.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/blog/page-882027201eb8eeae.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/contact/page-439cf1712ddd4a3e.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/estimator/page-b3a90ba158813b8c.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/green/page-1227bc24956a081a.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/landingpage/page-2f51e53795ea8c72.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/layout-90bc8ff3b6d6e9a8.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/page-bd1540294161d937.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/partners/page-bcd869a2c6f3920e.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/privacy-policy/page-0c24170cf456d05e.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/projects/page-56263f8d691e37c2.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/services/page-c6501fbd1a400bc5.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/store/page-275e85a585c0c17d.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/app/terms/page-8b804845e6dea3cd.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/c0e7568e.248a6c83954a74bc.js",
    "revision": "248a6c83954a74bc"
  },
  {
    "url": "/_next/static/chunks/fd9d1056-1f6ea7363b00918b.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/main-1db809c064dcfe41.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/main-app-8e374ab2373d1df7.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/pages/_app-15e2daefa259f0b5.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/pages/_error-28b803cb2479b966.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/chunks/polyfills-42372ed130431b0a.js",
    "revision": "846118c33b2c0e922d7b3a7676f81f6f"
  },
  {
    "url": "/_next/static/chunks/webpack-69a7d924bd12f41f.js",
    "revision": "9PtOh4V6fUjHjruqWNepr"
  },
  {
    "url": "/_next/static/css/9cdd9df395e0501d.css",
    "revision": "9cdd9df395e0501d"
  },
  {
    "url": "/_next/static/css/b350c1302062f99f.css",
    "revision": "b350c1302062f99f"
  },
  {
    "url": "/_next/static/css/bbbba8c0fe814545.css",
    "revision": "bbbba8c0fe814545"
  },
  {
    "url": "/_redirects",
    "revision": "c7176337bd39573ef03586e2d8189e53"
  },
  {
    "url": "/llms.txt",
    "revision": "616162e0b218e5dcc422fb1b6fedfbf2"
  },
  {
    "url": "/offline.html",
    "revision": "d83d263b09652cb7201ad1d7febd36bf"
  },
  {
    "url": "/og/green.jpg",
    "revision": "ca08965706f496939f20190cfecdf2fb"
  }
], {
  "ignoreURLParametersMatching": []
});
workbox_precaching_cleanupOutdatedCaches();



workbox_routing_registerRoute("/", new workbox_strategies_NetworkFirst({ "cacheName":"start-url", plugins: [{ cacheWillUpdate: async ({ request, response, event, state }) => { if (response && response.type === 'opaqueredirect') { return new Response(response.body, { status: 200, statusText: 'OK', headers: response.headers }) } return response } }] }), 'GET');
workbox_routing_registerRoute(/.*/i, new workbox_strategies_NetworkFirst({ "cacheName":"html-pages","networkTimeoutSeconds":3, plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 32, maxAgeSeconds: 86400 })] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i, new workbox_strategies_CacheFirst({ "cacheName":"google-fonts", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536000 })] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/cdn\.sanity\.io\/.*/i, new workbox_strategies_CacheFirst({ "cacheName":"sanity-images", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 2592000 })] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/.*\.apicdn\.sanity\.io\/.*/i, new workbox_strategies_NetworkFirst({ "cacheName":"sanity-api", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 300 })] }), 'GET');




