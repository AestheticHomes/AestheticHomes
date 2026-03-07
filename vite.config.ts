import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const codexTempDir = resolve('.codex-tmp')
mkdirSync(codexTempDir, { recursive: true })
process.env.TMPDIR = codexTempDir
process.env.TEMP = codexTempDir
process.env.TMP = codexTempDir

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      injectRegister: false,
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'icons/*.png', 'offline.html'],
      manifest: false, // using our own public/manifest.json
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'google-fonts', expiration: { maxEntries: 10, maxAgeSeconds: 31536000 } },
          },
          {
            urlPattern: /^https:\/\/cdn\.sanity\.io\/.*/i,
            handler: 'CacheFirst',
            options: { cacheName: 'sanity-images', expiration: { maxEntries: 200, maxAgeSeconds: 2592000 } },
          },
          {
            urlPattern: /^https:\/\/.*\.apicdn\.sanity\.io\/.*/i,
            handler: 'NetworkFirst',
            options: { cacheName: 'sanity-api', expiration: { maxEntries: 50, maxAgeSeconds: 300 } },
          },
        ],
      },
      devOptions: { enabled: false },
    }),
  ],
  resolve: { alias: { '@': '/src' } },
})
