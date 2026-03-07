/**
 * @file src/components/pwa/InstallBanner.tsx
 * @description PWA install prompt banner.
 *
 * BEHAVIOUR
 * ─────────
 * 1. Captures beforeinstallprompt event (Chrome/Edge/Android only)
 * 2. Waits 5 seconds after page load before showing
 * 3. Slides up from above the bottom nav
 * 4. Install → triggers native browser install dialog
 * 5. Dismiss → hides and sets sessionStorage flag (won't show again this session)
 *
 * POSITIONING
 * ───────────
 * Mobile:  bottom = var(--bnav-total) → slides up from above bottom nav
 * Desktop: bottom-right floating card (max-width 420px)
 *
 * NOTE: Not shown on Safari iOS — Apple doesn't support beforeinstallprompt.
 * For iOS, users install via Share → "Add to Home Screen".
 */

import { useState, useEffect } from 'react'
import { usePwaInstall } from '@/lib/hooks'
import { SITE } from '@/lib/constants'

export function InstallBanner() {
  const { canInstall, triggerInstall } = usePwaInstall()
  const [visible, setVisible] = useState(false)

  /* Show after 5s if prompt is available and not dismissed this session */
  useEffect(() => {
    if (!canInstall) return
    if (sessionStorage.getItem('ah-install-dismissed')) return
    const t = setTimeout(() => setVisible(true), 5000)
    return () => clearTimeout(t)
  }, [canInstall])

  const handleInstall = async () => {
    const outcome = await triggerInstall()
    if (outcome === 'accepted') setVisible(false)
  }

  const handleDismiss = () => {
    setVisible(false)
    sessionStorage.setItem('ah-install-dismissed', '1')
  }

  if (!visible) return null

  return (
    <div
      className={`install-banner ${visible ? 'visible' : ''}`}
      role="complementary"
      aria-label="Install app banner"
      aria-live="polite"
    >
      <div style={{ display:'flex', alignItems:'center', gap:'var(--sp-3)' }}>
        <div className="install-banner__icon" aria-hidden="true">🏠</div>
        <div>
          <div className="install-banner__title">Add to Home Screen</div>
          <div className="install-banner__sub">Install {SITE.name} app — works offline</div>
        </div>
      </div>

      <div className="install-banner__actions">
        <button
          className="btn btn--gold btn--sm"
          onClick={handleInstall}
          aria-label="Install the app"
        >
          Install
        </button>
        <button
          className="install-banner__dismiss"
          onClick={handleDismiss}
          aria-label="Dismiss install prompt"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

/**
 * @file src/components/pwa/SWUpdateBanner.tsx
 * @description Shows a banner when a new service worker version is available.
 *
 * Appears at the top of the page (below the header) when the app has
 * an update ready. User taps "Update" to reload with the new version.
 */
export function SWUpdateBanner() {
  const [visible, setVisible] = useState(false)
  const [reg, setReg] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return
    navigator.serviceWorker.ready.then((r) => {
      setReg(r)
      r.addEventListener('updatefound', () => {
        r.installing?.addEventListener('statechange', function () {
          if (this.state === 'installed' && navigator.serviceWorker.controller) {
            setVisible(true)
          }
        })
      })
    })
  }, [])

  const handleUpdate = () => {
    reg?.waiting?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }

  if (!visible) return null

  return (
    <div
      style={{
        position:'fixed',
        top:'var(--page-top)',
        left:0, right:0,
        zIndex:'var(--z-toast)',
        background:'var(--c-navy)',
        borderBottom:'var(--b-gold-dim)',
        padding:'var(--sp-3) var(--sp-4)',
        display:'flex', alignItems:'center', justifyContent:'space-between', gap:'var(--sp-3)',
      }}
      role="status"
      aria-live="polite"
    >
      <span style={{ fontSize:'var(--fs-base)', color:'var(--c-text-inv)' }}>
        ✦ New version available
      </span>
      <button className="btn btn--gold btn--sm" onClick={handleUpdate}>
        Update now
      </button>
    </div>
  )
}
