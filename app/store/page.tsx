import type { Metadata } from 'next'
import StorePage from '@/views/StorePage'
import { buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/store')
}

export default function Page() {
  return <StorePage />
}
