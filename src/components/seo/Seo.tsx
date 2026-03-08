'use client'

import { useEffect } from 'react'
import { CONTACT, SITE } from '@/lib/constants'
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo'
import type { SeoProps } from '@/types'

const upsertMeta = (selector: string, attrs: Record<string, string>) => {
  if (typeof document === 'undefined') return

  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    document.head.appendChild(el)
  }

  Object.entries(attrs).forEach(([key, value]) => {
    el?.setAttribute(key, value)
  })
}

const upsertLink = (selector: string, attrs: Record<string, string>) => {
  if (typeof document === 'undefined') return

  let el = document.head.querySelector<HTMLLinkElement>(selector)
  if (!el) {
    el = document.createElement('link')
    document.head.appendChild(el)
  }

  Object.entries(attrs).forEach(([key, value]) => {
    el?.setAttribute(key, value)
  })
}

export { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema }

export default function Seo({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
  noIndex = false,
  location,
  article,
  jsonLd,
}: SeoProps) {
  const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name
  const fullDescription = description ?? 'Interior design and home renovation services in Chennai and Nellore by Aesthetic Homes.'
  const canonicalUrl = canonical ?? `${SITE.url}/`
  const imageUrl = ogImage ?? SITE.ogImage

  useEffect(() => {
    if (typeof document === 'undefined') return

    document.title = fullTitle

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: fullDescription,
    })

    upsertMeta('meta[name="robots"]', {
      name: 'robots',
      content: noIndex ? 'noindex, nofollow' : 'index, follow',
    })

    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    })

    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: fullTitle,
    })

    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: fullDescription,
    })

    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    })

    upsertMeta('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    })

    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    })

    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: fullTitle,
    })

    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: fullDescription,
    })

    upsertMeta('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    })

    upsertMeta('meta[name="geo.region"]', {
      name: 'geo.region',
      content: 'IN-TN',
    })

    upsertMeta('meta[name="geo.placename"]', {
      name: 'geo.placename',
      content: location ?? 'Chennai',
    })

    upsertMeta('meta[name="geo.position"]', {
      name: 'geo.position',
      content: `${CONTACT.address.lat};${CONTACT.address.lng}`,
    })

    upsertMeta('meta[name="ICBM"]', {
      name: 'ICBM',
      content: `${CONTACT.address.lat}, ${CONTACT.address.lng}`,
    })

    if (article?.publishedAt) {
      upsertMeta('meta[property="article:published_time"]', {
        property: 'article:published_time',
        content: article.publishedAt,
      })
    }

    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonicalUrl,
    })
  }, [article?.publishedAt, canonicalUrl, fullDescription, fullTitle, imageUrl, location, noIndex, type])

  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  if (schemas.length === 0) return null

  return (
    <>
      {schemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}
