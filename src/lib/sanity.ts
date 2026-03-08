import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImage } from '@/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? process.env.SANITY_PROJECT_ID ?? ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? process.env.SANITY_DATASET ?? 'production'
const safeProjectId = projectId || 'demo'

export const SANITY_ENABLED = Boolean(projectId)

export const sanityClient = createClient({
  projectId: safeProjectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: true,
  perspective: 'published',
})

const builder = imageUrlBuilder(sanityClient)

export const imgUrl = (
  src: SanityImage,
  w = 800,
  h = 600,
  mode: 'crop' | 'contain' | 'fill' = 'crop'
): string => {
  const fitMode = mode === 'contain' ? 'clip' : mode
  return builder.image(src).width(w).height(h).fit(fitMode).auto('format').url()
}

export const imgBuilder = (src: SanityImage) => builder.image(src)

type SanityFetchArgs = {
  query: string
  params?: Record<string, unknown>
  revalidate?: number | false
}

export async function sanityFetch<T>({
  query,
  params = {},
  revalidate = 3600,
}: SanityFetchArgs): Promise<T | null> {
  if (!SANITY_ENABLED) return null

  return sanityClient.fetch<T>(
    query,
    params,
    revalidate === false
      ? { cache: 'no-store' }
      : { next: { revalidate } }
  )
}

export const QUERIES = {
  featuredProjects: `
    *[_type=="project" && featured==true]
    | order(completionDate desc)[0...6] {
      _id, title, slug, status, category, bhkType,
      location, completionDate, budget, shortDescription,
      coverImage, tags, completionPercent
    }
  `,

  allProjects: `
    *[_type=="project"]
    | order(featured desc, completionDate desc) {
      _id, title, slug, status, featured, category, bhkType,
      location, completionDate, budget, shortDescription,
      coverImage, tags, completionPercent
    }
  `,

  projectBySlug: `
    *[_type=="project" && slug.current==$slug][0] {
      _id, title, slug, status, featured, category, bhkType,
      location, startDate, completionDate, duration, budget,
      shortDescription, description, coverImage, gallery,
      videoUrl, completionPercent, expectedCompletion,
      progressUpdates, tags, clientName, testimonial,
      testimonialRating, homefixLink, seoTitle, seoDescription
    }
  `,

  testimonials: `
    *[_type=="testimonial" && showOnHomepage==true]
    | order(date desc)[0...8] {
      _id, clientName, location, rating, review,
      source, date, clientPhoto,
      "projectTitle": projectRef->title
    }
  `,

  allTestimonials: `
    *[_type=="testimonial"]
    | order(date desc) {
      _id, clientName, location, rating, review,
      source, date, clientPhoto,
      "projectTitle": projectRef->title
    }
  `,

  publishedPosts: `
    *[_type=="blogPost" && status=="published"]
    | order(publishedAt desc) {
      _id, title, slug, coverImage, excerpt,
      category, publishedAt, tags, readingTime
    }
  `,

  postBySlug: `
    *[_type=="blogPost" && slug.current==$slug][0] {
      _id, title, slug, coverImage, body, excerpt,
      category, publishedAt, tags, readingTime,
      relatedProjects[]->{title, slug},
      seoTitle, seoDescription, ogImage
    }
  `,

  teamMembers: `
    *[_type=="teamMember"]
    | order(order asc) {
      _id, name, role, photo, bio,
      experience, specialization, isFounder, socialLinks
    }
  `,

  siteSettings: `*[_type=="siteSettings"][0]`,
} as const
