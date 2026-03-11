/**
 * @file src/components/ui/ProjectCard.tsx
 * @description Reusable project card for grids and featured sections.
 *
 * Two variants:
 *  - default: standard card for grid listings
 *  - wide:    full-width hero card (first item in grid)
 *
 * USAGE
 * ─────
 * <ProjectCard project={p} wide={i === 0} onClick={() => setDetail(p.slug.current)} />
 */

import Image from 'next/image'
import { imgUrl } from '@/lib/sanity'
import { CATEGORY_META, STATUS_META } from '@/lib/constants'
import { Badge } from './index'
import type { Project } from '@/types'

interface ProjectCardProps {
  project:  Project
  wide?:    boolean            // spans full grid width
  onClick?: () => void
}

export default function ProjectCard({ project, wide = false, onClick }: ProjectCardProps) {
  const cat    = CATEGORY_META[project.category] ?? { emoji: '🏠', label: project.category }
  const status = STATUS_META[project.status]     ?? STATUS_META.completed

  return (
    <article
      className="card card--img card--clickable reveal"
      style={{
        gridColumn: wide ? '1 / -1' : 'auto',
        aspectRatio: wide ? '16 / 7' : '4 / 5',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={`${project.title} — ${cat.label} project in ${project.location}`}
    >
      {/* Cover image */}
      {project.coverImage ? (
        <Image
          src={imgUrl(project.coverImage, wide ? 1200 : 600, wide ? 525 : 600)}
          alt={`${project.title} in ${project.location}, Chennai by Aesthetic Homes`}
          fill
          sizes={wide ? '(max-width: 1024px) 100vw, 1200px' : '(max-width: 1024px) 100vw, 600px'}
          style={{ objectFit: 'cover', transition: 'transform var(--dur-slow) var(--ease)' }}
        />
      ) : (
        /* Placeholder when no cover image yet */
        <div style={{
          width:'100%', height:'100%', background:'var(--c-bg-tint)',
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:'3rem',
        }}>
          {cat.emoji}
        </div>
      )}

      {/* Featured badge */}
      {project.featured && (
        <div style={{ position:'absolute', top:'var(--sp-3)', left:'var(--sp-3)' }}>
          <Badge variant="gold">⭐ Featured</Badge>
        </div>
      )}

      {/* Info overlay — gradient from bottom */}
      <div style={{
        position:'absolute', inset:0,
        background:'linear-gradient(to top, rgba(15,25,35,0.88) 0%, rgba(15,25,35,0.20) 50%, transparent 75%)',
        display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'var(--sp-4)',
      }}>
        {/* Status + progress */}
        <div style={{ display:'flex', gap:'var(--sp-2)', marginBottom:'var(--sp-2)', flexWrap:'wrap' }}>
          <Badge variant={
            project.status === 'completed' ? 'green' :
            project.status === 'ongoing'   ? 'amber' : 'blue'
          }>
            {status.label}
          </Badge>
          {project.status === 'ongoing' && project.completionPercent != null && (
            <Badge variant="amber">{project.completionPercent}% done</Badge>
          )}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily:'var(--f-serif)',
          fontSize: wide ? 'var(--fs-2xl)' : 'var(--fs-lg)',
          fontWeight:'var(--fw-med)', color:'var(--c-text-inv)',
          marginBottom:'var(--sp-1)', lineHeight:'var(--lh-snug)',
        }}>
          {project.title}
        </h2>

        {/* Meta row */}
        <div style={{ display:'flex', gap:'var(--sp-3)', fontSize:'var(--fs-xs)', color:'rgba(244,239,232,0.55)', flexWrap:'wrap' }}>
          <span>📍 {project.location}</span>
          {project.bhkType && project.bhkType !== 'NA' && <span>🏢 {project.bhkType}</span>}
          {project.budget && <span>💰 {project.budget}</span>}
        </div>
      </div>
    </article>
  )
}
