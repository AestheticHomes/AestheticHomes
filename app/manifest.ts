import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Aesthetic Homes - Interior Designer Chennai',
    short_name: 'AestheticHomes',
    description:
      'Budget interior design in Chennai. Modular kitchens, wardrobes, full home interiors. 4.9★ rated.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait-primary',
    theme_color: '#0F1923',
    background_color: '#FAFAF7',
    lang: 'en-IN',
    categories: ['lifestyle', 'business'],
    shortcuts: [
      {
        name: 'Free Quote',
        url: '/contact',
        description: 'Get a free interior design quote',
      },
      {
        name: 'View Projects',
        url: '/projects',
        description: 'Browse completed projects',
      },
      {
        name: 'HomeFix Store',
        url: 'https://www.homefix.co.in/store',
        description: 'Shop modular furniture',
      },
    ],
    icons: [
      { src: '/icons/icon-72.png', sizes: '72x72', type: 'image/png' },
      { src: '/icons/icon-96.png', sizes: '96x96', type: 'image/png' },
      { src: '/icons/icon-128.png', sizes: '128x128', type: 'image/png' },
      { src: '/icons/icon-144.png', sizes: '144x144', type: 'image/png' },
      { src: '/icons/icon-152.png', sizes: '152x152', type: 'image/png' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
      { src: '/icons/icon-384.png', sizes: '384x384', type: 'image/png' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
