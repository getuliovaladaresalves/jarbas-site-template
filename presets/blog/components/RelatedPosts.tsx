import Link from 'next/link'
import Image from 'next/image'
import { getPayload } from '@/lib/payload'

interface RelatedPostsProps {
  currentPostId: string
  categoryIds: string[]
}

export async function RelatedPosts({ currentPostId, categoryIds }: RelatedPostsProps) {
  if (categoryIds.length === 0) return null

  const payload = await getPayload()
  const { docs: posts } = await payload.find({
    collection: 'posts',
    where: {
      and: [
        { id: { not_equals: currentPostId } },
        { status: { equals: 'published' } },
        { categories: { in: categoryIds } },
      ],
    },
    limit: 3,
    depth: 1,
  })

  if (posts.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Posts Relacionados</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => {
          const image = typeof post.featuredImage === 'object' ? post.featuredImage : null
          return (
            <Link key={post.id} href={`/posts/${post.slug}`} className="group">
              {image?.url && (
                <div className="relative aspect-video rounded-lg overflow-hidden mb-2">
                  <Image src={image.url} alt={image.alt || post.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                </div>
              )}
              <h3 className="font-semibold group-hover:text-blue-600 transition-colors">{post.title}</h3>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
