/**
 * Extrai posts do WordPress via REST API
 * Uso: npx tsx migration/wp-extractor/extract-posts.ts
 */

import { writeFileSync, mkdirSync } from 'fs'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'

interface WPPost {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  excerpt: { rendered: string }
  date: string
  modified: string
  status: string
  categories: number[]
  featured_media: number
  author: number
}

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const results: T[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const url = `${WP_URL}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`
    console.log(`Fetching ${url}`)
    const res = await fetch(url)
    if (!res.ok) break

    const data = (await res.json()) as T[]
    results.push(...data)

    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
    hasMore = page < totalPages
    page++
  }

  return results
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('Extraindo posts...')
  const posts = await fetchAll<WPPost>('posts')

  console.log(`${posts.length} posts encontrados`)

  const processed = posts.map((post) => ({
    wpId: post.id,
    slug: post.slug,
    title: post.title.rendered,
    content: post.content.rendered,
    excerpt: post.excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
    publishedAt: post.date,
    updatedAt: post.modified,
    status: post.status === 'publish' ? 'published' : 'draft',
    wpCategories: post.categories,
    wpFeaturedMedia: post.featured_media,
    wpAuthor: post.author,
  }))

  writeFileSync(`${OUTPUT_DIR}/posts.json`, JSON.stringify(processed, null, 2))
  console.log(`Salvo em ${OUTPUT_DIR}/posts.json`)
}

main().catch(console.error)
