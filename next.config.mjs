import fs from 'node:fs'
import path from 'node:path'
import withPWAInit from 'next-pwa'

function resolveWritableTempDir() {
  const configured = process.env.TMPDIR || process.env.TMP || process.env.TEMP

  if (configured) {
    try {
      fs.mkdirSync(configured, { recursive: true })
      fs.accessSync(configured, fs.constants.W_OK)
      return configured
    } catch {
      // Fall through to a project-local temp directory.
    }
  }

  const localTmp = path.join(process.cwd(), '.tmp')
  fs.mkdirSync(localTmp, { recursive: true })
  return localTmp
}

const writableTmp = resolveWritableTempDir()
process.env.TMPDIR = writableTmp
process.env.TMP = writableTmp
process.env.TEMP = writableTmp

const withPWA = withPWAInit({
  dest: 'public',
  register: false,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      // Force navigation requests (HTML) to hit the network first,
      // falling back to cache if offline. This prevents false positive
      // offline states caused by aggressive CacheFirst strategies on the index doc.
      urlPattern: /.*/i,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'html-pages',
        networkTimeoutSeconds: 3,
        expiration: { maxEntries: 32, maxAgeSeconds: 24 * 60 * 60 },
      },
    },
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
