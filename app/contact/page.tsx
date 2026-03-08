import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import ContactPage from '@/views/ContactPage'
import { CONTACT, CONTACT_FAQS, SITE } from '@/lib/constants'
import { buildFaqSchema, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/contact', {
    title: 'Contact Aesthetic Homes - Free Site Visit Chennai',
    description: `Contact Aesthetic Homes for a free interior design site visit in Chennai. WhatsApp ${CONTACT.phone1Display}. GSTIN: ${SITE.gstin}. Mon-Sat 9 AM-7 PM.`,
  })
}

export default function Page() {
  return (
    <>
      <JsonLd id="contact-faq-schema" data={buildFaqSchema([...CONTACT_FAQS])} />
      <ContactPage />
    </>
  )
}
