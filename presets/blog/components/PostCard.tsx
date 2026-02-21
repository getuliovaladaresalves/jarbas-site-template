import Link from 'next/link'
import Image from 'next/image'

interface PostCardProps {
  title: string
  slug: string
  excerpt?: string
  featuredImage?: { url?: string; alt?: string } | null
  publishedAt?: string
  categories?: Array<{ title?: string; slug?: string }>
  author?: { name?: string } | null
}

export function PostCard({ title, slug, excerpt, featuredImage, publishedAt, categories, author }: PostCardProps) {
  return (
    <article className="group rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${slug}`}>
        {featuredImage?.url && (
          <div className="relative aspect-video">
            <Image src={featuredImage.url} alt={featuredImage.alt || title} fill className="object-cover group-hover:scale-105 transition-transform" />
          </div>
        )}
        <div className="p-4">
          {categories && categories.length > 0 && (
            <div className="flex gap-2 mb-2">
              {categories.map((cat, i) => (
                <span key={i} className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          <h2 className="text-lg font-semibold mb-1 group-hover:text-blue-600 transition-colors">{title}</h2>
          {excerpt && <p className="text-gray-600 text-sm line-clamp-2 mb-2">{excerpt}</p>}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            {author?.name && <span>{author.name}</span>}
            {publishedAt && <time>{new Date(publishedAt).toLocaleDateString('pt-BR')}</time>}
          </div>
        </div>
      </Link>
    </article>
  )
}
