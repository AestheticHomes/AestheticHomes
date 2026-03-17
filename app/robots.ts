import type { MetadataRoute } from 'next'

const CANONICAL_HOST = 'https://www.aesthetichomes.co.in'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${CANONICAL_HOST}/sitemap.xml`,
    host: CANONICAL_HOST,
  }
}
