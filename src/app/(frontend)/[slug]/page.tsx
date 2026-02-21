import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayload } from '@/lib/payload'
import { RenderBlocks } from '@/components/blocks/RenderBlocks'
import { generatePageMeta } from '@/lib/generateMeta'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
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
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = docs[0]
  if (!page) return {}

  return generatePageMeta(page)
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const payload = await getPayload()

  const { docs } = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  const page = docs[0]
  if (!page) notFound()

  return <RenderBlocks blocks={page.layout ?? []} />
}
