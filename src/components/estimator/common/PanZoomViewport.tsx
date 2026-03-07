/**
 * PanZoomViewport
 * ─────────────────────────────────────────────────────
 * Pannable, zoomable container for 2D SVG CAD drawings.
 *
 * Attaches wheel + pointer listeners with { passive: false }
 * so preventDefault() is allowed (prevents page scroll during zoom).
 *
 * When fitKey changes, resets transform back to default (re-center).
 * The SVG's own preserveAspectRatio="xMidYMid meet" handles visual fitting.
 */

import { useCallback, useEffect, useRef, useState } from 'react'

type Transform = { x: number; y: number; z: number }

type Props = {
  sceneWidth:              number
  sceneHeight:             number
  fitKey?:                 string
  autoFitOnMount?:         boolean
  autoFitOnFitKeyChange?:  boolean
  children: (transform: Transform) => React.ReactNode
}

const DEFAULT_TRANSFORM: Transform = { x: 0, y: 0, z: 1 }

export default function PanZoomViewport({
  sceneWidth,
  sceneHeight,
  fitKey,
  autoFitOnMount        = true,
  autoFitOnFitKeyChange = true,
  children,
}: Props) {
  const containerRef              = useRef<HTMLDivElement | null>(null)
  const [transform, setTransform] = useState<Transform>(DEFAULT_TRANSFORM)
  const isPanning                 = useRef(false)
  const lastPos                   = useRef({ x: 0, y: 0 })
  const prevFitKey                = useRef<string | undefined>(undefined)

  // Reset to default transform (SVG's preserveAspectRatio handles fitting)
  const resetTransform = useCallback(() => {
    setTransform(DEFAULT_TRANSFORM)
  }, [])

  // Auto-fit on mount
  useEffect(() => {
    if (autoFitOnMount) resetTransform()
  }, [autoFitOnMount, resetTransform])

  // Auto-fit when fitKey changes
  useEffect(() => {
    if (autoFitOnFitKeyChange && fitKey !== prevFitKey.current) {
      prevFitKey.current = fitKey
      resetTransform()
    }
  }, [fitKey, autoFitOnFitKeyChange, resetTransform])

  // Zoom handler
  const wheelHandler = useCallback(
    (event: WheelEvent) => {
      event.preventDefault()
      const el = containerRef.current
      if (!el) return

      const rect    = el.getBoundingClientRect()
      const cursorX = ((event.clientX - rect.left) / el.clientWidth)  * sceneWidth
      const cursorY = ((event.clientY - rect.top)  / el.clientHeight) * sceneHeight
      const factor  = Math.exp(-event.deltaY * 0.001)

      setTransform((prev) => {
        const newZ = Math.min(Math.max(prev.z * factor, 0.2), 10)
        return {
          x: cursorX - ((cursorX - prev.x) * newZ) / prev.z,
          y: cursorY - ((cursorY - prev.y) * newZ) / prev.z,
          z: newZ,
        }
      })
    },
    [sceneWidth, sceneHeight]
  )

  // Pan handlers
  const pointerDown = useCallback((e: PointerEvent) => {
    isPanning.current = true
    lastPos.current   = { x: e.clientX, y: e.clientY }
  }, [])

  const pointerMove = useCallback(
    (e: PointerEvent) => {
      if (!isPanning.current) return
      const el = containerRef.current
      if (!el) return
      const dxPx = e.clientX - lastPos.current.x
      const dyPx = e.clientY - lastPos.current.y
      const dx   = (dxPx / el.clientWidth)  * sceneWidth
      const dy   = (dyPx / el.clientHeight) * sceneHeight
      lastPos.current = { x: e.clientX, y: e.clientY }
      setTransform((prev) => ({ ...prev, x: prev.x + dx, y: prev.y + dy }))
    },
    [sceneWidth, sceneHeight]
  )

  const pointerUp = useCallback(() => { isPanning.current = false }, [])

  // Attach listeners with passive:false
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('wheel',        wheelHandler, { passive: false })
    el.addEventListener('pointerdown',  pointerDown,  { passive: false })
    el.addEventListener('pointermove',  pointerMove,  { passive: false })
    el.addEventListener('pointerup',    pointerUp,    { passive: false })
    el.addEventListener('pointerleave', pointerUp,    { passive: false })
    return () => {
      el.removeEventListener('wheel',        wheelHandler)
      el.removeEventListener('pointerdown',  pointerDown)
      el.removeEventListener('pointermove',  pointerMove)
      el.removeEventListener('pointerup',    pointerUp)
      el.removeEventListener('pointerleave', pointerUp)
    }
  }, [wheelHandler, pointerDown, pointerMove, pointerUp])

  return (
    <div
      ref={containerRef}
      style={{
        position:    'relative',
        width:       '100%',
        height:      '100%',
        overflow:    'hidden',
        touchAction: 'none',
        cursor:      isPanning.current ? 'grabbing' : 'grab',
      }}
    >
      {children(transform)}
    </div>
  )
}
