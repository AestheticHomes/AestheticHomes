import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/accessibility', {
    title: 'Accessibility',
    description: `Accessibility statement for ${SITE.name}.`,
  })
}

export default function Page() {
  return (
    <section className="sec">
      <div className="container">
        <h1 className="sec__title">Accessibility</h1>
        <p className="sec__sub">Aesthetic Homes aims to provide an accessible browsing experience across devices.</p>
      </div>
    </section>
  )
}
