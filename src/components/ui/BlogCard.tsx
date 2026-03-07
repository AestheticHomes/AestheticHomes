/**
 * @file src/components/ui/BlogCard.tsx
 * @description Reusable blog post preview card.
 *
 * USAGE
 * ─────
 * <BlogCard post={post} onClick={() => openPost(post.slug.current)} />
 */

import { imgUrl } from '@/lib/sanity'
import { Badge } from './index'
import type { BlogPost } from '@/types'

const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'design-tips':  'Design Tips',
  'kitchen':      'Kitchen Ideas',
  'wardrobe':     'Wardrobe & Storage',
  'full-home':    'Full Home',
  'budgeting':    'Budgeting',
  'renovation':   'Renovation',
  'trends':       'Trends',
  'before-after': 'Before & After',
  'homefix':      'HomeFix',
}

interface Props {
  post:     BlogPost
  onClick?: () => void
}

export default function BlogCard({ post, onClick }: Props) {
  const catLabel = post.category ? (BLOG_CATEGORY_LABELS[post.category] ?? post.category) : ''
  const date     = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })
    : ''

  return (
    <article
      className="card card--clickable reveal"
      style={{ display:'flex', flexDirection:'column', cursor: onClick ? 'pointer' : 'default', overflow:'hidden' }}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      aria-label={post.title}
    >
      {/* Cover image */}
      <div style={{ aspectRatio:'16/9', overflow:'hidden', flexShrink:0 }}>
        {post.coverImage ? (
          <img
            src={imgUrl(post.coverImage, 600, 338)}
            alt={`${post.title} — Aesthetic Homes blog`}
            loading="lazy"
            decoding="async"
            style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform var(--dur-slow) var(--ease)' }}
          />
        ) : (
          <div style={{ width:'100%', height:'100%', background:'var(--c-bg-tint)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem' }}>📝</div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding:'var(--sp-5)', display:'flex', flexDirection:'column', gap:'var(--sp-2)', flex:1 }}>
        {/* Meta */}
        <div style={{ display:'flex', alignItems:'center', gap:'var(--sp-2)', flexWrap:'wrap' }}>
          {catLabel && <Badge variant="gold">{catLabel}</Badge>}
          {post.readingTime && (
            <span style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)' }}>{post.readingTime} min read</span>
          )}
          {date && (
            <span style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)', marginLeft:'auto' }}>{date}</span>
          )}
        </div>

        {/* Title */}
        <h2 style={{ fontFamily:'var(--f-serif)', fontSize:'var(--fs-lg)', fontWeight:'var(--fw-med)', color:'var(--c-navy)', lineHeight:'var(--lh-snug)' }}>
          {post.title}
        </h2>

        {/* Excerpt */}
        {post.excerpt && (
          <p style={{ fontSize:'var(--fs-base)', color:'var(--c-text-2)', lineHeight:'var(--lh-relax)', flex:1 }}>
            {post.excerpt}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display:'flex', gap:'var(--sp-2)', flexWrap:'wrap', marginTop:'auto', paddingTop:'var(--sp-2)' }}>
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} style={{ fontSize:'var(--fs-xs)', color:'var(--c-text-muted)', background:'var(--c-bg)', border:'var(--b-base)', padding:'2px 6px' }}>
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </article>
  )
}
