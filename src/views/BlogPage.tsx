/**
 * @file src/views/BlogPage.tsx
 * @description Blog / article listing page.
 *
 * PAGE SECTIONS (in render order)
 * ────────────────────────────────
 * 1. PageHero          — dark navy header
 * 2. Category tabs     — filter by post category (sticky bar)
 * 3. Blog card grid    — BlogCard components, 3-col on desktop
 * 4. CtaStrip          — gold CTA at bottom
 *
 * DATA
 * ────
 * Fetches published blog posts from Sanity CMS on mount via useSanity hook.
 * Uses QUERIES.publishedPosts GROQ query.
 * Displays Spinner while loading, EmptyState if no results.
 *
 * SEO
 * ───
 * • Title: "Interior Design Blog — Tips, Ideas & Project Stories | Chennai"
 * • Article JSON-LD: TODO — inject per-post when detail view opens
 *   (full post detail is a future enhancement — modal or nested route)
 *
 * TO ADD A CATEGORY: add to BLOG_CATS array below.
 * TO CHANGE DATA:    edit QUERIES.publishedPosts in src/lib/sanity.ts.
 */

import { useState } from 'react'
import Seo from '@/components/seo/Seo'
import BlogCard from '@/components/ui/BlogCard'
import { PageHero, CtaStrip, EmptyState, Spinner } from '@/components/ui'
import { useSanity } from '@/lib/hooks'
import { QUERIES } from '@/lib/sanity'
import { SITE, CONTACT } from '@/lib/constants'
import { useReveal } from '@/lib/hooks'
import type { BlogPost, BlogCategory } from '@/types'

// ─── FILTER TABS ─────────────────────────────────────────────────────────────
const BLOG_CATS: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all',          label: 'All' },
  { value: 'design-tips',  label: 'Design Tips' },
  { value: 'kitchen',      label: 'Kitchen' },
  { value: 'budgeting',    label: 'Budgeting' },
  { value: 'before-after', label: 'Before & After' },
  { value: 'homefix',      label: 'HomeFix' },
]

// ─── COMPONENT ───────────────────────────────────────────────────────────────
export default function BlogPage() {
  const { data: posts, loading } = useSanity<BlogPost[]>(QUERIES.publishedPosts)
  const [cat, setCat]            = useState<BlogCategory | 'all'>('all')
  const revealRef                = useReveal()

  const filtered = (posts ?? []).filter((p) => cat === 'all' || p.category === cat)

  return (
    <>
      <Seo
        title="Interior Design Blog — Tips, Ideas & Project Stories | Chennai"
        description={`Interior design tips, modular kitchen ideas, wardrobe guides and before-after project stories from Aesthetic Homes Chennai. ${SITE.projectCount}+ projects, ${SITE.rating}★ rated.`}
        canonical={`${SITE.url}/blog`}
      />

      <div ref={revealRef}>

        {/* ── 1. Hero ── */}
        <PageHero
          eyebrow="Blog & Articles"
          title={<>Interior Design <em>Ideas & Insights</em></>}
          subtitle="Tips, cost guides and real project stories from 10 years of Chennai interiors."
        />

        {/* ── 2. Category filter tabs (sticky below header on scroll) ── */}
        <div
          style={{
            background: 'var(--c-bg-card)',
            borderBottom: 'var(--b-base)',
            padding: 'var(--sp-4) var(--sec-x)',
            position: 'sticky',
            top: 'var(--page-top)',  // sticks just below the fixed header
            zIndex: 'var(--z-raised)',
          }}
        >
          <div className="container scroll-x">
            <div style={{ display: 'flex', gap: 'var(--sp-2)', minWidth: 'max-content' }}>
              {BLOG_CATS.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCat(c.value)}
                  aria-pressed={cat === c.value}
                  style={{
                    padding: '6px 16px',
                    fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semi)',
                    letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
                    background: cat === c.value ? 'var(--c-navy)' : 'transparent',
                    color:      cat === c.value ? 'var(--c-text-inv)' : 'var(--c-text-muted)',
                    border:     cat === c.value ? '1px solid var(--c-navy)' : 'var(--b-base)',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'var(--t-color)',
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── 3. Posts grid ── */}
        <section className="sec" aria-label="Blog posts">
          <div className="container">
            {loading && <Spinner />}

            {!loading && filtered.length === 0 && (
              <EmptyState
                icon="📝"
                title="No posts yet"
                message="Check back soon — new articles are published regularly."
              />
            )}

            {!loading && filtered.length > 0 && (
              <div className="grid-auto-3">
                {filtered.map((post, i) => (
                  <div key={post._id} className={`reveal reveal-delay-${(i % 4) + 1}`}>
                    <BlogCard post={post} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── 4. CTA strip ── */}
        <CtaStrip
          title="Want Expert Advice for Your Home?"
          subtitle="Free consultation · Free 3D design · No commitment"
          primaryLabel="WhatsApp Us →"
          primaryHref={CONTACT.waLink1}
        />

      </div>
    </>
  )
}
