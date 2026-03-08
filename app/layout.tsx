import type { Metadata, Viewport } from 'next'
import AppShell from '@/components/layout/AppShell'
import JsonLd from '@/components/seo/JsonLd'
import { CONTACT, SITE } from '@/lib/constants'
import { localBusinessSchema, organizationSchema } from '@/lib/seo'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' }],
    apple: [{ url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' }],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: SITE.name,
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE.name,
    'application-name': SITE.name,
    'msapplication-TileColor': '#0F1923',
    'msapplication-tap-highlight': 'no',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0F1923',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://cdn.sanity.io" />
      </head>
      <body>
        <JsonLd id="ah-org-schema" data={organizationSchema} />
        <JsonLd id="ah-local-schema" data={localBusinessSchema(CONTACT.address.area)} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  )
}
