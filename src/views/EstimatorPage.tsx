/**
 * @file src/views/EstimatorPage.tsx
 * @description Interactive interior budget estimator.
 *
 * Step 1 — Kitchen: choose shape, adjust wall lengths, pick finish. Live 2D CAD plan.
 * Step 2 — Wardrobe: set width, loft height, finish. Live 2D elevation.
 * Step 3 — Summary: cost breakdown with bar + pie charts + WhatsApp CTA.
 */

import Seo            from '@/components/seo/Seo'
import { PageHero }   from '@/components/ui'
import KitchenRender  from '@/components/estimator/KitchenRender'
import WardrobeRender from '@/components/estimator/WardrobeRender'
import SummaryPanel   from '@/components/estimator/SummaryPanel'
import useEstimator, { type EstimatorStep } from '@/components/estimator/store/estimatorStore'
import { SITE } from '@/lib/constants'
import { useCallback, useEffect } from 'react'

const STAGE_LABEL: Record<EstimatorStep, string> = {
  kitchen:  'STEP 1 · KITCHEN',
  wardrobe: 'STEP 2 · WARDROBE',
  summary:  'STEP 3 · SUMMARY',
}
const STAGE_DESC: Record<EstimatorStep, string> = {
  kitchen:  'Define the kitchen layout, finishes, and wall runs.',
  wardrobe: 'Size your wardrobes and loft extensions.',
  summary:  'Review the combined estimate — export or share.',
}

const stepBtnBase: React.CSSProperties = {
  padding: '6px 18px', borderRadius: 999, fontSize: 13, fontWeight: 600,
  cursor: 'pointer', transition: 'all 0.2s',
}

export default function EstimatorPage() {
  const {
    step, includeKitchen, includeWardrobe,
    hasKitchen, hasWardrobe,
    setStep, setIncludeKitchen, setIncludeWardrobe,
  } = useEstimator()

  const noneSelected = !hasKitchen && !hasWardrobe

  const goTo = useCallback(
    (target: EstimatorStep) => {
      if (target === 'summary' && noneSelected)        return
      if (target === 'kitchen'  && !includeKitchen)   return
      if (target === 'wardrobe' && !includeWardrobe)  return
      setStep(target)
    },
    [includeKitchen, includeWardrobe, noneSelected, setStep]
  )

  useEffect(() => {
    if (step === 'kitchen'  && !includeKitchen)  goTo(includeWardrobe ? 'wardrobe' : 'summary')
    if (step === 'wardrobe' && !includeWardrobe) goTo(includeKitchen  ? 'kitchen'  : 'summary')
  }, [includeKitchen, includeWardrobe, step, goTo])

  return (
    <>
      <Seo
        title="Interior Design Cost Estimator Chennai — Kitchen & Wardrobe Budget Calculator"
        description={`Estimate interior design costs in Chennai with our interactive calculator. Modular kitchens, wardrobes — live 2D plan + instant cost breakdown. Aesthetic Homes, ${SITE.projectCount} projects, ${SITE.rating}★.`}
        canonical={`${SITE.url}/#estimator`}
      />

      <PageHero
        eyebrow={STAGE_LABEL[step]}
        title={step === 'summary' ? <>Interior <em>Budget Summary</em></> : <>Interior <em>Budget Estimator</em></>}
        subtitle={STAGE_DESC[step]}
      />

      <section className="sec" aria-label="Interactive budget estimator">
        <div className="container" style={{ maxWidth: 900 }}>

          {/* Step tabs + scope toggles */}
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 28 }}>
            {(['kitchen', 'wardrobe', 'summary'] as EstimatorStep[]).map((s) => {
              const disabled = (s === 'kitchen' && !includeKitchen) || (s === 'wardrobe' && !includeWardrobe)
              const active   = step === s
              return (
                <button key={s} onClick={() => goTo(s)} disabled={disabled}
                  style={{
                    ...stepBtnBase,
                    background: active   ? 'var(--c-navy)'           : 'var(--c-bg-card)',
                    color:      active   ? 'var(--c-text-inv)'       : 'var(--c-text)',
                    border:     active   ? '1px solid var(--c-navy)' : 'var(--b-base)',
                    opacity:    disabled ? 0.45                       : 1,
                    cursor:     disabled ? 'not-allowed'              : 'pointer',
                  }}>
                  {s === 'kitchen' ? '🍳 Kitchen' : s === 'wardrobe' ? '🚪 Wardrobe' : '📊 Summary'}
                </button>
              )
            })}

            <div style={{
              display: 'flex', alignItems: 'center', gap: 12, fontSize: 13,
              padding: '6px 16px', borderRadius: 999, border: 'var(--b-base)',
              background: 'var(--c-bg-tint)',
            }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={hasKitchen} onChange={(e) => setIncludeKitchen(e.target.checked)}
                  style={{ accentColor: 'var(--c-accent-gold)' }} />
                <span>Kitchen</span>
              </label>
              <span style={{ color: 'var(--c-text-2)' }}>|</span>
              <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer' }}>
                <input type="checkbox" checked={hasWardrobe} onChange={(e) => setIncludeWardrobe(e.target.checked)}
                  style={{ accentColor: 'var(--c-accent-gold)' }} />
                <span>Wardrobe</span>
              </label>
              {noneSelected && (
                <span style={{ fontSize: 11, color: '#ef4444', marginLeft: 4 }}>Select at least one</span>
              )}
            </div>
          </div>

          {/* Main content */}
          {step === 'summary' ? (
            <SummaryPanel />
          ) : (
            <div style={{ background: 'var(--c-bg-card)', border: 'var(--b-base)', borderRadius: 24, overflow: 'hidden' }}>
              {step === 'kitchen'  && <KitchenRender />}
              {step === 'wardrobe' && <WardrobeRender />}
            </div>
          )}

          {/* Nav buttons */}
          {step !== 'summary' && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 20 }}>
              {step === 'wardrobe' && (
                <button onClick={() => goTo('kitchen')} disabled={!includeKitchen}
                  style={{ ...stepBtnBase, background: 'var(--c-bg-card)', border: 'var(--b-gold)', color: 'var(--c-accent-gold)', opacity: !includeKitchen ? 0.45 : 1 }}>
                  ← Kitchen
                </button>
              )}
              <button onClick={() => step === 'kitchen' ? goTo(includeWardrobe ? 'wardrobe' : 'summary') : goTo('summary')}
                style={{ ...stepBtnBase, background: 'var(--c-accent-gold)', border: 'none', color: '#fff' }}>
                {step === 'kitchen'
                  ? (includeWardrobe ? 'Next · Wardrobe →' : 'Next · Summary →')
                  : 'Generate Summary →'}
              </button>
            </div>
          )}

          {step === 'summary' && (
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 20 }}>
              <button onClick={() => setStep(includeWardrobe ? 'wardrobe' : includeKitchen ? 'kitchen' : 'summary')}
                style={{ ...stepBtnBase, background: 'var(--c-bg-card)', border: 'var(--b-gold)', color: 'var(--c-accent-gold)' }}>
                ← Back
              </button>
            </div>
          )}

        </div>
      </section>
    </>
  )
}
