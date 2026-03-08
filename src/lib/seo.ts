import type { Metadata } from 'next'
import { CONTACT, HOMEFIX, SERVICE_AREAS, SITE, SOCIAL } from '@/lib/constants'

export const PAGE_META = {
  '/': {
    title: 'Interior Design & Home Renovation Services in Chennai and Nellore',
    description: 'Interior design and home renovation services in Chennai and Nellore by Aesthetic Homes.',
  },
  '/projects': {
    title: `Interior Design Projects Chennai - ${SITE.projectCount} Completed Projects`,
    description: `Browse ${SITE.projectCount}+ completed interior design projects by Aesthetic Homes in Chennai. Modular kitchens, wardrobes, full home interiors across Adyar, OMR, Anna Nagar, Velachery and more. ${SITE.rating}★ rated.`,
  },
  '/services': {
    title: 'Interior Design Services Chennai - Modular Kitchen, Wardrobe, Full Home',
    description: 'Interior design and home renovation services in Chennai and Nellore by Aesthetic Homes. Modular kitchens from ₹85k, wardrobes from ₹45k, full home interiors, 3D visualization and renovation.',
  },
  '/about': {
    title: `About Aesthetic Homes - ${SITE.yearsInBiz} Years of Interior Design in Chennai`,
    description: `Aesthetic Homes has been delivering budget-friendly luxury interiors in Chennai since ${SITE.founded}. GSTIN: ${SITE.gstin}. ${SITE.projectCount} projects, ${SITE.rating}★ rated.`,
  },
  '/blog': {
    title: 'Interior Design Blog - Tips, Ideas & Project Stories | Chennai',
    description: `Interior design tips, modular kitchen ideas, wardrobe guides and before-after project stories from Aesthetic Homes Chennai. ${SITE.projectCount}+ projects, ${SITE.rating}★ rated.`,
  },
  '/contact': {
    title: 'Contact Aesthetic Homes - Free Site Visit Chennai',
    description: `Contact Aesthetic Homes for a free interior design and renovation site visit in Chennai or Nellore. WhatsApp ${CONTACT.phone1Display}.`,
  },
  '/estimator': {
    title: 'Interior Design Cost Estimator Chennai - Kitchen & Wardrobe Budget Calculator',
    description: `Estimate interior design costs in Chennai with our interactive calculator. Modular kitchens, wardrobes - live 2D plan + instant cost breakdown. Aesthetic Homes, ${SITE.projectCount} projects, ${SITE.rating}★.`,
  },
  '/store': {
    title: 'HomeFix Store - Modular Kitchens, Wardrobes & TV Units | Chennai',
    description: 'Browse HomeFix modular furniture: kitchens from ₹85k, wardrobes from ₹45k, TV units from ₹18k. Flat-pack delivery 3-5 days, FREE installation in Chennai. By Aesthetic Homes.',
  },
} as const

type ArticleMeta = {
  publishedAt?: string
  tags?: string[]
}

type BuildMetadataInput = {
  title?: string
  description?: string
  canonicalPath?: string
  ogImage?: string
  type?: 'website' | 'article'
  noIndex?: boolean
  location?: string
  article?: ArticleMeta
}

const toAbsoluteUrl = (pathOrUrl: string) => {
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) return pathOrUrl
  if (pathOrUrl === '/' || pathOrUrl === '') return `${SITE.url}/`
  return `${SITE.url}${pathOrUrl}`
}

export function buildPageMetadata(path: keyof typeof PAGE_META | string, input: BuildMetadataInput = {}): Metadata {
  const pageMeta = PAGE_META[path as keyof typeof PAGE_META] ?? PAGE_META['/']
  const canonicalUrl = toAbsoluteUrl(input.canonicalPath ?? path)
  const imageUrl = input.ogImage ?? SITE.ogImage
  const fullTitle = `${input.title ?? pageMeta.title} | ${SITE.name}`
  const fullDescription = input.description ?? pageMeta.description

  return {
    title: fullTitle,
    description: fullDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: input.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: input.type ?? 'website',
      title: fullTitle,
      description: fullDescription,
      url: canonicalUrl,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_IN',
      siteName: SITE.name,
      ...(input.type === 'article'
        ? {
            publishedTime: input.article?.publishedAt,
            tags: input.article?.tags,
          }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
    },
    other: {
      'geo.region': 'IN-TN',
      'geo.placename': input.location ?? 'Chennai',
      'geo.position': `${CONTACT.address.lat};${CONTACT.address.lng}`,
      ICBM: `${CONTACT.address.lat}, ${CONTACT.address.lng}`,
      ...(input.article?.publishedAt ? { 'article:published_time': input.article.publishedAt } : {}),
      ...(input.article?.tags?.length ? { 'article:tag': input.article.tags.join(', ') } : {}),
    },
  }
}

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
      '@id': `${SITE.url}/#organization`,
      name: SITE.name,
      legalName: SITE.legalName,
      alternateName: ['Aesthetic Homes Chennai', 'Aesthetic Homes Nellore', 'Aesthetic Homes Interiors'],
      url: SITE.url,
      logo: {
        '@type': 'ImageObject',
        url: SITE.logo,
        width: 192,
        height: 192,
      },
      image: SITE.ogImage,
      description: `${SITE.name} provides interior design and home renovation services in Chennai and Nellore. Modular kitchens, wardrobes, TV units and full home interiors with turnkey execution.`,
      foundingDate: String(SITE.founded),
      taxID: SITE.gstin,
      vatID: SITE.gstin,
      telephone: [CONTACT.phone1Display],
      email: CONTACT.email,
      address: {
        '@type': 'PostalAddress',
        streetAddress: CONTACT.address.street,
        addressLocality: CONTACT.address.area,
        addressRegion: CONTACT.address.state,
        postalCode: CONTACT.address.pincode,
        addressCountry: CONTACT.address.country,
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: CONTACT.address.lat,
        longitude: CONTACT.address.lng,
      },
      areaServed: SERVICE_AREAS.map((area) => ({
        '@type': 'City',
        name: area,
      })),
      serviceArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: CONTACT.address.lat,
          longitude: CONTACT.address.lng,
        },
        geoRadius: '100000',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      ],
      priceRange: '₹₹',
      currenciesAccepted: 'INR',
      paymentAccepted: 'Cash, UPI, Bank Transfer, Cheque',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: String(SITE.rating),
        reviewCount: String(SITE.reviewCount),
        bestRating: '5',
        worstRating: '1',
      },
      sameAs: [SOCIAL.instagram, SOCIAL.youtube, HOMEFIX.url, SITE.url],
      subOrganization: {
        '@type': 'Organization',
        '@id': `${HOMEFIX.url}/#organization`,
        name: 'HomeFix',
        url: HOMEFIX.url,
        description:
          'HomeFix is the digital modular furniture platform by Aesthetic Homes - online store, 2D/3D planning and free installation in Chennai.',
        parentOrganization: { '@id': `${SITE.url}/#organization` },
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Interior Design Services Chennai',
        itemListElement: [
          {
            '@type': 'Offer',
            priceCurrency: 'INR',
            lowPrice: '85000',
            itemOffered: {
              '@type': 'Service',
              name: 'Modular Kitchen Chennai',
              description: 'L, U, island, parallel modular kitchens in Chennai',
            },
          },
          {
            '@type': 'Offer',
            priceCurrency: 'INR',
            lowPrice: '45000',
            itemOffered: { '@type': 'Service', name: 'Wardrobe Design Chennai' },
          },
          {
            '@type': 'Offer',
            priceCurrency: 'INR',
            lowPrice: '18000',
            itemOffered: { '@type': 'Service', name: 'TV Unit Design Chennai' },
          },
          {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'INR',
            itemOffered: { '@type': 'Service', name: 'Free 3D Interior Visualization Chennai' },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Full Home Interior Design Chennai',
              description: 'Turnkey interior design for apartments and villas in Chennai',
            },
          },
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      description: SITE.tagline,
      inLanguage: 'en-IN',
      publisher: { '@id': `${SITE.url}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE.url}/projects?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
}

export const localBusinessSchema = (area: string) => ({
  '@context': 'https://schema.org',
  '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
  '@id': `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, '-')}/#localbusiness`,
  name: `Aesthetic Homes - Interior Designer in ${area}, Chennai`,
  url: `${SITE.url}/interior-designer-${area.toLowerCase().replace(/\s+/g, '-')}`,
  telephone: CONTACT.phone1Display,
  address: {
    '@type': 'PostalAddress',
    addressLocality: area,
    addressRegion: 'Tamil Nadu',
    addressCountry: 'IN',
  },
  areaServed: [{ '@type': 'City', name: area }],
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: String(SITE.rating),
    reviewCount: String(SITE.reviewCount),
    bestRating: '5',
    worstRating: '1',
  },
  parentOrganization: { '@id': `${SITE.url}/#organization` },
})

export const buildBreadcrumbSchema = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: item.name,
    item: item.url,
  })),
})

export const buildFaqSchema = (faqs: { q: string; a: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
})

export const buildArticleSchema = (post: {
  title: string
  url: string
  image?: string
  publishedAt?: string
  tags?: string[]
}) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: post.title,
  url: post.url,
  image: post.image,
  datePublished: post.publishedAt,
  author: { '@id': `${SITE.url}/#organization` },
  publisher: { '@id': `${SITE.url}/#organization` },
  keywords: post.tags?.join(', '),
})
