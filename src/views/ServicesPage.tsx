/**
 * @file src/views/ServicesPage.tsx
 * @description All interior design services with pricing and HomeFix links.
 *
 * PAGE SECTIONS
 * ─────────────
 * 1. Dark hero header
 * 2. Full service list  — ServiceCard (full variant) for each service
 * 3. Process timeline   — 5-step numbered process on navy background
 * 4. Gold CTA strip
 *
 * SEO
 * ───
 * • Title: "Interior Design Services Chennai — Modular Kitchen, Wardrobe, Full Home"
 * • Each service listed in the master hasOfferCatalog (Seo.tsx orgSchema)
 *
 * DATA — Static only (no Sanity fetch)
 * Pricing and descriptions live in src/lib/constants.ts → SERVICES
 */

import Seo, { buildFaqSchema } from '@/components/seo/Seo'
import ServiceCard from '@/components/ui/ServiceCard'
import { PageHero, ProcessStep, SectionHeader, CtaStrip } from '@/components/ui'
import { SITE, CONTACT, SERVICES, PROCESS_STEPS, SERVICES_FAQS } from '@/lib/constants'
import { useReveal } from '@/lib/hooks'
import type { ViewName } from '@/types'

interface Props {
  onNav: (v: ViewName) => void
}

export default function ServicesPage({ onNav: _onNav }: Props) {
  const revealRef = useReveal()

  return (
    <>
      <Seo
        title="Interior Design Services Chennai — Modular Kitchen, Wardrobe, Full Home"
        description={`Budget interior design services in Chennai: modular kitchens from ₹85k, wardrobes from ₹45k, full home interiors, 3D visualization, renovation. Free site visit. ${SITE.rating}★ rated. GSTIN: ${SITE.gstin}. Call ${CONTACT.phone1Display}.`}
        canonical={`${SITE.url}/services`}
        jsonLd={buildFaqSchema([...SERVICES_FAQS])}
      />

      <div ref={revealRef}>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="Services"
          title={<>Interior Services in Chennai —<br /><em>Budget-Friendly, Luxury Feel</em></>}
          subtitle="Every service comes with free site visit, 3D visualization and a transparent line-item quote."
        />

        {/* ── Service Cards ── */}
        <section className="sec" aria-labelledby="services-list-heading">
          <div className="container">
            <h2 id="services-list-heading" className="sr-only">All Services</h2>
            <div style={{ display:'flex', flexDirection:'column', gap:'var(--sp-2)' }}>
              {SERVICES.map((svc, i) => (
                <div key={svc.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <ServiceCard service={{ ...svc }} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Process (navy background) ── */}
        <section className="sec sec--navy" aria-labelledby="services-process-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Our Process"
              title={<>From <em>Idea to Handover</em></>}
              subtitle="A straightforward 5-step process — free at every stage until you're ready to commit."
              dark
            />
            <div className="grid-auto-3">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <ProcessStep {...step} dark />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <CtaStrip
          title="Book a Free Site Visit"
          subtitle="We visit your home, measure, and present a 3D design — all free."
          primaryLabel="WhatsApp Us →"
          primaryHref={CONTACT.waLink1}
          secondaryLabel={`Call ${CONTACT.phone1Display}`}
          secondaryTel={CONTACT.phone1}
        />

      </div>
    </>
  )
}
