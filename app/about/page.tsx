import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import AboutPage from '@/views/AboutPage'
import { ABOUT_FAQS, CONTACT, SITE } from '@/lib/constants'
import { QUERIES, sanityFetch } from '@/lib/sanity'
import { buildFaqSchema, buildPageMetadata } from '@/lib/seo'
import type { TeamMember } from '@/types'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/about', {
    title: `About Aesthetic Homes - ${SITE.yearsInBiz} Years of Interior Design in Chennai`,
    description: `Aesthetic Homes has been delivering budget-friendly luxury interiors in Chennai since ${SITE.founded}. GSTIN: ${SITE.gstin}. ${SITE.projectCount} projects, ${SITE.rating}★ rated. Registered at ${CONTACT.address.full}.`,
  })
}

export default async function Page() {
  const team =
    (await sanityFetch<TeamMember[]>({
      query: QUERIES.teamMembers,
      revalidate,
    })) ?? []

  return (
    <>
      <JsonLd id="about-faq-schema" data={buildFaqSchema([...ABOUT_FAQS])} />
      <AboutPage team={team} />
    </>
  )
}
