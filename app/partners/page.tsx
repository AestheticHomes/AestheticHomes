import type { Metadata } from 'next'
import Link from 'next/link'
import { CONTACT, SITE } from '@/lib/constants'
import { PageHero, SectionHeader, CtaStrip, LinkButton, Badge } from '@/components/ui'
import Breadcrumbs from '@/components/ui/Breadcrumbs'
import TestimonialCard from '@/components/ui/TestimonialCard'

export const metadata: Metadata = {
  title: 'Partner With Us | Execution Partner for Architects & Designers | Aesthetic Homes Chennai',
  description: 'Aesthetic Homes offers white-label interior execution services for freelance architects and interior designers in Chennai. In-house team, GST invoicing, NDA available.',
  alternates: {
    canonical: `${SITE.url}/partners`,
  },
  openGraph: {
    title: 'Partner With Us | Execution Partner for Architects & Designers | Aesthetic Homes Chennai',
    description: 'Aesthetic Homes offers white-label interior execution services for freelance architects and interior designers in Chennai. In-house team, GST invoicing, NDA available.',
    url: `${SITE.url}/partners`,
    siteName: SITE.name,
    locale: 'en_IN',
    type: 'website',
  },
}

export default function PartnersPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${SITE.url}/partners/#webpage`,
        url: `${SITE.url}/partners`,
        name: 'Execution Partner for Architects & Designers | Aesthetic Homes Chennai',
        description: 'White-label interior execution services for freelance architects and interior designers in Chennai.',
      },
      {
        '@type': 'Service',
        '@id': `${SITE.url}/partners/#service`,
        name: 'B2B Interior Execution Services',
        provider: { '@id': `${SITE.url}/#organization` },
        description: 'Execution and manufacturing partnership for freelance architects and interior designers in Chennai. Includes modular kitchens, wardrobes, false ceilings, and complete turnkey execution.',
        areaServed: { '@type': 'City', name: 'Chennai' },
        serviceType: 'B2B Interior Contractor',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="sec" style={{ paddingTop: 'var(--sp-4)', paddingBottom: 0 }}>
        <div className="container">
          <Breadcrumbs
            items={[
              { name: 'Home', url: '/' },
              { name: 'For Professionals', url: '/partners' },
              { name: 'Execution Partner', url: '/partners' },
            ]}
          />
        </div>
      </div>

      <main>
        {/* ── 1. HERO ── */}
        <section aria-labelledby="hero-heading" className="sec">
          <div className="container" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
            <h1 id="hero-heading" style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'var(--c-navy)', lineHeight: 'var(--lh-tight)', marginBottom: 'var(--sp-4)' }}>
              You design it. <em>We build it.</em>
            </h1>
            <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--c-text-2)', lineHeight: 'var(--lh-relax)', marginBottom: 'var(--sp-6)' }}>
              Execution partnership for architects and interior designers across Chennai. Your design. Your client. Our craftsmanship.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap', marginBottom: 'var(--sp-8)' }}>
              <LinkButton
                variant="navy"
                href={`https://wa.me/${CONTACT.phone1.replace('+', '')}?text=Hi%2C%20I%27m%20an%20architect/designer%20looking%20for%20an%20execution%20partner`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Let&apos;s Talk Projects
              </LinkButton>
              <LinkButton variant="outline-navy" href="#">
                Download Rate Card
              </LinkButton>
            </div>
            
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Badge variant="blue">✓ GST Registered</Badge>
              <Badge variant="green">✓ In-house Carpenters</Badge>
              <Badge variant="amber">✓ NDA on Request</Badge>
              <Badge variant="gold">✓ White-label Friendly</Badge>
            </div>
          </div>
        </section>

        {/* ── 2. WHO THIS IS FOR ── */}
        <section aria-labelledby="who-heading" className="sec sec--tint">
          <div className="container">
            <SectionHeader eyebrow="Our Partners" title={<>Built for <em>design professionals.</em></>} id="who-heading" />
            <div className="grid-auto-4">
              {[
                { title: 'Freelance Architects', icon: '📐' },
                { title: 'Interior Designers', icon: '🎨' },
                { title: 'Design Studios', icon: '🏢' },
                { title: 'Turnkey Consultants', icon: '🤝' },
              ].map((card, i) => (
                <div key={card.title} className="card reveal" style={{ padding: 'var(--sp-5)', textAlign: 'center', background: 'var(--c-bg)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--sp-3)' }} aria-hidden="true">{card.icon}</div>
                  <h3 style={{ fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-lg)', color: 'var(--c-navy)' }}>{card.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. WHAT WE HANDLE ── */}
        <section aria-labelledby="scope-heading" className="sec">
          <div className="container">
            <SectionHeader eyebrow="Capabilities" title={<>Our <em>execution scope.</em></>} id="scope-heading" />
            <div className="grid-auto-3">
              {[
                { title: 'Modular Kitchens', desc: 'Precision-cut modules, marine ply, PU finishes.' },
                { title: 'Wardrobes & Storage', desc: 'Sliding, hinged, and walk-in systems.' },
                { title: 'TV Units & Paneling', desc: 'Fluted panels, backlighting, floating consoles.' },
                { title: 'False Ceiling', desc: 'Gypsum and POP ceilings with ambient lighting.' },
                { title: 'Custom Carpentry', desc: 'Bespoke furniture crafted on-site or at our factory.' },
                { title: 'Painting & Tiling', desc: 'Impeccable finishing for walls and floors.' },
                { title: 'Electrical & Plumbing', desc: 'Concealed wiring, luxury fixtures, and precise routing.' },
                { title: 'Full Turnkey Execution', desc: 'We take the empty shell and hand over a finished home.' },
              ].map((s, i) => (
                <div key={s.title} className="reveal" style={{ padding: 'var(--sp-4)', border: 'var(--b-base)', borderRadius: 'var(--r-md)' }}>
                  <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 'var(--fw-semi)', color: 'var(--c-navy)', marginBottom: 'var(--sp-1)' }}>{s.title}</h3>
                  <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--c-text-2)' }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. HOW WE WORK TOGETHER ── */}
        <section aria-labelledby="how-heading" className="sec sec--navy">
          <div className="container">
            <SectionHeader eyebrow="The Process" title={<>Simple. Transparent. <em>Repeatable.</em></>} id="how-heading" dark />
            <div className="grid-auto-4" style={{ gap: 'var(--sp-6)' }}>
              {[
                { n: '01', title: 'Share Files', desc: 'Send us your 2D drawings, 3D renders, and BOQ.' },
                { n: '02', title: 'Get a Quote', desc: 'We provide a strict B2B line-item quote within 48 hours for your approval.' },
                { n: '03', title: 'Site Execution', desc: 'Our team mobilizes. You get a dedicated PM and weekly progress reports.' },
                { n: '04', title: 'Handover & Docs', desc: 'Punch list cleared, site cleaned, warranties activated. Ready for your client.' },
              ].map((step) => (
                <div key={step.n} className="reveal" style={{ borderLeft: '2px solid var(--c-gold-dim)', paddingLeft: 'var(--sp-4)' }}>
                  <div style={{ color: 'var(--c-gold)', fontSize: 'var(--fs-lg)', fontFamily: 'var(--f-serif)', marginBottom: 'var(--sp-2)' }}>{step.n}</div>
                  <h3 style={{ color: 'var(--c-text-inv)', fontSize: 'var(--fs-lg)', marginBottom: 'var(--sp-2)' }}>{step.title}</h3>
                  <p style={{ color: 'rgba(244,239,232,0.7)', fontSize: 'var(--fs-sm)', lineHeight: 'var(--lh-relax)' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 5. WHY TRUST US ── */}
        <section aria-labelledby="why-heading" className="sec">
          <div className="container">
            <SectionHeader eyebrow="The Aesthetic Advantage" title={<>Why designers <em>trust us.</em></>} id="why-heading" />
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)', maxWidth: '800px', marginInline: 'auto' }}>
              {[
                { title: 'In-house team only', desc: 'We do not subcontract your work. Our carpenters, painters, and electricians are our own.' },
                { title: 'Works from any file type', desc: 'AutoCAD, SketchUp, PDF, or hand sketches.' },
                { title: 'Strict client confidentiality', desc: 'Your client remains your client. We offer complete white-label services.' },
                { title: 'GST Invoicing', desc: 'Clean books, input tax credit, and professional transactions.' },
                { title: '1-year warranty', desc: 'We stand by our craftsmanship long after the final payment.' },
              ].map((point) => (
                <li key={point.title} className="reveal" style={{ display: 'flex', gap: 'var(--sp-3)', paddingBottom: 'var(--sp-4)', borderBottom: 'var(--b-base)' }}>
                  <span style={{ color: 'var(--c-gold)', fontSize: '1.5rem' }}>✓</span>
                  <div>
                    <strong style={{ display: 'block', fontSize: 'var(--fs-lg)', color: 'var(--c-navy)', marginBottom: 'var(--sp-1)' }}>{point.title}</strong>
                    <span style={{ color: 'var(--c-text-2)', lineHeight: 'var(--lh-relax)' }}>{point.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── 6. SOCIAL PROOF ── */}
        <section className="sec sec--tint" aria-labelledby="testimonials-heading">
          <div className="container">
            <h2 id="testimonials-heading" className="sr-only">Testimonials</h2>
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <TestimonialCard
                testimonial={{
                  _id: 'dummy-b2b',
                  clientName: 'Rahul Menon, Principal Architect',
                  location: 'Chennai',
                  rating: 5,
                  review: 'Partnering with Aesthetic Homes has allowed me to focus completely on design. They handle the execution headaches perfectly, always respecting my vision and delivering on budget.',
                  source: 'Google',
                  date: new Date().toISOString(),
                }}
              />
            </div>
          </div>
        </section>

        {/* ── 7. FINAL CTA ── */}
        <section aria-labelledby="cta-heading" className="sec">
          <div className="container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
            <h2 id="cta-heading" style={{ fontFamily: 'var(--f-serif)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: 'var(--c-navy)', marginBottom: 'var(--sp-4)' }}>
              Let&apos;s build something <em>together.</em>
            </h2>
            <p style={{ fontSize: 'var(--fs-lg)', color: 'var(--c-text-2)', marginBottom: 'var(--sp-6)' }}>
              Reach out today to discuss your next project, review our rate card, or request an NDA.
            </p>
            <div style={{ display: 'flex', gap: 'var(--sp-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <LinkButton
                variant="navy"
                href={`https://wa.me/${CONTACT.phone1.replace('+', '')}?text=Hi%2C%20I%27d%20like%20to%20discuss%20partnering%20for%20execution`}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Us
              </LinkButton>
              <LinkButton variant="outline-navy" href={`mailto:${CONTACT.email}`}>
                Email {CONTACT.email}
              </LinkButton>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
