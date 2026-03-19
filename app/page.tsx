import type { Metadata } from 'next'
import HomePage from '@/src/views/HomePage'
import { buildPageMetadata } from '@/lib/seo'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is the cost of home interiors in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Home interior costs in Chennai range from ₹800 to ₹2,500 per sq ft depending on materials and scope. Aesthetic Homes offers free site visits and transparent line-item quotes before any commitment.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you offer free site visits in Chennai?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Aesthetic Homes provides free site visits anywhere in Chennai with no travel charge and zero commitment. Book via WhatsApp at +91 73973 30591.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does a full home interior project take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A typical 2-3 BHK full home interior takes 45-60 days from design approval to handover. We provide a fixed delivery date in the contract.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are you GST registered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Aesthetic Homes is GST registered (GSTIN: 33BNMPA8199N1ZB). All projects receive proper GST invoices.',
      },
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/')
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <HomePage />
    </>
  )
}
