/**
 * @file src/App.tsx
 * @description Root application component — SPA router, splash screen, SW registration.
 *
 * RESPONSIBILITIES
 * ────────────────
 * 1. Manages the active view state (SPA routing — no react-router needed)
 * 2. Renders <Layout> wrapping the active page component
 * 3. Shows a splash screen on first load (fades out after 1.8s)
 * 4. Handles path-based URL routing (/projects, /services, etc.)
 * 5. Handles browser back/forward via popstate
 * 6. Registers the service worker
 *
 * ROUTING
 * ───────
 * Path-based SPA routing. Each view maps to a clean URL path:
 *   /              → <HomePage />
 *   /projects      → <ProjectsPage />
 *   /services      → <ServicesPage />
 *   /about         → <AboutPage />
 *   /blog          → <BlogPage />
 *   /contact       → <ContactPage />
 *   /estimator     → <EstimatorPage />
 *   /store         → <StorePage />
 *
 * SPLASH SCREEN
 * ─────────────
 * Fades out after 1.8s. Only shown on initial load.
 * The loading bar animation is purely CSS (no JS timer needed for the fill).
 *
 * TO ADD A PAGE:
 * 1. Create src/views/MyPage.tsx
 * 2. Add to ViewName union in src/types/index.ts
 * 3. Add to VALID_VIEWS set below
 * 4. Add to views map below
 * 5. Add nav item in src/lib/constants.ts
 */

import { useState, useEffect, lazy, Suspense } from 'react'
import Layout from '@/components/layout/Layout'
import { Spinner } from '@/components/ui'
import type { ViewName } from '@/types'

// ─── LAZY-LOADED VIEWS ────────────────────────────────────────────────────────
// Code-split: each page only loads when navigated to.
// HomePage is eager — it's the entry point and above-the-fold critical.
import HomePage from '@/views/HomePage'
const ProjectsPage  = lazy(() => import('@/views/ProjectsPage'))
const ServicesPage  = lazy(() => import('@/views/ServicesPage'))
const AboutPage     = lazy(() => import('@/views/AboutPage'))
const BlogPage      = lazy(() => import('@/views/BlogPage'))
const ContactPage   = lazy(() => import('@/views/ContactPage'))
const EstimatorPage = lazy(() => import('@/views/EstimatorPage'))
const StorePage     = lazy(() => import('@/views/StorePage'))

// ─── VALID VIEWS ──────────────────────────────────────────────────────────────
const VALID_VIEWS = new Set<ViewName>([
  'home', 'projects', 'services', 'about',
  'blog', 'contact', 'estimator', 'store',
])

const VIEW_TO_PATH: Record<ViewName, string> = {
  home: '/',
  projects: '/projects',
  services: '/services',
  about: '/about',
  blog: '/blog',
  contact: '/contact',
  estimator: '/estimator',
  store: '/store',
}

/** Parse pathname to ViewName, fallback to 'home' */
const pathToView = (pathname: string): ViewName => {
  const segment = pathname.replace(/^\/+/, '').split('/')[0] as ViewName
  if (!segment) return 'home'
  return VALID_VIEWS.has(segment) ? segment : 'home'
}

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function App() {
  const [view,        setView]        = useState<ViewName>(() => pathToView(window.location.pathname))
  const [splashDone,  setSplashDone]  = useState(false)
  const [splashHide,  setSplashHide]  = useState(false)

  // ── Splash animation ──
  useEffect(() => {
    const t1 = setTimeout(() => setSplashHide(true),  1800)  // start fade-out
    const t2 = setTimeout(() => setSplashDone(true),  2300)  // remove from DOM
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  // ── Service worker registration ──
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    if (import.meta.env.DEV) {
      // Prevent stale cached shells from taking over localhost during development.
      navigator.serviceWorker
        .getRegistrations()
        .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
        .catch((err) => console.warn('[SW:DEV]', err))
      return
    }

    navigator.serviceWorker
      .register('/sw.js')
      .catch((err) => console.warn('[SW]', err))
  }, [])

  // ── Browser back/forward (popstate) ──
  useEffect(() => {
    const handler = () => {
      setView(pathToView(window.location.pathname))
    }
    window.addEventListener('popstate', handler)
    return () => window.removeEventListener('popstate', handler)
  }, [])

  /** Navigate to a view — updates state + URL path + browser history */
  const navigate = (v: ViewName) => {
    setView(v)
    window.history.pushState({ view: v }, '', VIEW_TO_PATH[v])
  }

  // ── Page components map ──
  const PageComponent: Record<ViewName, React.ReactNode> = {
    home:      <HomePage onNav={navigate} />,
    projects:  <ProjectsPage />,
    services:  <ServicesPage onNav={navigate} />,
    about:     <AboutPage onNav={navigate} />,
    blog:      <BlogPage />,
    contact:   <ContactPage />,
    estimator: <EstimatorPage />,
    store:     <StorePage />,
  }

  return (
    <>
      {/* ── Splash screen — shown until splashDone ── */}
      {!splashDone && (
        <div
          className={`splash ${splashHide ? 'hide' : ''}`}
          aria-hidden="true"
          aria-label="Loading Aesthetic Homes"
        >
          <div className="splash__logo">Aesthetic<span>Homes</span></div>
          <div className="splash__tag">10 Years · 53 Projects · Chennai</div>
          <div className="splash__bar">
            <div className="splash__fill" />
          </div>
        </div>
      )}

      {/*
        ── Layout wraps every view ──
        Handles: Header, BottomNav, Footer, WhatsApp button,
                 PWA banners, offline indicator, page transitions.
        Every page just renders its content — no need to include chrome.
      */}
      <Layout currentView={view} onNav={navigate}>
        <Suspense fallback={<div style={{ padding: 'var(--sp-16)' }}><Spinner /></div>}>
          {PageComponent[view]}
        </Suspense>
      </Layout>
    </>
  )
}
