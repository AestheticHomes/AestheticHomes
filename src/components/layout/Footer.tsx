/**
 * @file src/components/layout/Footer.tsx
 * @description Full desktop footer with brand info, links, trust signals.
 *
 * STRUCTURE
 * ─────────
 * ┌─ HomeFix promo strip ──────────────────────────────────┐
 * ├─ 4-column grid ────────────────────────────────────────┤
 * │   Brand + trust chips + socials                        │
 * │   Services quick links                                 │
 * │   Company quick links                                  │
 * │   Contact details                                      │
 * ├─ Bottom bar ───────────────────────────────────────────┤
 * │   Copyright · GSTIN      |  Privacy · Terms            │
 * └────────────────────────────────────────────────────────┘
 *
 * SAFE AREAS
 * ──────────
 * padding-bottom: max(var(--sp-8), calc(var(--sp-6) + var(--safe-bottom)))
 *   → on iPhone: footer bottom content stays above the home indicator
 * padding-left/right: max(var(--sec-x), var(--safe-left/right))
 *   → on iPad landscape with bezels: content never clips
 *
 * The footer sits OUTSIDE the bottom-nav stacking context (not fixed),
 * so it scrolls naturally. The page-shell's padding-bottom ensures it
 * is never hidden behind the fixed bottom nav.
 */

import Link from 'next/link'
import { SITE, CONTACT, SOCIAL, HOMEFIX } from '@/lib/constants'
import { LinkButton } from '@/components/ui'
import type { ViewName } from '@/types'

interface FooterProps {
  /** Called when internal footer links are clicked */
  onNav: (v: ViewName) => void
}

/** Quick-link config — label maps to ViewName for onNav */
const SERVICE_LINKS = ['Modular Kitchen','Wardrobes','Full Home Interiors','TV Units','3D Visualization','Renovation']
const COMPANY_LINKS: { label: string; view: ViewName }[] = [
  { label:'Home',          view:'home' },
  { label:'Services',      view:'services' },
  { label:'About Us',      view:'about' },
  { label:'Projects',      view:'projects' },
  { label:'Partner With Us', view:'partners' },
  { label:'Blog',          view:'blog' },
  { label:'Contact',       view:'contact' },
  { label:'Cost Estimator',view:'estimator' },
  { label:'HomeFix Store', view:'store' },
]

export default function Footer({ onNav }: FooterProps) {
  return (
    <footer className="site-footer" role="contentinfo" aria-label="Site footer">

      {/* ── HomeFix Promo Strip ── */}
      <div className="site-footer__hf-strip">
        <p className="site-footer__hf-text">
          <strong>Shop HomeFix</strong> — Modular kitchens ₹85k · Wardrobes ₹45k · TV Units ₹18k.
          Flat-pack delivery, 3–5 days, <strong>FREE installation in Chennai.</strong>
        </p>
        <LinkButton
          variant="gold"
          size="sm"
          href={HOMEFIX.store}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Browse HomeFix modular furniture store"
        >
          Browse HomeFix Store →
        </LinkButton>
      </div>

      {/* ── 4-column Grid ── */}
      <div className="site-footer__grid">

        {/* Col 1 — Brand */}
        <div>
          <div className="site-footer__brand-name">{SITE.name}</div>
          <p className="site-footer__brand-desc">
            Chennai's trusted budget interior designer since {SITE.founded}.
            {' '}{SITE.projectCount} projects completed, {SITE.rating}★ Google rated.
            {' '}GSTIN registered. Serving Chennai and 100km radius.
          </p>

          {/* Trust chips */}
          <div className="site-footer__trust" role="list" aria-label="Trust signals">
            {[
              { label: `GSTIN: ${SITE.gstin}` },
              { label: `Est. ${SITE.founded}` },
              { label: `${SITE.rating}★ Google`, href: CONTACT.googleReviewUrl },
              { label: `${SITE.projectCount}+ Projects` },
            ].map((chip) => (
              chip.href ? (
                <a
                  key={chip.label}
                  href={chip.href}
                  className="site-footer__trust-chip"
                  role="listitem"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {chip.label}
                </a>
              ) : (
                <span key={chip.label} className="site-footer__trust-chip" role="listitem">{chip.label}</span>
              )
            ))}
          </div>

          {/* Social links */}
          <nav className="site-footer__socials" aria-label="Social media links">
            <a href={SOCIAL.instagram}  className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Follow Aesthetic Homes on Instagram">Instagram</a>
            <a href={SOCIAL.youtube}    className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Watch Aesthetic Homes on YouTube">YouTube</a>
            <a href={CONTACT.waLink1}   className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">WhatsApp</a>
            <a href={HOMEFIX.url}       className="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Visit HomeFix store">HomeFix</a>
          </nav>
        </div>

        {/* Col 2 — Services */}
        <div>
          <div className="site-footer__col-title">Services</div>
          <div className="site-footer__col-links">
            {SERVICE_LINKS.map((s) => (
              <button key={s} className="site-footer__col-btn" onClick={() => onNav('services')}>
                {s}
              </button>
            ))}
            <Link href="/green">Green Solutions</Link>
          </div>
        </div>

        {/* Col 3 — Company */}
        <div>
          <div className="site-footer__col-title">Company</div>
          <div className="site-footer__col-links">
            {COMPANY_LINKS.map((l) => (
              <button key={l.view} className="site-footer__col-btn" onClick={() => onNav(l.view)}>
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Col 4 — Contact */}
        <div>
          <div className="site-footer__col-title">Contact</div>
          <div className="site-footer__col-links">
            <address style={{ fontStyle:'normal', fontSize:'var(--fs-xs)', color:'var(--c-text-inv-dim)', lineHeight:'var(--lh-loose)' }}>
              <strong style={{ display:'block', color:'var(--c-text-inv)', fontSize:'var(--fs-sm)', marginBottom:'var(--sp-1)' }}>
                {SITE.name}
              </strong>
              <span>10, Gokul Brindavan Flats, United India Colony,</span>
              <br />
              <span>Kodambakkam, Chennai – 600024, Tamil Nadu</span>
              <br />
              <a
                href={`tel:${CONTACT.phone1}`}
                aria-label={`Call ${CONTACT.phone1Display}`}
                style={{ color:'inherit', textDecoration:'none' }}
              >
                {CONTACT.phone1Display}
              </a>
              <br />
              <a
                href={`mailto:${CONTACT.email}`}
                aria-label="Email us"
                style={{ color:'inherit', textDecoration:'none' }}
              >
                {CONTACT.email}
              </a>
            </address>
            <a href={CONTACT.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open in Google Maps" style={{ color:'var(--c-gold)', fontSize:'var(--fs-xs)' }}>
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>

      {/* ── Geo-Entity & Local SEO: Service Areas ── */}
      <div style={{
        borderTop: 'var(--b-base)',
        paddingTop: 'var(--sp-6)',
        marginTop: 'var(--sp-6)',
        color: 'var(--c-text-muted)'
      }}>
        <div style={{ fontSize: 'var(--fs-xs)', textTransform: 'uppercase', letterSpacing: 'var(--ls-wide)', marginBottom: 'var(--sp-3)', color: 'var(--c-text-inv-dim)' }}>
          Major Service Areas in Chennai
        </div>
        <p style={{ fontSize: 'var(--fs-xs)', lineHeight: 'var(--lh-relax)', margin: 0 }}>
          Interior Designers in Anna Nagar · Modular Kitchens in Velachery · Home Renovation in Besant Nagar · Turnkey Interiors in OMR · Wardrobe Designers in Adyar · Living Room Interiors in T Nagar · False Ceilings in Mylapore · Interior Decorators in Porur.
        </p>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="site-footer__bottom">
        <p className="site-footer__copy">
          © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          {' '}GSTIN: {SITE.gstin} · Chennai, Tamil Nadu, India.
        </p>
        <nav className="site-footer__legal" aria-label="Legal links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
          <a href="/accessibility">Accessibility</a>
        </nav>
      </div>

    </footer>
  )
}
