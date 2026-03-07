/**
 * @file src/lib/sanity.ts
 * @description Sanity CMS client, image URL builder, and all GROQ queries.
 *
 * SETUP
 * ─────
 * 1. Create project at sanity.io
 * 2. Replace 'YOUR_PROJECT_ID' below with your actual project ID
 * 3. Add your domain to CORS origins in sanity.io/manage → API
 *
 * USAGE
 * ─────
 * import { sanityClient, QUERIES, imgUrl } from '@/lib/sanity'
 * const projects = await sanityClient.fetch<Project[]>(QUERIES.allProjects)
 * const src = imgUrl(project.coverImage, 800, 600)
 */

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

// ─── CLIENT ───────────────────────────────────────────────────────────────────
/**
 * Reads from .env.local in development, from host env vars in production.
 *
 * Required in .env.local:
 *   VITE_SANITY_PROJECT_ID=your_project_id
 *
 * Optional:
 *   VITE_SANITY_DATASET=production   (defaults to "production")
 *
 * Get your project ID from: sanity.io/manage → your project
 */
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string
const dataset   = (import.meta.env.VITE_SANITY_DATASET as string) ?? 'production'
export const SANITY_ENABLED = Boolean(projectId && projectId !== 'YOUR_PROJECT_ID')

// Guard: fail clearly in dev if env var is missing
if (!projectId || projectId === 'YOUR_PROJECT_ID') {
  console.error(
    '[Sanity] Missing VITE_SANITY_PROJECT_ID.\n' +
    'Create .env.local in your project root with:\n' +
    '  VITE_SANITY_PROJECT_ID=your_project_id\n' +
    'Get your ID from: https://sanity.io/manage'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn:     true,   // true = fast CDN reads (slight delay after publish)
                      // false = always fresh (use for preview/draft modes)
})

// ─── IMAGE URL BUILDER ────────────────────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient)

/**
 * Returns an optimised Sanity CDN image URL.
 * @param src   - Sanity image asset reference
 * @param w     - target width in pixels
 * @param h     - target height in pixels
 * @param mode  - 'crop' (default) | 'contain' | 'fill'
 */
export const imgUrl = (
  src:  SanityImage,
  w = 800,
  h = 600,
  mode: 'crop' | 'contain' | 'fill' = 'crop'
): string => {
  const fitMode = mode === 'contain' ? 'clip' : mode
  return builder.image(src).width(w).height(h).fit(fitMode).auto('format').url()
}

/** Returns a raw builder for custom transformations */
export const imgBuilder = (src: SanityImage) => builder.image(src)

// ─── SAFE FETCH ───────────────────────────────────────────────────────────────
/**
 * Guarded wrapper around sanityClient.fetch().
 * Returns null immediately if SANITY_ENABLED is false.
 */
export async function sanityFetch<T>(
  query:   string,
  params?: Record<string, unknown>
): Promise<T | null> {
  if (!SANITY_ENABLED) return null
  return sanityClient.fetch<T>(query, params ?? {})
}

// ─── GROQ QUERIES ─────────────────────────────────────────────────────────────
/**
 * Centralised GROQ query store.
 * Functions accept parameters for dynamic queries.
 * All string queries can be called with sanityClient.fetch().
 */
export const QUERIES = {

  /** Homepage: top 6 featured projects */
  featuredProjects: `
    *[_type=="project" && featured==true]
    | order(completionDate desc)[0...6] {
      _id, title, slug, status, category, bhkType,
      location, completionDate, budget, shortDescription,
      coverImage, tags, completionPercent
    }
  `,

  /** Projects page: all projects, featured first */
  allProjects: `
    *[_type=="project"]
    | order(featured desc, completionDate desc) {
      _id, title, slug, status, featured, category, bhkType,
      location, completionDate, budget, shortDescription,
      coverImage, tags, completionPercent
    }
  `,

  /** Single project detail by slug */
  projectBySlug: (slug: string) => `
    *[_type=="project" && slug.current=="${slug}"][0] {
      _id, title, slug, status, featured, category, bhkType,
      location, startDate, completionDate, duration, budget,
      shortDescription, description, coverImage, gallery,
      videoUrl, completionPercent, expectedCompletion,
      progressUpdates, tags, clientName, testimonial,
      testimonialRating, homefixLink, seoTitle, seoDescription
    }
  `,

  /** Homepage testimonials: only flagged for homepage */
  testimonials: `
    *[_type=="testimonial" && showOnHomepage==true]
    | order(date desc)[0...8] {
      _id, clientName, location, rating, review,
      source, date, clientPhoto,
      "projectTitle": projectRef->title
    }
  `,

  /** All testimonials for reviews page */
  allTestimonials: `
    *[_type=="testimonial"]
    | order(date desc) {
      _id, clientName, location, rating, review,
      source, date, clientPhoto,
      "projectTitle": projectRef->title
    }
  `,

  /** Blog listing: published only */
  publishedPosts: `
    *[_type=="blogPost" && status=="published"]
    | order(publishedAt desc) {
      _id, title, slug, coverImage, excerpt,
      category, publishedAt, tags, readingTime
    }
  `,

  /** Single blog post by slug */
  postBySlug: (slug: string) => `
    *[_type=="blogPost" && slug.current=="${slug}"][0] {
      _id, title, slug, coverImage, body, excerpt,
      category, publishedAt, tags, readingTime,
      relatedProjects[]->{title, slug},
      seoTitle, seoDescription, ogImage
    }
  `,

  /** About page: team members ordered by display order */
  teamMembers: `
    *[_type=="teamMember"]
    | order(order asc) {
      _id, name, role, photo, bio,
      experience, specialization, isFounder, socialLinks
    }
  `,

  /** Global site settings singleton */
  siteSettings: `*[_type=="siteSettings"][0]`,

} as const
