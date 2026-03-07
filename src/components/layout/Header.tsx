/**
 * @file src/components/layout/Header.tsx
 * @description Fixed top header — safe-area aware, mobile-first.
 *
 * BEHAVIOUR
 * ─────────
 * Mobile  (<1024px): Logo  |  Rating chip  |  "Quote" CTA
 * Desktop (≥1024px): Logo  |  Nav links   |  "Free Quote" CTA button
 *
 * Safe areas handled via CSS tokens:
 *   height  = --header-h + --safe-top   (grows for iPhone Dynamic Island)
 *   padding = max(16px, env(safe-area-inset-left/right))
 *
 * PROPS
 * ─────
 * currentView — highlights active nav link
 * onNav       — triggers SPA view change
 *
 * TO ADD A NAV LINK: edit HEADER_NAV_LINKS in src/lib/constants.ts
 */

import { SITE, CONTACT, HEADER_NAV_LINKS } from '@/lib/constants'
import type { ViewName } from '@/types'

interface HeaderProps {
  currentView: ViewName
  onNav:       (v: ViewName) => void
}

export default function Header({ currentView, onNav }: HeaderProps) {
  return (
    <header className="site-header" role="banner">
      <div className="site-header__inner">

        {/* ── Logo ── */}
        <button
          className="site-header__logo"
          onClick={() => onNav('home')}
          aria-label={`${SITE.name} — go to home page`}
        >
          Aesthetic<span>Homes</span>
        </button>

        {/* ── Desktop nav links ── */}
        <nav className="site-header__nav" aria-label="Main navigation">
          {HEADER_NAV_LINKS.map((link) => {
            if (link.external && link.href) {
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className="site-header__nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} — opens in new tab`}
                >
                  {link.label} ↗
                </a>
              )
            }
            return (
              <button
                key={link.id}
                className={`site-header__nav-link ${currentView === link.id ? 'active' : ''}`}
                onClick={() => onNav(link.id as ViewName)}
                aria-current={currentView === link.id ? 'page' : undefined}
              >
                {link.label}
              </button>
            )
          })}
        </nav>

        {/* ── Desktop CTA ── */}
        <a
          href={CONTACT.waLink1}
          className="btn btn--gold site-header__cta-desk"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Get a free interior design quote on WhatsApp"
        >
          Free Quote
        </a>

        {/* ── Mobile: rating + compact CTA ── */}
        <div style={{ display:'flex', alignItems:'center', gap:'var(--sp-2)' }}>
          <div
            className="site-header__rating"
            aria-label={`${SITE.rating} star Google rating`}
          >
            <span className="site-header__rating-star" aria-hidden="true">★</span>
            {SITE.rating}
          </div>
          <a
            href={CONTACT.waLink1}
            className="site-header__cta-mob"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Get free quote on WhatsApp"
          >
            Quote
          </a>
        </div>

      </div>
    </header>
  )
}
