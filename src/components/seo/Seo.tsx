/**
 * @file src/components/seo/Seo.tsx
 * @description SEO head manager using react-helmet-async.
 *
 * Injects per-page:
 *  • <title>, <meta description>, canonical, robots
 *  • Open Graph tags (Facebook, WhatsApp)
 *  • Twitter Card tags
 *  • Geo meta tags (local SEO)
 *  • Master Organization JSON-LD (every page)
 *  • LocalBusiness JSON-LD (location pages)
 *  • BreadcrumbList JSON-LD (non-home pages)
 *  • Optional extra JSON-LD (FAQ, Article, etc.)
 *
 * USAGE
 * ─────
 * <Seo
 *   title="Modular Kitchen Chennai"
 *   description="..."
 *   canonical="https://www.aesthetichomes.net/#services"
 *   location="Adyar"          ← injects LocalBusiness schema for that area
 *   jsonLd={faqSchema(faqs)}  ← inject any extra schema
 * />
 */

import { Helmet } from 'react-helmet-async'
import { SITE, CONTACT, SOCIAL, HOMEFIX, SERVICE_AREAS } from '@/lib/constants'
import type { SeoProps } from '@/types'

// ─── MASTER ORGANIZATION + WEBSITE SCHEMA ────────────────────────────────────
// Injected on EVERY page. Tells Google everything about the business.
const orgSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type':       ['HomeAndConstructionBusiness', 'LocalBusiness'],
      '@id':         `${SITE.url}/#organization`,
      name:          SITE.name,
      legalName:     SITE.legalName,
      alternateName: ['Aesthetic Homes Chennai', 'Aesthetic Homes Interiors'],
      url:           SITE.url,
      logo: {
        '@type': 'ImageObject',
        url:     SITE.logo,
        width:   192,
        height:  192,
      },
      image:       SITE.ogImage,
      description: `${SITE.name} — Chennai's trusted budget interior designer since ${SITE.founded}. ${SITE.projectCount} projects, ${SITE.rating}★ rated. GSTIN: ${SITE.gstin}. Modular kitchens, wardrobes, full home interiors, 100km around Chennai.`,
      foundingDate: String(SITE.founded),
      taxID:        SITE.gstin,
      vatID:        SITE.gstin,
      telephone:    [CONTACT.phone1Display, CONTACT.phone2Display],
      email:        CONTACT.email,
      address: {
        '@type':           'PostalAddress',
        streetAddress:     CONTACT.address.street,
        addressLocality:   CONTACT.address.area,
        addressRegion:     CONTACT.address.state,
        postalCode:        CONTACT.address.pincode,
        addressCountry:    CONTACT.address.country,
      },
      geo: {
        '@type':    'GeoCoordinates',
        latitude:   CONTACT.address.lat,
        longitude:  CONTACT.address.lng,
      },
      areaServed: SERVICE_AREAS.map((area) => ({
        '@type': 'City',
        name:    area,
      })),
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type':    'GeoCoordinates',
          latitude:   CONTACT.address.lat,
          longitude:  CONTACT.address.lng,
        },
        geoRadius: '100000',   // 100km in metres
      },
      openingHoursSpecification: [{
        '@type':     'OpeningHoursSpecification',
        dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens:       '09:00',
        closes:      '19:00',
      }],
      priceRange:          '₹₹',
      currenciesAccepted:  'INR',
      paymentAccepted:     'Cash, UPI, Bank Transfer, Cheque',
      aggregateRating: {
        '@type':       'AggregateRating',
        ratingValue:   String(SITE.rating),
        reviewCount:   String(SITE.reviewCount),
        bestRating:    '5',
        worstRating:   '1',
      },
      sameAs: [SOCIAL.instagram, SOCIAL.youtube, HOMEFIX.url, SITE.url],
      // Cross-domain relationship — HomeFix is our digital platform
      subOrganization: {
        '@type':  'Organization',
        '@id':    `${HOMEFIX.url}/#organization`,
        name:     'HomeFix',
        url:      HOMEFIX.url,
        description: 'HomeFix is the digital modular furniture platform by Aesthetic Homes — online store, 2D/3D planning and free installation in Chennai.',
        parentOrganization: { '@id': `${SITE.url}/#organization` },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name:    'Interior Design Services Chennai',
        itemListElement: [
          { '@type': 'Offer', priceCurrency: 'INR', lowPrice: '85000', itemOffered: { '@type': 'Service', name: 'Modular Kitchen Chennai', description: 'L, U, island, parallel modular kitchens in Chennai' } },
          { '@type': 'Offer', priceCurrency: 'INR', lowPrice: '45000', itemOffered: { '@type': 'Service', name: 'Wardrobe Design Chennai' } },
          { '@type': 'Offer', priceCurrency: 'INR', lowPrice: '18000', itemOffered: { '@type': 'Service', name: 'TV Unit Design Chennai' } },
          { '@type': 'Offer', price: '0', priceCurrency: 'INR',        itemOffered: { '@type': 'Service', name: 'Free 3D Interior Visualization Chennai' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Full Home Interior Design Chennai', description: 'Turnkey interior design for apartments and villas in Chennai' } },
        ],
      },
    },
    {
      '@type':       'WebSite',
      '@id':         `${SITE.url}/#website`,
      url:           SITE.url,
      name:          SITE.name,
      description:   SITE.tagline,
      inLanguage:    'en-IN',
      publisher:     { '@id': `${SITE.url}/#organization` },
      potentialAction: {
        '@type':        'SearchAction',
        target:         { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/projects?q={search_term_string}` },
        'query-input':  'required name=search_term_string',
      },
    },
  ],
}

// ─── LOCAL BUSINESS SCHEMA (location-specific pages) ─────────────────────────
const localBizSchema = (area: string) => ({
  '@context': 'https://schema.org',
  '@type':    ['HomeAndConstructionBusiness', 'LocalBusiness'],
  '@id':      `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, '-')}/#localbusiness`,
  name:       `Aesthetic Homes — Interior Designer in ${area}, Chennai`,
  url:        `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, '-')}`,
  telephone:  CONTACT.phone1Display,
  address: {
    '@type':          'PostalAddress',
    addressLocality:  area,
    addressRegion:    'Tamil Nadu',
    addressCountry:   'IN',
  },
  areaServed: [{ '@type': 'City', name: area }],
  aggregateRating: {
    '@type':       'AggregateRating',
    ratingValue:   String(SITE.rating),
    reviewCount:   String(SITE.reviewCount),
  },
  parentOrganization: { '@id': `${SITE.url}/#organization` },
})

// ─── BREADCRUMB SCHEMA ────────────────────────────────────────────────────────
const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type':    'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type':   'ListItem',
    position:  i + 1,
    name:      item.name,
    item:      item.url,
  })),
})

// ─── FAQ SCHEMA HELPER (call from page components) ────────────────────────────
/**
 * Builds a FAQPage JSON-LD object.
 * @example
 * import { buildFaqSchema } from '@/components/seo/Seo'
 * <script type="application/ld+json">{JSON.stringify(buildFaqSchema(faqs))}</script>
 */
export const buildFaqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type':         'Question',
    name:             f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
})

/** Builds an Article JSON-LD object for blog posts */
export const buildArticleSchema = (post: {
  title: string; url: string; image?: string; publishedAt?: string; tags?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type':    'Article',
  headline:   post.title,
  url:        post.url,
  image:      post.image,
  datePublished: post.publishedAt,
  author:    { '@id': `${SITE.url}/#organization` },
  publisher: { '@id': `${SITE.url}/#organization` },
  keywords:  post.tags?.join(', '),
})

// ─── SEO COMPONENT ────────────────────────────────────────────────────────────
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
  const fullTitle = title
    ? `${title} | ${SITE.name}`
    : `${SITE.name} | Budget Interior Designer Chennai | 10 Years · ${SITE.projectCount} Projects`

  const fullDesc = description ??
    `${SITE.name} — Chennai's trusted budget interior designer since ${SITE.founded}. Modular kitchens from ₹85k, wardrobes from ₹45k, full home interiors. ${SITE.projectCount} projects, ${SITE.rating}★ rated. GSTIN: ${SITE.gstin}.`

  const canonicalUrl = canonical ?? SITE.url
  const imageUrl     = ogImage   ?? SITE.ogImage

  // Build breadcrumb if this isn't the homepage
  const crumbs = canonical && canonical !== SITE.url
    ? [{ name: 'Home', url: SITE.url }, { name: title ?? 'Page', url: canonicalUrl }]
    : null

  // Normalise extra jsonLd to array
  const extraSchemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={fullDesc} />
      <link rel="canonical"    href={canonicalUrl} />
      <meta name="robots" content={noIndex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      } />

      {/* Geo meta — local SEO signals */}
      <meta name="geo.region"    content="IN-TN" />
      <meta name="geo.placename" content={location ?? 'Chennai'} />
      <meta name="geo.position"  content={`${CONTACT.address.lat};${CONTACT.address.lng}`} />
      <meta name="ICBM"          content={`${CONTACT.address.lat}, ${CONTACT.address.lng}`} />

      {/* Open Graph */}
      <meta property="og:type"        content={type} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={fullDesc} />
      <meta property="og:url"         content={canonicalUrl} />
      <meta property="og:image"       content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height"content="630" />
      <meta property="og:locale"      content="en_IN" />
      <meta property="og:site_name"   content={SITE.name} />

      {/* Twitter Card */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={fullDesc} />
      <meta name="twitter:image"       content={imageUrl} />

      {/* Article metadata */}
      {article?.publishedAt && <meta property="article:published_time" content={article.publishedAt} />}
      {article?.tags?.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* Master organization + website schema — injected on every page */}
      <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>

      {/* Location-specific LocalBusiness schema */}
      {location && (
        <script type="application/ld+json">{JSON.stringify(localBizSchema(location))}</script>
      )}

      {/* Breadcrumb schema */}
      {crumbs && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema(crumbs))}</script>
      )}

      {/* Extra schemas passed from the page (FAQ, Article, etc.) */}
      {extraSchemas.map((schema, i) => (
        <script key={i} type="application/ld+json">{JSON.stringify(schema)}</script>
      ))}
    </Helmet>
  )
}
