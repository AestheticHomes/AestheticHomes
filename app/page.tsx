import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import HomePage from '@/views/HomePage'
import { HOME_FAQS } from '@/lib/constants'
import { buildFaqSchema, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/', {
    title: 'Interior Design & Home Renovation Services in Chennai and Nellore',
    description: 'Interior design and home renovation services in Chennai and Nellore by Aesthetic Homes.',
    canonicalPath: '/',
  })
}

export default function Page() {
  return (
    <>
      <JsonLd id="home-faq-schema" data={buildFaqSchema([...HOME_FAQS])} />
      <HomePage />
    </>
  )
}
