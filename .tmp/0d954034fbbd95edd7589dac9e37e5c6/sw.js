import {registerRoute as workbox_routing_registerRoute} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-routing/registerRoute.mjs';
import {NetworkFirst as workbox_strategies_NetworkFirst} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-strategies/NetworkFirst.mjs';
import {ExpirationPlugin as workbox_expiration_ExpirationPlugin} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-expiration/ExpirationPlugin.mjs';
import {CacheFirst as workbox_strategies_CacheFirst} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-strategies/CacheFirst.mjs';
import {clientsClaim as workbox_core_clientsClaim} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-core/clientsClaim.mjs';
import {precacheAndRoute as workbox_precaching_precacheAndRoute} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-precaching/precacheAndRoute.mjs';
import {cleanupOutdatedCaches as workbox_precaching_cleanupOutdatedCaches} from '/mnt/d/AestheticHomes Repo/node_modules/workbox-webpack-plugin/node_modules/workbox-precaching/cleanupOutdatedCaches.mjs';/**
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
    "revision": "c832c9bc3d8a09059ccef7f8bcfb3bc6"
  },
  {
    "url": "/_next/static/BS6g8WUTFAc92mgQrtPfU/_buildManifest.js",
    "revision": "172e769da91baa11de9b258fb2d92f86"
  },
  {
    "url": "/_next/static/BS6g8WUTFAc92mgQrtPfU/_ssgManifest.js",
    "revision": "b6652df95db52feb4daf4eca35380933"
  },
  {
    "url": "/_next/static/chunks/06f0e697.10a17f4d9f5dc96a.js",
    "revision": "10a17f4d9f5dc96a"
  },
  {
    "url": "/_next/static/chunks/117-1eec2d3a02f2d10a.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
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
    "url": "/_next/static/chunks/496-a918e58284cc9ec4.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/554-b3f3c762d73568fa.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/566-03be7b481ecca714.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/741-43dcba3ed2bc6093.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/795-8e187d0df53cdf44.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/803.d61d6d6568c95576.js",
    "revision": "d61d6d6568c95576"
  },
  {
    "url": "/_next/static/chunks/83.eb9635d91682551b.js",
    "revision": "eb9635d91682551b"
  },
  {
    "url": "/_next/static/chunks/880.05f2fef1890e0c30.js",
    "revision": "05f2fef1890e0c30"
  },
  {
    "url": "/_next/static/chunks/954-3fcbfff0b83af4bf.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/972-7e19056680530bec.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/_not-found/page-d593605c1dd1d49c.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/about/page-871a4591343135d8.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/accessibility/page-2762b491232d3132.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/blog/page-f426b046feb5eb46.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/contact/page-605e6ef50b37af80.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/estimator/page-b3a90ba158813b8c.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/landingpage/page-b67ebfc40674bf01.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/layout-ca699756267b106e.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/page-44a0ede865bad1cb.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/privacy-policy/page-2bae2398bf5e0474.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/projects/page-2d3b85a0299c35e5.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/services/page-da2be11b4395ae7f.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/store/page-9da0833ad6573076.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/app/terms/page-7fca100818af3047.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/c0e7568e.23e204b7ec1e7098.js",
    "revision": "23e204b7ec1e7098"
  },
  {
    "url": "/_next/static/chunks/fd9d1056-1f6ea7363b00918b.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/framework-00a8ba1a63cfdc9e.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/main-app-8e374ab2373d1df7.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/main-fedff6a82896fa99.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/pages/_app-15e2daefa259f0b5.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/pages/_error-28b803cb2479b966.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/chunks/polyfills-42372ed130431b0a.js",
    "revision": "846118c33b2c0e922d7b3a7676f81f6f"
  },
  {
    "url": "/_next/static/chunks/webpack-903ef4aa1d8d2206.js",
    "revision": "BS6g8WUTFAc92mgQrtPfU"
  },
  {
    "url": "/_next/static/css/049b3dcd515a1552.css",
    "revision": "049b3dcd515a1552"
  },
  {
    "url": "/_next/static/css/b350c1302062f99f.css",
    "revision": "b350c1302062f99f"
  },
  {
    "url": "/_redirects",
    "revision": "24451388c2fc69419fac47ca08311257"
  },
  {
    "url": "/offline.html",
    "revision": "d83d263b09652cb7201ad1d7febd36bf"
  },
  {
    "url": "/sitemap-0.xml",
    "revision": "f64a5c3bb36d7432a45573d399f03e5f"
  }
], {
  "ignoreURLParametersMatching": []
});
workbox_precaching_cleanupOutdatedCaches();



workbox_routing_registerRoute("/", new workbox_strategies_NetworkFirst({ "cacheName":"start-url", plugins: [{ cacheWillUpdate: async ({ request, response, event, state }) => { if (response && response.type === 'opaqueredirect') { return new Response(response.body, { status: 200, statusText: 'OK', headers: response.headers }) } return response } }] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i, new workbox_strategies_CacheFirst({ "cacheName":"google-fonts", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 10, maxAgeSeconds: 31536000 })] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/cdn\.sanity\.io\/.*/i, new workbox_strategies_CacheFirst({ "cacheName":"sanity-images", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 2592000 })] }), 'GET');
workbox_routing_registerRoute(/^https:\/\/.*\.apicdn\.sanity\.io\/.*/i, new workbox_strategies_NetworkFirst({ "cacheName":"sanity-api", plugins: [new workbox_expiration_ExpirationPlugin({ maxEntries: 50, maxAgeSeconds: 300 })] }), 'GET');




