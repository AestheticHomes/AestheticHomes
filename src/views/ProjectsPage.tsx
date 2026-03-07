/**
 * @file src/views/ProjectsPage.tsx
 * @description Portfolio / projects listing page.
 *
 * PAGE SECTIONS
 * ─────────────
 * 1. Dark hero header
 * 2. Sticky filter bar (category + status)
 * 3. Masonry-style project grid  ← first item always spans full width
 * 4. Gold CTA strip
 *
 * DATA
 * ────
 * Fetches all projects from Sanity on mount via useSanity hook.
 * While loading: SkeletonGrid (6 placeholder cards).
 * On error: inline error message.
 * No results after filter: EmptyState with "Clear filters" button.
 *
 * FILTERING
 * ─────────
 * Category filter: derived from fetched projects (no hardcoded list)
 * Status filter:   All | Completed | Ongoing
 * Both filters combine with AND logic.
 *
 * SEO
 * ───
 * • Title: "Interior Design Projects Chennai — 53 Completed Projects"
 * • Projects structured as AggregateRating signals via Organization schema
 */

import { useState } from 'react'
import Seo from '@/components/seo/Seo'
import ProjectCard from '@/components/ui/ProjectCard'
import { PageHero, CtaStrip, EmptyState, SkeletonGrid } from '@/components/ui'
import { useSanity } from '@/lib/hooks'
import { QUERIES } from '@/lib/sanity'
import { SITE, CONTACT, CATEGORY_META } from '@/lib/constants'
import { useReveal } from '@/lib/hooks'
import type { Project } from '@/types'

export default function ProjectsPage() {
  const { data: projects, loading, error } = useSanity<Project[]>(QUERIES.allProjects)
  const [catFilter,    setCatFilter]    = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const revealRef = useReveal()

  /* Derive category list from actual data */
  const categories = ['all', ...Array.from(new Set((projects ?? []).map((p) => p.category).filter(Boolean)))]

  /* Apply filters */
  const filtered = (projects ?? []).filter((p) => {
    const catOk    = catFilter    === 'all' || p.category === catFilter
    const statusOk = statusFilter === 'all' || p.status   === statusFilter
    return catOk && statusOk
  })

  const clearFilters = () => { setCatFilter('all'); setStatusFilter('all') }

  return (
    <>
      <Seo
        title={`Interior Design Projects Chennai — ${SITE.projectCount} Completed Projects`}
        description={`Browse ${SITE.projectCount}+ completed interior design projects by Aesthetic Homes in Chennai. Modular kitchens, wardrobes, full home interiors across Adyar, OMR, Anna Nagar, Velachery and more. ${SITE.rating}★ rated.`}
        canonical={`${SITE.url}/projects`}
      />

      <div ref={revealRef}>

        {/* ── Hero ── */}
        <PageHero
          eyebrow="Portfolio"
          title={<>{SITE.projectCount}+ <em>Projects</em> Across Chennai</>}
          subtitle="Modular kitchens · Wardrobes · Full home interiors · 10 years of work"
        />

        {/* ── Sticky Filter Bar ── */}
        <div
          style={{
            background: 'var(--c-bg-card)',
            borderBottom: 'var(--b-base)',
            padding: 'var(--sp-4) var(--sec-x)',
            position: 'sticky',
            top: 'var(--page-top)',
            zIndex: 'var(--z-sticky)',
          }}
        >
          <div className="container scroll-x">
            <div style={{ display:'flex', gap:'var(--sp-2)', minWidth:'max-content', alignItems:'center' }}>

              {/* Category filters */}
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat]
                return (
                  <button
                    key={cat}
                    onClick={() => setCatFilter(cat)}
                    aria-pressed={catFilter === cat}
                    style={{
                      padding: '6px 14px',
                      fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semi)',
                      letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
                      background: catFilter === cat ? 'var(--c-navy)' : 'transparent',
                      color:      catFilter === cat ? 'var(--c-text-inv)' : 'var(--c-text-muted)',
                      border:     catFilter === cat ? '1px solid var(--c-navy)' : 'var(--b-base)',
                      cursor: 'pointer', whiteSpace: 'nowrap', transition: 'var(--t-color)',
                    }}
                  >
                    {cat === 'all' ? '🏠 All' : `${meta?.emoji ?? ''} ${meta?.label ?? cat}`}
                  </button>
                )
              })}

              {/* Separator */}
              <div style={{ width:'1px', height:'20px', background:'var(--c-bg-border)', flexShrink:0, margin:'0 var(--sp-2)' }} aria-hidden="true" />

              {/* Status filters */}
              {(['all', 'completed', 'ongoing'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  aria-pressed={statusFilter === st}
                  style={{
                    padding: '6px 14px',
                    fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-semi)',
                    letterSpacing: 'var(--ls-wide)', textTransform: 'uppercase',
                    background: statusFilter === st ? 'var(--c-gold)' : 'transparent',
                    color:      statusFilter === st ? 'var(--c-navy)' : 'var(--c-text-muted)',
                    border:     statusFilter === st ? '1px solid var(--c-gold)' : 'var(--b-base)',
                    cursor: 'pointer', whiteSpace: 'nowrap', transition: 'var(--t-color)',
                  }}
                >
                  {st === 'all' ? 'All Status' : st.charAt(0).toUpperCase() + st.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Project Grid ── */}
        <div className="sec">
          <div className="container">
            {error && (
              <p style={{ color:'var(--c-red)', padding:'var(--sp-8)', textAlign:'center' }}>
                Failed to load projects. Please refresh.
              </p>
            )}

            {loading && <SkeletonGrid count={6} />}

            {!loading && !error && filtered.length === 0 && (
              <EmptyState
                icon="📂"
                title="No projects match these filters"
                message="Try a different category or clear the filters."
                action={{ label:'Clear Filters', onClick: clearFilters }}
              />
            )}

            {!loading && !error && filtered.length > 0 && (
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--sp-2)' }}>
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project._id}
                    project={project}
                    wide={i === 0}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── CTA ── */}
        <CtaStrip
          title="Want a Similar Project?"
          subtitle="Free site visit · Free 3D design · Transparent quote"
          primaryLabel="WhatsApp for a Free Quote →"
          primaryHref={CONTACT.waLink1}
          secondaryLabel={`Call ${CONTACT.phone1Display}`}
          secondaryTel={CONTACT.phone1}
        />

      </div>
    </>
  )
}
