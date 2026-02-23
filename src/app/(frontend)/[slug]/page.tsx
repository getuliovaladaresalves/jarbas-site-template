import { notFound } from 'next/navigation'
import { cache } from 'react'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { generatePageMeta } from '@/lib/generateMeta'

type Props = {
  params: Promise<{ slug: string }>
}

// Cache da query por slug — deduplica chamadas entre generateMetadata e Page
const getPage = cache(async (slug: string) => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return docs[0] ?? null
})

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'pages',
      where: { status: { equals: 'published' } },
      limit: 100,
      select: { slug: true },
    })

    return docs
      .filter((doc) => doc.slug !== 'home')
      .map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params
    const page = await getPage(slug)
    if (!page) return {}
    return generatePageMeta(page)
  } catch {
    return {}
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout ?? []} />
}
