import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'

export async function BlogSection() {
  const payload = await getPayload()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: { status: { equals: 'published' } },
    sort: '-publishedAt',
    limit: 3,
    depth: 1,
  })

  if (posts.length === 0) return null

  return (
    <section className="container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold">Últimas Notícias</h2>
        <Link href="/posts" className="text-blue-600 hover:underline text-sm font-medium">
          Ver todas →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {posts.map((post) => {
          const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
          return (
            <Link key={post.id} href={`/posts/${post.slug}`} className="group block">
              {image?.url && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image src={image.url} alt={image.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <h3 className="font-semibold group-hover:text-blue-600 transition-colors">{post.title}</h3>
              {post.excerpt && <p className="text-gray-600 text-sm mt-1 line-clamp-2">{post.excerpt}</p>}
            </Link>
          )
        })}
      </div>
    </section>
  )
}
