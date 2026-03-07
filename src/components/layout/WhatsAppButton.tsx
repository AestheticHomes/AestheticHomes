/**
 * @file src/components/layout/WhatsAppButton.tsx
 * @description Floating WhatsApp CTA button — always visible above bottom nav.
 *
 * BEHAVIOUR
 * ─────────
 * 1. Mounts with a "Get Free Quote" label that fades in after 2.5s, fades out at 7s
 * 2. Tap/click → shows a two-number menu (both WhatsApp numbers)
 * 3. Tap a number → opens WhatsApp deep-link in new tab, closes menu
 * 4. Tap elsewhere → closes menu (outside click handler)
 *
 * POSITIONING
 * ───────────
 * Mobile:  bottom = var(--bnav-total) + 16px  → floats above the fixed bottom nav
 * Desktop: bottom = 32px                       → no bottom nav, sits from screen edge
 * Both:    right  = max(16px, safe-area-inset-right)
 *
 * WHY TWO NUMBERS?
 * ────────────────
 * Aesthetic Homes has two WhatsApp numbers. Showing both increases answer rate.
 */

import { useState, useEffect, useRef } from 'react'
import { CONTACT } from '@/lib/constants'

export default function WhatsAppButton() {
  const [showLabel,  setShowLabel]  = useState(false)
  const [showMenu,   setShowMenu]   = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  /* Show label 2.5s after mount, auto-hide at 7s */
  useEffect(() => {
    const t1 = setTimeout(() => setShowLabel(true),  2500)
    const t2 = setTimeout(() => setShowLabel(false), 7000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  /* Close menu on outside click */
  useEffect(() => {
    if (!showMenu) return
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [showMenu])

  return (
    <div
      className="wa-float"
      ref={containerRef}
      role="complementary"
      aria-label="WhatsApp contact options"
    >

      {/* ── WhatsApp menu ── */}
      {showMenu && (
        <div className="wa-float__menu" role="menu" aria-label="WhatsApp contact">
          {[
            { href: CONTACT.waLink1, display: CONTACT.phone1Display },
          ].map((num) => (
            <a
              key={num.href}
              href={num.href}
              className="wa-float__label"
              target="_blank"
              rel="noopener noreferrer"
              role="menuitem"
              aria-label={`Chat on WhatsApp: ${num.display}`}
              onClick={() => setShowMenu(false)}
            >
              💬 {num.display}
            </a>
          ))}
        </div>
      )}

      {/* ── Auto-show label (hide when menu open) ── */}
      {showLabel && !showMenu && (
        <div className="wa-float__label" aria-hidden="true">
          Get Free Quote
        </div>
      )}

      {/* ── Main button ── */}
      <button
        className="wa-float__btn"
        onClick={() => setShowMenu((m) => !m)}
        aria-label="Open WhatsApp contact menu"
        aria-expanded={showMenu}
        aria-haspopup="menu"
      >
        <svg
          width="26" height="26"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </button>

    </div>
  )
}
