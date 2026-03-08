import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/privacy-policy', {
    title: 'Privacy Policy',
    description: `Privacy policy for ${SITE.name}.`,
  })
}

export default function Page() {
  return (
    <section className="sec">
      <div className="container">
        <h1 className="sec__title">Privacy Policy</h1>
        <p className="sec__sub">This page outlines how Aesthetic Homes handles enquiry and contact data.</p>
      </div>
    </section>
  )
}
