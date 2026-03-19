import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import ServicesPage from '@/views/ServicesPage'
import { CONTACT, SERVICES_FAQS, SITE } from '@/lib/constants'
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cost of a modular kitchen in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Modular kitchen costs in Chennai start from ₹85,000 for a basic L-shape layout. Full modular kitchens with premium hardware range from ₹1.5-3 lakhs depending on size and finish.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the cost of a wardrobe in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Wardrobes in Chennai start from ₹45,000 for a standard 2-door sliding unit. Floor-to-ceiling wardrobes with internal fittings range from ₹80,000-1.5 lakhs.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you do commercial interiors?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Aesthetic Homes handles offices, retail spaces, and hospitality interiors across Chennai with the same in-house team and fixed-price model.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/services', {
    title: 'Interior Design Services Chennai - Modular Kitchen, Wardrobe, Full Home',
    description: `Budget interior design services in Chennai: modular kitchens from ₹85k, wardrobes from ₹45k, full home interiors, 3D visualization, renovation. Free site visit. ${SITE.rating}★ rated. GSTIN: ${SITE.gstin}. Call ${CONTACT.phone1Display}.`,
  })
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <JsonLd id="services-faq-schema" data={buildFaqSchema([...SERVICES_FAQS])} />
      <JsonLd
        id="services-breadcrumb-schema"
        data={buildBreadcrumbSchema([
          { name: 'Home', url: SITE.url },
          { name: 'Services', url: `${SITE.url}/services` },
          { name: 'Interior Design Services', url: `${SITE.url}/services` },
        ])}
      />
      <ServicesPage />
    </>
  )
}
