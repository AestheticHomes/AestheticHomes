/**
 * @file src/components/ui/TestimonialCard.tsx
 * @description Reusable testimonial / review card.
 *
 * USAGE
 * ─────
 * <TestimonialCard testimonial={t} />
 */

import { StarRating } from './index'
import type { Testimonial } from '@/types'

interface Props {
  testimonial: Testimonial
}

export default function TestimonialCard({ testimonial: t }: Props) {
  return (
    <div className="card reveal" style={{ padding:'var(--sp-6)', display:'flex', flexDirection:'column', gap:'var(--sp-4)' }}>
      {/* Stars */}
      <StarRating rating={t.rating} />

      {/* Review text */}
      <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-loose)', fontStyle:'italic', flex:1 }}>
        "{t.review}"
      </p>

      {/* Client info */}
      <div style={{ display:'flex', alignItems:'center', gap:'var(--sp-3)', paddingTop:'var(--sp-3)', borderTop:'var(--b-base)' }}>
        <div style={{ width:36, height:36, borderRadius:'var(--r-full)', background:'var(--c-gold-tint)', border:'var(--b-gold-dim)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--f-serif)', fontWeight:'var(--fw-med)', color:'var(--c-gold)', fontSize:'var(--fs-base)', flexShrink:0 }}>
          {t.clientName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight:'var(--fw-semi)', color:'var(--c-navy)', fontSize:'var(--fs-base)' }}>
            {t.clientName}
          </div>
          <div style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)' }}>
            {[t.location, t.source].filter(Boolean).join(' · ')}
            {t.projectTitle && ` · ${t.projectTitle}`}
          </div>
        </div>
      </div>
    </div>
  )
}
