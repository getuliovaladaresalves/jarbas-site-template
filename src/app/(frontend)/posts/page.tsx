import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Confira nossos últimos artigos e notícias.',
}

export default async function PostsPage() {
  const payload = await getPayload()

  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 12,
    depth: 1,
  })

  return (
    <div className="container py-12">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">Nenhum post publicado ainda.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
            return (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group block rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow"
              >
                {image?.url && (
                  <div className="relative aspect-video">
                    <Image
                      src={image.url}
                      alt={image.alt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                  )}
                  {post.publishedAt && (
                    <time className="text-xs text-gray-400 mt-2 block">
                      {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
                    </time>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
