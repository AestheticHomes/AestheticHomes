import Link from 'next/link'
import InstagramEmbed from '../../app/components/InstagramEmbed'
import ServiceCard from '@/components/ui/ServiceCard'
import { PageHero, ProcessStep, SectionHeader, CtaStrip } from '@/components/ui'
import { CONTACT, SERVICES, PROCESS_STEPS } from '@/lib/constants'

export default function ServicesPage() {
  return (
    <div>
      <nav aria-label="breadcrumb" className="sec" style={{ paddingTop: 'var(--sp-5)', paddingBottom: 'var(--sp-3)' }}>
        <div className="container">
          <ol
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--sp-2)',
              color: 'var(--c-text-muted)',
              fontSize: 'var(--fs-sm)',
              listStyle: 'none',
              padding: 0,
              margin: 0,
            }}
          >
            <li>
              <Link href="/" style={{ color: 'inherit' }}>
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" style={{ color: 'inherit' }}>
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" style={{ color: 'var(--c-text)' }}>
              Interior Design Services
            </li>
          </ol>
        </div>
      </nav>

      <PageHero
        eyebrow="Services"
        title={
          <>
            Interior Services in Chennai -
            <br />
            <em>Budget-Friendly, Luxury Feel</em>
          </>
        }
        subtitle="Every service comes with free site visit, 3D visualization and a transparent line-item quote."
      />

      <section className="sec" aria-labelledby="services-list-heading">
        <div className="container">
          <h2 id="services-list-heading" className="sr-only">
            All Services
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
            {SERVICES.map((svc, i) => (
              <div key={svc.id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                <ServiceCard
                  service={{ ...svc }}
                  afterDescription={
                    svc.id === 'kitchen' ? (
                      <div className="svc-embed">
                        <p className="svc-embed__label">
                          See a modular kitchen installation in Chennai →
                        </p>
                        {/* TODO: Replace with kitchen reel URL from Instagram */}
                        <InstagramEmbed
                          postUrl="https://www.instagram.com/reel/DCz0eQgz7ck/"
                          caption="Modular kitchen installation by Aesthetic Homes, Chennai"
                        />
                      </div>
                    ) : svc.id === 'wardrobe' ? (
                      <div className="svc-embed">
                        <p className="svc-embed__label">
                          Watch a wardrobe build in Chennai →
                        </p>
                        {/* TODO: Replace with wardrobe reel URL from Instagram */}
                        <InstagramEmbed
                          postUrl="https://www.instagram.com/reel/C-qjl8OSqRi/"
                          caption="Custom wardrobe build by Aesthetic Homes, Chennai"
                        />
                      </div>
                    ) : undefined
                  }
                />
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--sp-6)', display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <Link href="/projects" className="btn btn--outline-navy btn--sm">
              See Related Projects
            </Link>
            <Link href="/blog" className="btn btn--outline-navy btn--sm">
              Read Service Guides
            </Link>
            <Link href="/contact" className="btn btn--outline-navy btn--sm">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </section>

      <section className="sec sec--navy" aria-labelledby="services-process-heading">
        <div className="container">
          <SectionHeader
            eyebrow="Our Process"
            title={
              <>
                From <em>Idea to Handover</em>
              </>
            }
            subtitle="A straightforward 5-step process - free at every stage until you're ready to commit."
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

      <CtaStrip
        title="Book a Free Site Visit"
        subtitle="We visit your home, measure, and present a 3D design - all free."
        primaryLabel="WhatsApp Us →"
        primaryHref={CONTACT.waLink1}
        secondaryLabel={`Call ${CONTACT.phone1Display}`}
        secondaryTel={CONTACT.phone1}
      />

      <style>{`
        .svc-embed { margin-top: 24px; max-width: 420px; }
        .svc-embed__label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-accent, #b07d4a);
          margin-bottom: 12px;
        }
      `}</style>
    </div>
  )
}
