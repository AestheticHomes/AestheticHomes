'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import type { ViewName } from '@/types'

const VIEW_TO_PATH: Record<ViewName, string> = {
  home: '/',
  projects: '/projects',
  services: '/services',
  green: '/green',
  about: '/about',
  blog: '/blog',
  contact: '/contact',
  estimator: '/estimator',
  store: '/store',
  partners: '/partners',
}

const VALID_VIEWS = new Set<ViewName>(Object.keys(VIEW_TO_PATH) as ViewName[])

const pathToView = (pathname: string): ViewName => {
  const segment = pathname.replace(/^\/+/, '').split('/')[0] as ViewName
  if (!segment) return 'home'
  return VALID_VIEWS.has(segment) ? segment : 'home'
}

interface AppShellProps {
  children: React.ReactNode
}

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const router = useRouter()

  const [splashDone, setSplashDone] = useState(false)
  const [splashHide, setSplashHide] = useState(false)

  const currentView = useMemo(() => pathToView(pathname || '/'), [pathname])

  useEffect(() => {
    const t1 = window.setTimeout(() => setSplashHide(true), 1800)
    const t2 = window.setTimeout(() => setSplashDone(true), 2300)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return

    const runSwRegistration = async () => {
      try {
        if (process.env.NODE_ENV === 'development') {
          const registrations = await navigator.serviceWorker.getRegistrations()
          await Promise.all(registrations.map((registration) => registration.unregister()))
          return
        }

        await navigator.serviceWorker.register('/sw.js')
      } catch (err) {
        console.warn('[SW]', err)
      }
    }

    void runSwRegistration()
  }, [])

  const navigate = useCallback(
    (view: ViewName) => {
      const targetPath = VIEW_TO_PATH[view]
      if (targetPath) router.push(targetPath)
    },
    [router]
  )

  return (
    <>
      {!splashDone && (
        <div
          className={`splash ${splashHide ? 'hide' : ''}`}
          aria-hidden="true"
          aria-label="Loading Aesthetic Homes"
        >
          <div className="splash__logo">
            Aesthetic<span>Homes</span>
          </div>
          <div className="splash__tag">10 Years · 53 Projects · Chennai</div>
          <div className="splash__bar">
            <div className="splash__fill" />
          </div>
        </div>
      )}

      <Layout currentView={currentView} onNav={navigate}>
        {children}
      </Layout>
    </>
  )
}
