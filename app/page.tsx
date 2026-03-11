import type { Metadata } from 'next'
import HomePage from '@/src/views/HomePage'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata('/')
}

export default function Page() {
  return <HomePage/>
}
