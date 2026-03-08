import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/terms', {
    title: 'Terms of Service',
    description: `Terms of service for ${SITE.name}.`,
  })
}

export default function Page() {
  return (
    <section className="sec">
      <div className="container">
        <h1 className="sec__title">Terms of Service</h1>
        <p className="sec__sub">These terms govern use of the Aesthetic Homes website and enquiry channels.</p>
      </div>
    </section>
  )
}
