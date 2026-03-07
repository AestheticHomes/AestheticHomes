/**
 * @file src/views/StorePage.tsx
 * @description HomeFix Store showcase — bridges aesthetichomes.net to homefix.co.in.
 *
 * PURPOSE
 * ───────
 * Creates a cross-domain SEO signal between aesthetichomes.net and homefix.co.in.
 * Shows HomeFix product categories with deep-links to the live store.
 * Shared Sanity project images (same CDN URLs) + subOrganization schema + this
 * page reinforce to Google that both domains belong to the same brand.
 *
 * PAGE SECTIONS (in render order)
 * ────────────────────────────────
 * 1. Hero       — navy with HomeFix branding + dual CTA (store / 3D lab)
 * 2. Category cards — 4 cards linking to homefix.co.in/store/*
 * 3. Trust chips  — shared brand trust badges
 * 4. CtaStrip     — links back to full home interiors (Aesthetic Homes)
 *
 * SEO
 * ───
 * • Page canonical: aesthetichomes.net/#store
 * • subOrganization in orgSchema (Seo.tsx) links HomeFix as child org
 * • All outbound links use rel="noopener noreferrer" + UTM params (future)
 *
 * TO ADD A CATEGORY: add to CATEGORIES array below.
 * TO CHANGE LINKS:   edit HOMEFIX constant in src/lib/constants.ts.
 */

import Seo from '@/components/seo/Seo'
import { CtaStrip } from '@/components/ui'
import { SITE, CONTACT, HOMEFIX } from '@/lib/constants'

// ─── CATEGORY DATA ────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: 'kitchens',
    icon: '🍳',
    title: 'Modular Kitchens',
    subtitle: 'L-shaped, U-shaped, island and parallel layouts. Factory finished.',
    from: '₹85,000',
    badge: 'Most Popular',
    href: HOMEFIX.kitchens,
  },
  {
    id: 'wardrobes',
    icon: '🚪',
    title: 'Wardrobes & Lofts',
    subtitle: 'Sliding, hinged and walk-in wardrobes with loft storage.',
    from: '₹45,000',
    badge: null,
    href: HOMEFIX.wardrobes,
  },
  {
    id: 'tv-units',
    icon: '📺',
    title: 'TV Units & Consoles',
    subtitle: 'Wall-mounted panels, media walls, floating consoles.',
    from: '₹18,000',
    badge: null,
    href: HOMEFIX.tvUnits,
  },
  {
    id: 'design-lab',
    icon: '📐',
    title: '3D Design Lab',
    subtitle: 'Plan your kitchen or wardrobe in 2D/3D before ordering.',
    from: 'Free',
    badge: 'Free Tool',
    href: HOMEFIX.designLab,
  },
]

const TRUST_CHIPS = [
  'Flat-pack delivery',
  '3–5 day dispatch',
  'FREE installation in Chennai',
  'Same brand as Aesthetic Homes',
  '4.9★ Google rated',
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function StorePage() {
  return (
    <>
      <Seo
        title="HomeFix Store — Modular Kitchens, Wardrobes & TV Units | Chennai"
        description="Browse HomeFix modular furniture: kitchens from ₹85k, wardrobes from ₹45k, TV units from ₹18k. Flat-pack delivery 3–5 days, FREE installation in Chennai. By Aesthetic Homes."
        canonical={`${SITE.url}/store`}
      />

      {/* ── 1. Hero ── */}
      <div
        className="sec sec--navy"
        style={{ borderBottom: '2px solid var(--c-gold)', paddingBottom: 'var(--sp-8)' }}
      >
        <div className="container">
          <div className="sec__eyebrow">Our Digital Platform</div>
          <h1
            style={{
              fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-4xl)',
              fontWeight: 'var(--fw-med)', color: 'var(--c-text-inv)',
              lineHeight: 'var(--lh-snug)', marginBottom: 'var(--sp-4)',
            }}
          >
            <em style={{ color: 'var(--c-gold)', fontStyle: 'italic' }}>HomeFix</em>{' '}
            Modular Furniture Store
          </h1>
          <p
            style={{
              fontSize: 'var(--fs-base)', color: 'var(--c-text-inv-dim)',
              maxWidth: '52ch', lineHeight: 'var(--lh-loose)', marginBottom: 'var(--sp-6)',
            }}
          >
            Aesthetic Homes' digital modular furniture platform. Browse, plan in 3D and order online —
            flat-pack delivery in 3–5 days with{' '}
            <strong style={{ color: 'var(--c-gold)' }}>FREE installation</strong> across Chennai.
          </p>
          <div style={{ display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <a
              href={HOMEFIX.store}
              className="btn btn--gold"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Browse full HomeFix modular furniture store"
            >
              Browse Full Store →
            </a>
            <a
              href={HOMEFIX.designLab}
              className="btn btn--outline-inv"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Try free 3D design lab on HomeFix"
            >
              Try 3D Design Lab
            </a>
          </div>
        </div>
      </div>

      {/* ── 2. Category cards ── */}
      <section className="sec" aria-labelledby="store-cats-heading">
        <div className="container">
          <h2
            id="store-cats-heading"
            style={{
              fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-3xl)',
              color: 'var(--c-navy)', marginBottom: 'var(--sp-8)',
            }}
          >
            Browse by <em style={{ color: 'var(--c-gold)', fontStyle: 'italic' }}>Category</em>
          </h2>

          <div className="grid-auto-2" style={{ gap: 'var(--sp-4)' }}>
            {CATEGORIES.map((cat, i) => (
              <a
                key={cat.id}
                href={cat.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`card reveal reveal-delay-${(i % 4) + 1}`}
                style={{
                  padding: 'var(--sp-8)', display: 'flex', flexDirection: 'column',
                  gap: 'var(--sp-4)', textDecoration: 'none', position: 'relative',
                }}
                aria-label={`Browse ${cat.title} on HomeFix — from ${cat.from}`}
              >
                {/* Badge */}
                {cat.badge && (
                  <span
                    className="badge badge--gold"
                    style={{ position: 'absolute', top: 'var(--sp-3)', right: 'var(--sp-3)' }}
                  >
                    {cat.badge}
                  </span>
                )}

                <div style={{ fontSize: '2.5rem' }} aria-hidden="true">{cat.icon}</div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--f-serif)', fontSize: 'var(--fs-xl)',
                      color: 'var(--c-navy)', marginBottom: 'var(--sp-2)',
                    }}
                  >
                    {cat.title}
                  </h3>
                  <p style={{ fontSize: 'var(--fs-base)', color: 'var(--c-text-2)', marginBottom: 'var(--sp-4)', lineHeight: 'var(--lh-relax)' }}>
                    {cat.subtitle}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--fw-semi)', color: 'var(--c-gold)' }}>
                      From {cat.from}
                    </span>
                    <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--c-text-muted)' }}>
                      Shop HomeFix →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. Trust strip ── */}
      <div
        style={{
          background: 'var(--c-bg-tint)',
          borderTop: 'var(--b-base)', borderBottom: 'var(--b-base)',
          padding: 'var(--sp-5) var(--sec-x)',
        }}
        role="complementary"
        aria-label="HomeFix trust signals"
      >
        <div className="container">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-3)', justifyContent: 'center' }}>
            {TRUST_CHIPS.map((chip) => (
              <span key={chip} className="badge badge--gold">{chip}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── 4. CTA strip — links back to full interiors ── */}
      <CtaStrip
        title="Need a Full Home Interior Too?"
        subtitle="Aesthetic Homes handles complete turnkey projects — same team, same quality."
        primaryLabel="WhatsApp for a Quote →"
        primaryHref={CONTACT.waLink1}
      />
    </>
  )
}
