'use client'

import Link from 'next/link'
import { useState } from 'react'
import BlogCard from '@/components/ui/BlogCard'
import { PageHero, CtaStrip, EmptyState } from '@/components/ui'
import { CONTACT } from '@/lib/constants'
import type { BlogPost, BlogCategory } from '@/types'

const BLOG_CATS: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'design-tips', label: 'Design Tips' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'budgeting', label: 'Budgeting' },
  { value: 'before-after', label: 'Before & After' },
  { value: 'homefix', label: 'HomeFix' },
]

interface BlogPageProps {
  posts: BlogPost[]
}

export default function BlogPage({ posts }: BlogPageProps) {
  const [cat, setCat] = useState<BlogCategory | 'all'>('all')

  const filtered = (posts ?? []).filter((post) => cat === 'all' || post.category === cat)

  return (
    <div>
      <PageHero
        eyebrow="Blog & Articles"
        title={<>Interior Design <em>Ideas & Insights</em></>}
        subtitle="Tips, cost guides and real project stories from 10 years of Chennai interiors."
      />

      <div
        style={{
          background: 'var(--c-bg-card)',
          borderBottom: 'var(--b-base)',
          padding: 'var(--sp-4) var(--sec-x)',
          position: 'sticky',
          top: 'var(--page-top)',
          zIndex: 'var(--z-raised)',
        }}
      >
        <div className="container scroll-x">
          <div style={{ display: 'flex', gap: 'var(--sp-2)', minWidth: 'max-content' }}>
            {BLOG_CATS.map((category) => (
              <button
                key={category.value}
                onClick={() => setCat(category.value)}
                aria-pressed={cat === category.value}
                style={{
                  padding: '6px 16px',
                  fontSize: 'var(--fs-xs)',
                  fontWeight: 'var(--fw-semi)',
                  letterSpacing: 'var(--ls-wide)',
                  textTransform: 'uppercase',
                  background: cat === category.value ? 'var(--c-navy)' : 'transparent',
                  color: cat === category.value ? 'var(--c-text-inv)' : 'var(--c-text-muted)',
                  border: cat === category.value ? '1px solid var(--c-navy)' : 'var(--b-base)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'var(--t-color)',
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <section className="sec" aria-label="Blog posts">
        <div className="container">
          {filtered.length === 0 && (
            <EmptyState icon="📝" title="No posts yet" message="Check back soon - new articles are published regularly." />
          )}

          {filtered.length > 0 && (
            <div className="grid-auto-3">
              {filtered.map((post, i) => (
                <div key={post._id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                  <BlogCard post={post} />
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 'var(--sp-8)', display: 'flex', gap: 'var(--sp-3)', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn btn--outline-navy btn--sm">
              Explore Interior Services
            </Link>
            <Link href="/projects" className="btn btn--outline-navy btn--sm">
              See Project Portfolio
            </Link>
          </div>
        </div>
      </section>

      <CtaStrip
        title="Want Expert Advice for Your Home?"
        subtitle="Free consultation · Free 3D design · No commitment"
        primaryLabel="WhatsApp Us →"
        primaryHref={CONTACT.waLink1}
      />
    </div>
  )
}
