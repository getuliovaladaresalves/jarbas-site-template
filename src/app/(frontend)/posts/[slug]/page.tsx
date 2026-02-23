import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'
import { generatePageMeta } from '@/lib/generateMeta'
import { RichText } from '@payloadcms/richtext-lexical/react'

type Props = {
  params: Promise<{ slug: string }>
}

const getPost = cache(async (slug: string) => {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'posts',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  })
  return docs[0] ?? null
})

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const { docs } = await payload.find({
      collection: 'posts',
      where: { status: { equals: 'published' } },
      limit: 100,
      select: { slug: true },
    })
    return docs.map((doc) => ({ slug: doc.slug }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return {}
  return generatePageMeta(post)
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
  const author = typeof post.author === 'object' ? post.author : null

  return (
    <article className="container py-12 max-w-3xl mx-auto">
      {image?.url && (
        <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
          <Image src={image.url} alt={image.alt || post.title} fill className="object-cover" />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-8">
        {author && <span>Por {author.name}</span>}
        {post.publishedAt && (
          <time>{new Date(post.publishedAt).toLocaleDateString('pt-BR')}</time>
        )}
      </div>

      {post.content && (
        <div className="prose prose-lg max-w-none">
          <RichText data={post.content} />
        </div>
      )}
    </article>
  )
}
