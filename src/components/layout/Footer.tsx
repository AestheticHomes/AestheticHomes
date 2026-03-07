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
  { label:'About Us',      view:'about' },
  { label:'Projects',      view:'projects' },
  { label:'Blog',          view:'blog' },
  { label:'Contact',       view:'contact' },
  { label:'Cost Estimator',view:'estimator' },
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
              `GSTIN: ${SITE.gstin}`,
              `Est. ${SITE.founded}`,
              `${SITE.rating}★ Google`,
              `${SITE.projectCount}+ Projects`,
            ].map((chip) => (
              <span key={chip} className="site-footer__trust-chip" role="listitem">{chip}</span>
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
            <a href={`tel:${CONTACT.phone1}`} aria-label={`Call ${CONTACT.phone1Display}`}>{CONTACT.phone1Display}</a>
            <a href={`tel:${CONTACT.phone2}`} aria-label={`Call ${CONTACT.phone2Display}`}>{CONTACT.phone2Display}</a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email us">{CONTACT.email}</a>
            <address style={{ fontStyle:'normal', fontSize:'var(--fs-xs)', color:'var(--c-text-inv-dim)', lineHeight:'var(--lh-loose)' }}>
              {CONTACT.address.full}
            </address>
            <a href={CONTACT.googleMapsUrl} target="_blank" rel="noopener noreferrer" aria-label="Open in Google Maps" style={{ color:'var(--c-gold)', fontSize:'var(--fs-xs)' }}>
              Open in Google Maps →
            </a>
          </div>
        </div>
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
