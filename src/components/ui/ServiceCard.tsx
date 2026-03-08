/**
 * @file src/components/ui/ServiceCard.tsx
 * @description Reusable service card component.
 *
 * USAGE
 * ─────
 * // Compact version for homepage grid
 * <ServiceCard service={svc} compact onClick={() => onNav('services')} />
 *
 * // Full version for services page
 * <ServiceCard service={svc} />
 */

import Link from 'next/link'
import { LinkButton } from './index'
import { CONTACT } from '@/lib/constants'

interface Service {
  id:           string
  icon:         string
  title:        string
  desc:         string
  startingFrom: string | null
  homefixLink:  string | null
}

interface Props {
  service:  Service
  compact?: boolean                  // homepage grid — smaller, no HomeFix link
}

export default function ServiceCard({ service: svc, compact }: Props) {
  if (compact) {
    return (
      <Link
        href="/services"
        className="card card--clickable reveal"
        style={{ padding:'var(--sp-6)', textAlign:'left', width:'100%' }}
        aria-label={`Learn about ${svc.title}`}
      >
        <div style={{ fontSize:'1.6rem', marginBottom:'var(--sp-4)' }} aria-hidden="true">{svc.icon}</div>
        <h3 style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', color:'var(--c-navy)', marginBottom:'var(--sp-2)' }}>
          {svc.title}
        </h3>
        {svc.startingFrom && (
          <div style={{ fontSize:'var(--fs-xs)', fontWeight:'var(--fw-semi)', color:'var(--c-gold)', marginBottom:'var(--sp-2)' }}>
            From {svc.startingFrom}
          </div>
        )}
        <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-relax)' }}>{svc.desc}</p>
      </Link>
    )
  }

  return (
    <div className="card reveal" style={{ padding:'var(--sp-6)', display:'flex', gap:'var(--sp-5)', alignItems:'flex-start' }}>
      <div style={{ fontSize:'2rem', flexShrink:0, marginTop:'var(--sp-1)' }} aria-hidden="true">{svc.icon}</div>

      <div style={{ flex:1 }}>
        <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'var(--sp-3)', flexWrap:'wrap', marginBottom:'var(--sp-2)' }}>
          <h2 style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-xl)', color:'var(--c-navy)' }}>{svc.title}</h2>
          {svc.startingFrom && (
            <span style={{ fontSize:'var(--fs-sm)', fontWeight:'var(--fw-semi)', color:'var(--c-gold)', background:'var(--c-gold-tint)', border:'var(--b-gold-dim)', padding:'3px 8px', flexShrink:0 }}>
              From {svc.startingFrom}
            </span>
          )}
        </div>

        <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-relax)', marginBottom:'var(--sp-4)' }}>
          {svc.desc}
        </p>

        <div style={{ display:'flex', gap:'var(--sp-3)', flexWrap:'wrap' }}>
          <LinkButton
            variant="gold"
            size="sm"
            href={CONTACT.waLink1}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Enquire about ${svc.title}`}
          >
            Enquire →
          </LinkButton>

          {svc.homefixLink && (
            <LinkButton
              variant="outline-gold"
              size="sm"
              href={svc.homefixLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Shop ${svc.title} on HomeFix`}
            >
              Shop HomeFix →
            </LinkButton>
          )}
        </div>
      </div>
    </div>
  )
}
