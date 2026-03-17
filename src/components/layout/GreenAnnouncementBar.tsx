'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function GreenAnnouncementBar() {
  const [barVisible, setBarVisible] = useState(true)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sessionStorage.getItem('greenBarDismissed')) setBarVisible(false)
  }, [])

  useEffect(() => {
    const root = document.documentElement

    if (!barVisible || !barRef.current) {
      root.style.removeProperty('--green-announce-h')
      return
    }

    const syncOffset = () => {
      root.style.setProperty('--green-announce-h', `${barRef.current?.offsetHeight ?? 0}px`)
    }

    syncOffset()

    const resizeObserver = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(syncOffset)
      : null

    resizeObserver?.observe(barRef.current)
    window.addEventListener('resize', syncOffset)

    return () => {
      resizeObserver?.disconnect()
      window.removeEventListener('resize', syncOffset)
      root.style.removeProperty('--green-announce-h')
    }
  }, [barVisible])

  const dismiss = () => {
    sessionStorage.setItem('greenBarDismissed', '1')
    setBarVisible(false)
  }

  if (!barVisible) return null

  return (
    <div ref={barRef} className="green-announce-bar">
      <span className="green-announce-bar__icon" aria-hidden="true">◈</span>
      <p className="green-announce-bar__text">
        Aesthetic Homes is committed to{' '}
        <strong>sustainable interiors</strong> — UPVC boards, aluminium
        systems &amp; low-VOC materials for a greener Chennai.
      </p>
      <Link href="/green" className="green-announce-bar__cta">
        Explore Green →
      </Link>
      <button
        className="green-announce-bar__close"
        onClick={dismiss}
        aria-label="Dismiss green bar"
      >
        ✕
      </button>
    </div>
  )
}
