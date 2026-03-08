import type { Metadata } from 'next'
import BlogPage from '@/views/BlogPage'
import { QUERIES, sanityFetch } from '@/lib/sanity'
import { buildPageMetadata } from '@/lib/seo'
import type { BlogPost } from '@/types'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/blog')
}

export default async function Page() {
  const posts =
    (await sanityFetch<BlogPost[]>({
      query: QUERIES.publishedPosts,
      revalidate,
    })) ?? []

  return <BlogPage posts={posts} />
}
