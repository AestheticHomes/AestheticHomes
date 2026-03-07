/**
 * @file src/views/HomePage.tsx
 * @description Home page — the primary landing experience.
 *
 * PAGE SECTIONS (in render order)
 * ────────────────────────────────
 * 1. Hero           — Full-viewport dark hero with H1, stats, dual CTA
 * 2. TrustBar       — Scrollable horizontal trust signals strip
 * 3. Services Grid  — 6 service cards, links to Services page
 * 4. HomeFix Bridge — Dark section promoting homefix.co.in
 * 5. Process        — 5-step how-we-work numbered cards
 * 6. Location Strip — Service area badges for local SEO
 * 7. FAQ            — Accordion + FAQPage JSON-LD for rich results
 * 8. CTA Strip      — Gold full-width call-to-action
 *
 * SEO
 * ───
 * • Title: "Budget Interior Designer Chennai | 10 Years · 53 Projects"
 * • FAQPage JSON-LD → Google rich result (accordion in search)
 * • Organization + WebSite JSON-LD (via <Seo>)
 * • hero H1 contains primary keyword: "Budget Interior Designer Chennai"
 *
 * DATA
 * ────
 * Static only — no Sanity fetch on homepage.
 * Testimonials + featured projects are fetched lazily
 * only when user navigates to the Projects page.
 */

import Seo, { buildFaqSchema } from '@/components/seo/Seo'
import { TrustBar, SectionHeader, ProcessStep, FaqAccordion, CtaStrip } from '@/components/ui'
import ServiceCard from '@/components/ui/ServiceCard'
import { SITE, CONTACT, HOMEFIX, HOME_FAQS, SERVICES, PROCESS_STEPS, SERVICE_AREAS } from '@/lib/constants'
import { useReveal } from '@/lib/hooks'
import type { ViewName } from '@/types'

interface Props {
  onNav: (v: ViewName) => void
}

export default function HomePage({ onNav }: Props) {
  const revealRef = useReveal()

  return (
    <>
      <Seo
        title="Interior Design & Home Renovation Services in Chennai and Nellore"
        description="Interior design and home renovation services in Chennai and Nellore by Aesthetic Homes."
        canonical={SITE.url}
        jsonLd={buildFaqSchema([...HOME_FAQS])}
      />

      <div ref={revealRef}>

        {/* ════════════════════════════════════════════════
            SECTION 1 — HERO
            Full viewport, navy background.
            H1 contains primary keyword.
            Dual CTA: WhatsApp (primary) + Projects (secondary)
            Stats row at bottom for trust at a glance.
        ════════════════════════════════════════════════ */}
        <section
          aria-label="Hero"
          style={{
            background: 'var(--c-navy)',
            minHeight: '92svh',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
            padding: 'var(--sp-8) var(--sec-x) var(--sp-10)',
            paddingLeft:  'max(var(--sec-x), var(--safe-left))',
            paddingRight: 'max(var(--sec-x), var(--safe-right))',
            position: 'relative', overflow: 'hidden',
          }}
        >
          {/* Background geometric grid texture */}
          <div
            aria-hidden="true"
            style={{
              position:'absolute', inset:0, opacity:0.025,
              backgroundImage: [
                'repeating-linear-gradient(0deg,transparent,transparent 60px,rgba(200,169,110,1) 60px,rgba(200,169,110,1) 61px)',
                'repeating-linear-gradient(90deg,transparent,transparent 60px,rgba(200,169,110,1) 60px,rgba(200,169,110,1) 61px)',
              ].join(','),
              pointerEvents: 'none',
            }}
          />

          {/* Rating + founding chips */}
          <div style={{ display:'flex', gap:'var(--sp-2)', marginBottom:'var(--sp-5)', flexWrap:'wrap' }}>
            <span className="badge badge--gold" aria-label={`${SITE.rating} stars from ${SITE.reviewCount}+ reviews`}>
              ★ {SITE.rating} · {SITE.reviewCount}+ Reviews
            </span>
            <span className="badge badge--gold">Est. {SITE.founded}</span>
            <span className="badge badge--gold">GSTIN Verified</span>
          </div>

          {/* H1 — primary local keyword phrase */}
          <h1
            style={{
              fontFamily: 'var(--f-serif)',
              fontSize: 'var(--fs-hero)',
              fontWeight: 'var(--fw-med)',
              color: 'var(--c-text-inv)',
              lineHeight: 'var(--lh-tight)',
              letterSpacing: 'var(--ls-tight)',
              marginBottom: 'var(--sp-5)',
              maxWidth: '18ch',
            }}
          >
            Interior Design &amp; Home Renovation Services in Chennai
            <br />
            <em style={{ color:'var(--c-gold)', fontStyle:'italic' }}>Now Serving Nellore</em>
          </h1>

          <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-inv-dim)', maxWidth:'46ch', lineHeight:'var(--lh-loose)', marginBottom:'var(--sp-8)' }}>
            {SITE.yearsInBiz} years · {SITE.projectCount} homes · {SITE.rating}★ rated.
            Expert modular kitchens, wardrobes and full home interiors across Chennai and Nellore —
            transparent pricing, zero hidden costs.
          </p>

          {/* Dual CTA */}
          <div style={{ display:'flex', gap:'var(--sp-3)', flexWrap:'wrap' }}>
            <a
              href={CONTACT.waLink1}
              className="btn btn--gold btn--lg"
              target="_blank" rel="noopener noreferrer"
              aria-label="Get a free interior design quote on WhatsApp"
            >
              Free Site Visit →
            </a>
            <button
              className="btn btn--outline-inv btn--lg"
              onClick={() => onNav('projects')}
              aria-label={`View all ${SITE.projectCount} completed projects`}
            >
              View {SITE.projectCount} Projects
            </button>
          </div>

          {/* Stats row */}
          <div
            role="list"
            aria-label="Key statistics"
            style={{ display:'flex', gap:'var(--sp-8)', marginTop:'var(--sp-10)', paddingTop:'var(--sp-6)', borderTop:'1px solid rgba(244,239,232,0.10)', flexWrap:'wrap' }}
          >
            {[
              { n:`${SITE.projectCount}+`,   l:'Projects Done'  },
              { n:`${SITE.yearsInBiz} Yrs`,  l:'In Business'    },
              { n:`${SITE.rating}★`,          l:'Google Rating'  },
              { n:'100km',                    l:'Service Radius' },
            ].map((stat) => (
              <div key={stat.l} role="listitem">
                <div style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-2xl)', fontWeight:'var(--fw-med)', color:'var(--c-text-inv)', lineHeight:1 }}>
                  {stat.n}
                </div>
                <div style={{ fontSize:'var(--fs-xs)', letterSpacing:'var(--ls-wider)', textTransform:'uppercase', color:'var(--c-text-inv-dim)', marginTop:'var(--sp-1)' }}>
                  {stat.l}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 2 — TRUST BAR
            Horizontal scrollable row of 6 trust signals.
        ════════════════════════════════════════════════ */}
        <TrustBar />

        {/* ════════════════════════════════════════════════
            SECTION 3 — SERVICES PREVIEW
            6 compact service cards → navigate to /services
        ════════════════════════════════════════════════ */}
        <section className="sec sec--linen" aria-labelledby="home-services-heading">
          <div className="container">
            <SectionHeader
              eyebrow="What We Do"
              title={<>Budget-Friendly <em>Interior Services</em><br />Across Chennai</>}
              subtitle="From a single modular kitchen to a complete 4BHK — quality that looks premium at a price that makes sense."
            />
            <div className="grid-auto-3" style={{ gap:'var(--sp-2)' }}>
              {SERVICES.slice(0, 6).map((svc, i) => (
                <div key={svc.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <ServiceCard service={{ ...svc }} compact onNav={onNav} />
                </div>
              ))}
            </div>
            <div style={{ marginTop:'var(--sp-8)', textAlign:'center' }}>
              <button className="btn btn--outline-navy" onClick={() => onNav('services')} aria-label="View all interior design services">
                View All Services →
              </button>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 4 — HOMEFIX BRIDGE
            Cross-domain SEO signal: links Aesthetic Homes to homefix.co.in
            Structured as subOrganization in JSON-LD (see Seo.tsx)
        ════════════════════════════════════════════════ */}
        <section
          className="sec sec--navy"
          style={{ borderTop:'2px solid var(--c-gold)' }}
          aria-labelledby="homefix-heading"
        >
          <div className="container">
            <div className="sec__eyebrow">Our Digital Platform</div>
            <h2
              id="homefix-heading"
              style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-4xl)', fontWeight:'var(--fw-med)', color:'var(--c-text-inv)', lineHeight:'var(--lh-snug)', marginBottom:'var(--sp-5)' }}
            >
              Shop Modular Furniture on{' '}
              <em style={{ color:'var(--c-gold)', fontStyle:'italic' }}>HomeFix</em>
            </h2>
            <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-inv-dim)', lineHeight:'var(--lh-loose)', maxWidth:'50ch', marginBottom:'var(--sp-6)' }}>
              HomeFix is Aesthetic Homes' online modular furniture platform.
              Browse, plan in 3D and order — flat-pack delivery with free installation across Chennai.
            </p>

            {/* Feature chips */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:'var(--sp-2)', marginBottom:'var(--sp-6)' }}>
              {['Kitchens from ₹85k','Wardrobes from ₹45k','TV Units from ₹18k','Free Installation','3–5 Day Dispatch','2D / 3D Planning'].map((chip) => (
                <span key={chip} className="badge badge--gold">{chip}</span>
              ))}
            </div>

            <div style={{ display:'flex', gap:'var(--sp-3)', flexWrap:'wrap' }}>
              <a href={HOMEFIX.store}     className="btn btn--gold"        target="_blank" rel="noopener noreferrer" aria-label="Browse HomeFix store">Browse Store →</a>
              <a href={HOMEFIX.estimator} className="btn btn--outline-inv" target="_blank" rel="noopener noreferrer" aria-label="Try 3D kitchen estimator">Try 3D Estimator</a>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 5 — PROCESS
            5 numbered steps, staggered reveal animation.
        ════════════════════════════════════════════════ */}
        <section className="sec" aria-labelledby="process-heading">
          <div className="container">
            <SectionHeader
              eyebrow="How We Work"
              title={<>Our <em>Process</em> — Simple & Transparent</>}
              center
            />
            <div className="grid-auto-3">
              {PROCESS_STEPS.map((step, i) => (
                <div key={step.num} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <ProcessStep {...step} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 6 — LOCATION STRIP
            Area badges for local SEO.
            Each visible area is a keyword signal.
        ════════════════════════════════════════════════ */}
        <section className="sec sec--tint" aria-labelledby="locations-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Service Areas"
              title={<>Interior Designer <em>Near You</em> in Chennai & Nellore</>}
              subtitle="We serve all areas of Chennai and up to 100km radius — including Nellore, Kanchipuram, Chengalpattu, and Pondicherry."
              center
            />
            <div style={{ display:'flex', flexWrap:'wrap', gap:'var(--sp-2)', justifyContent:'center', marginTop:'var(--sp-8)' }} role="list" aria-label="Service areas">
              {SERVICE_AREAS.slice(0, 32).map((area) => (
                <span key={area} className="badge badge--gold" role="listitem">{area}</span>
              ))}
            </div>
            <div style={{ textAlign:'center', marginTop:'var(--sp-6)' }}>
              <a href={CONTACT.waLink1} className="btn btn--navy" target="_blank" rel="noopener noreferrer" aria-label="Book a free site visit in your area">
                Book Free Site Visit →
              </a>
            </div>
          </div>
        </section>

        {/* ── Local SEO Content Blocks ── */}
        <section className="sec" aria-labelledby="local-seo-heading">
          <div className="container">
            <SectionHeader
              eyebrow="Locations"
              title={<>Interior Design Services in <em>Chennai & Nellore</em></>}
              subtitle="Dedicated local teams for interior design, renovation and turnkey execution."
            />
            <div className="grid-auto-2">
              <article className="card" style={{ padding: 'var(--sp-6)' }}>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-xl)', color: 'var(--c-navy)', marginBottom: 'var(--sp-3)' }}>
                  Interior Designers in Chennai
                </h2>
                <p style={{ color: 'var(--c-text-2)', lineHeight: 'var(--lh-relax)' }}>
                  Our Chennai team handles modular kitchens, wardrobes, full-home interiors and turnkey apartment projects with detailed 3D planning, transparent costing and on-site supervision.
                </p>
              </article>
              <article className="card" style={{ padding: 'var(--sp-6)' }}>
                <h2 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-xl)', color: 'var(--c-navy)', marginBottom: 'var(--sp-3)' }}>
                  Home Renovation in Nellore
                </h2>
                <p style={{ color: 'var(--c-text-2)', lineHeight: 'var(--lh-relax)' }}>
                  We provide home renovation and remodeling in Nellore, including kitchen revamps, space planning, electrical and painting coordination, and complete interior upgrades for new and existing homes.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 7 — FAQ
            <details> accordion + FAQPage JSON-LD (injected via <Seo>)
            Google shows these as rich result accordions in search.
        ════════════════════════════════════════════════ */}
        <section className="sec sec--linen" aria-labelledby="faq-heading">
          <div className="container">
            <SectionHeader
              eyebrow="FAQs"
              title={<>Common Questions About <em>Interior Design in Chennai</em></>}
            />
            <FaqAccordion items={[...HOME_FAQS]} />
          </div>
        </section>

        {/* ════════════════════════════════════════════════
            SECTION 8 — CTA STRIP
            Gold band, high contrast, final conversion prompt.
        ════════════════════════════════════════════════ */}
        <CtaStrip
          title="Ready to Transform Your Home?"
          subtitle="Free site visit · Free 3D design · No commitment needed"
          primaryLabel="WhatsApp Us →"
          primaryHref={CONTACT.waLink1}
          secondaryLabel={`Call ${CONTACT.phone1Display}`}
          secondaryTel={CONTACT.phone1}
        />

      </div>
    </>
  )
}
