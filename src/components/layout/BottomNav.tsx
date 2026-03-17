/**
 * @file src/components/layout/BottomNav.tsx
 * @description Fixed bottom navigation — mobile/tablet only (hidden ≥1024px).
 *
 * BEHAVIOUR
 * ─────────
 * • 5 tabs, evenly spaced across full width
 * • Active tab: navy text, gold icon, gold 2px indicator line at top
 * • Inactive: muted grey
 * • "Store" tab opens HomeFix in a new tab (external link)
 * • Height = 56px base + env(safe-area-inset-bottom) for iPhone home indicator
 * • Items sit above the home indicator via padding-bottom: var(--safe-bottom)
 * • Tap feedback: scale(0.91) on :active
 *
 * TO CHANGE NAV ITEMS: edit BOTTOM_NAV_ITEMS in src/lib/constants.ts
 */

import { BOTTOM_NAV_ITEMS } from '@/lib/constants'
import type { ViewName } from '@/types'

interface BottomNavProps {
  currentView: ViewName
  onNav:       (v: ViewName) => void
}

export default function BottomNav({ currentView, onNav }: BottomNavProps) {
  return (
    <nav
      className="bottom-nav"
      role="navigation"
      aria-label="App navigation"
    >
      <div className="bottom-nav__items">
        {BOTTOM_NAV_ITEMS.map((item) => {
          const isActive = currentView === item.id
          const route = item.id === 'green' ? '/green' : undefined
          const className = `bottom-nav__item${isActive ? ' active' : ''}${item.id === 'green' ? ' bottom-nav__item--green' : ''}`
          const content = item.id === 'green'
            ? (
              <span className="bottom-nav__tab-inner">
                <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
                <span className="bottom-nav__label">{item.label}</span>
              </span>
            )
            : (
              <>
                <span className="bottom-nav__icon" aria-hidden="true">{item.icon}</span>
                <span className="bottom-nav__label">{item.label}</span>
              </>
            )

          /* External link (e.g. HomeFix Store) */
          if (item.external && item.href) {
            return (
              <a
                key={item.id}
                href={item.href}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${item.ariaLabel} — opens in new tab`}
                data-route={route}
              >
                {content}
              </a>
            )
          }

          /* Internal SPA nav */
          return (
            <button
              key={item.id}
              className={className}
              onClick={() => onNav(item.id)}
              aria-label={item.ariaLabel}
              aria-current={isActive ? 'page' : undefined}
              data-route={route}
            >
              {content}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
