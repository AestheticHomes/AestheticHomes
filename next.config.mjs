import withPWAInit from 'next-pwa'

const withPWA = withPWAInit({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts',
        expiration: { maxEntries: 10, maxAgeSeconds: 31536000 },
      },
    },
    {
      urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'sanity-images',
        expiration: { maxEntries: 200, maxAgeSeconds: 2592000 },
      },
    },
    {
      urlPattern: /^https:\/\/.*\.apicdn\.sanity\.io\/.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'sanity-api',
        expiration: { maxEntries: 50, maxAgeSeconds: 300 },
      },
    },
  ],
})

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'aesthetichomes.co.in' },
      { protocol: 'https', hostname: 'www.aesthetichomes.co.in' },
      { protocol: 'https', hostname: 'www.homefix.co.in' },
    ],
  },
  experimental: {
    optimizePackageImports: ['recharts'],
  },
}

export default withPWA(nextConfig)
