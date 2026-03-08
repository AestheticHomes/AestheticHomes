/**
 * @file src/components/layout/Layout.tsx
 * @description Master layout wrapper rendered by App.tsx around every view.
 *
 * WHAT IT DOES
 * ────────────
 * • Renders the fixed <Header> at top
 * • Renders the fixed <BottomNav> at bottom (mobile/tablet)
 * • Wraps page content in <main class="page-shell"> which applies:
 *     - padding-top:    header height + safe-area-top   (clears header)
 *     - padding-bottom: bnav height + safe-area-bottom  (clears bottom nav)
 *     - padding-left/right: device side bezels
 * • Renders the scrolling <Footer> inside the page shell (after page content)
 * • Renders the floating <WhatsAppButton>
 * • Renders <InstallBanner> and <SWUpdateBanner> (PWA)
 * • Shows an offline indicator bar when navigator.onLine === false
 * • Triggers page-enter fade animation on view change
 * • Scrolls to top on every view change
 *
 * EVERY PAGE just needs to return its JSX —
 * it doesn't need to worry about header, footer, or safe areas.
 *
 * PROPS
 * ─────
 * currentView — passed down to Header and BottomNav for active states
 * onNav       — navigation function
 * children    — the active page component
 */

import { useEffect, useRef, useState } from 'react'
import Header        from './Header'
import BottomNav     from './BottomNav'
import Footer        from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { InstallBanner, SWUpdateBanner } from '@/components/pwa'
import { useOnlineStatus } from '@/lib/hooks'
import type { ViewName } from '@/types'

interface LayoutProps {
  currentView: ViewName
  onNav:       (v: ViewName) => void
  children:    React.ReactNode
}

export default function Layout({ currentView, onNav, children }: LayoutProps) {
  const isOnline   = useOnlineStatus()
  const [animKey, setAnimKey] = useState(0)
  const prevView   = useRef<ViewName>(currentView)
  const pageShellRef = useRef<HTMLElement>(null)

  /* Page transition + scroll-to-top on every view change */
  useEffect(() => {
    if (prevView.current !== currentView) {
      setAnimKey((k) => k + 1)
      prevView.current = currentView
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [currentView])

  /* Observe .reveal nodes so Server Components keep staggered animations */
  useEffect(() => {
    const root = pageShellRef.current
    if (!root) return

    const observed = new WeakSet<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    const observeNode = (node: Element) => {
      if (observed.has(node)) return
      observed.add(node)
      observer.observe(node)
    }

    const scan = (scanRoot: ParentNode) => {
      scanRoot.querySelectorAll('.reveal').forEach((node) => observeNode(node))
    }

    scan(root)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.classList.contains('reveal')) observeNode(node)
          scan(node)
        })
      })
    })

    mutationObserver.observe(root, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [animKey])

  return (
    <>
      {/* ── Fixed header (z-index: 300) ── */}
      <Header currentView={currentView} onNav={onNav} />

      {/* ── Offline indicator ── */}
      {!isOnline && (
        <div
          className="offline-badge visible"
          role="status"
          aria-live="polite"
          aria-label="You are currently offline"
        >
          ● Offline — showing cached content
        </div>
      )}

      {/* ── Service worker update banner ── */}
      <SWUpdateBanner />

      {/*
        ── Page shell ──
        padding-top    = header height + safe-area-top     (clears fixed header)
        padding-bottom = bnav height   + safe-area-bottom  (clears fixed bottom nav)
        padding-left/right = device side bezels
        min-height: 100dvh  (dynamic viewport height handles mobile browser chrome)
      */}
      <main
        id="main-content"
        className="page-shell"
        role="main"
        ref={pageShellRef}
      >
        {/* Page enter animation — new key on every view change */}
        <div key={animKey} className="page-enter">
          {children}
        </div>

        {/* Footer scrolls naturally inside page shell */}
        <Footer onNav={onNav} />
      </main>

      {/* ── Fixed bottom nav (z-index: 200, hidden ≥1024px) ── */}
      <BottomNav currentView={currentView} onNav={onNav} />

      {/* ── Floating WhatsApp button (z-index: 250) ── */}
      <WhatsAppButton />

      {/* ── PWA install banner (z-index: 201) ── */}
      <InstallBanner />
    </>
  )
}
