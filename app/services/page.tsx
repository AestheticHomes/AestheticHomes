import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import ServicesPage from '@/views/ServicesPage'
import { CONTACT, SERVICES_FAQS, SITE } from '@/lib/constants'
import { buildBreadcrumbSchema, buildFaqSchema, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/services', {
    title: 'Interior Design Services Chennai - Modular Kitchen, Wardrobe, Full Home',
    description: `Budget interior design services in Chennai: modular kitchens from ₹85k, wardrobes from ₹45k, full home interiors, 3D visualization, renovation. Free site visit. ${SITE.rating}★ rated. GSTIN: ${SITE.gstin}. Call ${CONTACT.phone1Display}.`,
  })
}

export default function Page() {
  return (
    <>
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
