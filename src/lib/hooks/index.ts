/**
 * @file src/lib/hooks/index.ts
 * @description All custom React hooks used across the app.
 *
 * HOOKS
 * ─────
 * useReveal      — triggers .visible class on elements scrolling into view
 * usePwaInstall  — manages beforeinstallprompt event for install banner
 * useOnlineStatus — tracks navigator.onLine
 * useSwUpdate    — listens for service worker updates
 * useSanity      — generic async data fetcher with loading/error state
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { sanityFetch, SANITY_ENABLED } from '@/lib/sanity'

// ─── useReveal ────────────────────────────────────────────────────────────────
/**
 * Attaches an IntersectionObserver to a container ref.
 * Any child with className="reveal" will have "visible" added when it
 * enters the viewport. Also watches DOM mutations so async-rendered nodes
 * are observed after mount. Combine with .reveal CSS class in tokens.css.
 *
 * @example
 * const ref = useReveal()
 * return <div ref={ref}><p className="reveal">Fades in</p></div>
 */
export function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = ref.current
    if (!container) return
    const observed = new WeakSet<Element>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)   // fire once only
          }
        })
      },
      { threshold }
    )

    const observeReveal = (el: Element) => {
      if (observed.has(el)) return
      observed.add(el)
      observer.observe(el)
    }

    const scanForReveal = (root: ParentNode) => {
      root.querySelectorAll('.reveal').forEach((el) => observeReveal(el))
    }

    if (container.classList.contains('reveal')) observeReveal(container)
    scanForReveal(container)

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return
          if (node.classList.contains('reveal')) observeReveal(node)
          scanForReveal(node)
        })
      })
    })

    mutationObserver.observe(container, { childList: true, subtree: true })

    return () => {
      mutationObserver.disconnect()
      observer.disconnect()
    }
  }, [threshold])

  return ref
}

// ─── usePwaInstall ────────────────────────────────────────────────────────────
/**
 * Captures the browser's beforeinstallprompt event.
 * Returns a trigger function and whether the prompt is available.
 *
 * @example
 * const { canInstall, triggerInstall } = usePwaInstall()
 * if (canInstall) <button onClick={triggerInstall}>Install App</button>
 */
export function usePwaInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const [canInstall, setCanInstall] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setCanInstall(true)
    }
    const installed = () => { setInstalled(true); setCanInstall(false) }

    window.addEventListener('beforeinstallprompt', handler)
    window.addEventListener('appinstalled', installed)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      window.removeEventListener('appinstalled', installed)
    }
  }, [])

  const triggerInstall = useCallback(async (): Promise<'accepted' | 'dismissed'> => {
    if (!deferredPrompt) return 'dismissed'
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    setDeferredPrompt(null)
    setCanInstall(false)
    return outcome
  }, [deferredPrompt])

  return { canInstall, triggerInstall, installed }
}

// ─── useOnlineStatus ─────────────────────────────────────────────────────────
/**
 * Tracks whether the browser has an internet connection.
 *
 * @example
 * const isOnline = useOnlineStatus()
 * if (!isOnline) return <OfflineBanner />
 */
export function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine
  )

  useEffect(() => {
    const goOnline  = () => setIsOnline(true)
    const goOffline = () => setIsOnline(false)
    window.addEventListener('online',  goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online',  goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return isOnline
}

// ─── useSwUpdate ─────────────────────────────────────────────────────────────
/**
 * Listens for service worker updates.
 * Returns updateAvailable flag and apply() function to activate new SW.
 *
 * @example
 * const { updateAvailable, applyUpdate } = useSwUpdate()
 * if (updateAvailable) <button onClick={applyUpdate}>Update App</button>
 */
export function useSwUpdate() {
  const [updateAvailable, setUpdateAvailable] = useState(false)
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.ready.then((reg) => {
      setRegistration(reg)
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing
        newWorker?.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            setUpdateAvailable(true)
          }
        })
      })
    })
  }, [])

  const applyUpdate = useCallback(() => {
    registration?.waiting?.postMessage({ type: 'SKIP_WAITING' })
    window.location.reload()
  }, [registration])

  return { updateAvailable, applyUpdate }
}

// ─── useSanity ────────────────────────────────────────────────────────────────
/**
 * Generic Sanity data fetcher with loading / error state.
 * Returns { data, loading, error, refetch }.
 *
 * Skips fetching entirely when SANITY_ENABLED is false —
 * pages will render their EmptyState without console errors.
 *
 * @example
 * const { data, loading, error } = useSanity<Project[]>(QUERIES.allProjects)
 */
export function useSanity<T>(query: string, params?: Record<string, unknown>) {
  const [data,    setData]    = useState<T | null>(null)
  const [loading, setLoading] = useState(SANITY_ENABLED)   // false immediately if disabled
  const [error,   setError]   = useState<string | null>(null)

  const run = useCallback(() => {
    if (!SANITY_ENABLED) return

    setLoading(true)
    setError(null)

    sanityFetch<T>({ query, params })
      .then((result) => {
        setData(result)
      })
      .catch((err) => {
        console.error('[useSanity] fetch failed:', err?.message ?? err)
        setError(err?.message ?? 'Failed to load data')
      })
      .finally(() => setLoading(false))
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { run() }, [run])

  return { data, loading, error, refetch: run }
}
