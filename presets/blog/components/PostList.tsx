import { PostCard } from './PostCard'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  featuredImage?: { url?: string; alt?: string } | null
  publishedAt?: string
  categories?: Array<{ title?: string; slug?: string }>
  author?: { name?: string } | null
}

interface PostListProps {
  posts: Post[]
  totalPages?: number
  currentPage?: number
}

export function PostList({ posts, totalPages = 1, currentPage = 1 }: PostListProps) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            slug={post.slug}
            excerpt={post.excerpt}
            featuredImage={post.featuredImage}
            publishedAt={post.publishedAt}
            categories={post.categories}
            author={post.author}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-12">
          {Array.from({ length: totalPages }).map((_, i) => (
            <a
              key={i}
              href={`?page=${i + 1}`}
              className={`px-4 py-2 rounded-lg text-sm ${i + 1 === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {i + 1}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
