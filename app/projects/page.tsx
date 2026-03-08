import type { Metadata } from 'next'
import ProjectsPage from '@/views/ProjectsPage'
import { QUERIES, sanityFetch } from '@/lib/sanity'
import { buildPageMetadata } from '@/lib/seo'
import type { Project } from '@/types'

export const revalidate = 3600

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/projects')
}

export default async function Page() {
  const projects = (await sanityFetch<Project[]>({
    query: QUERIES.allProjects,
    revalidate,
  })) ?? []

  return <ProjectsPage projects={projects} />
}
