/**
 * Extrai páginas do WordPress via REST API
 * Uso: npx tsx migration/wp-extractor/extract-pages.ts
 */

import { writeFileSync, mkdirSync } from 'fs'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'

interface WPPage {
  id: number
  slug: string
  title: { rendered: string }
  content: { rendered: string }
  date: string
  modified: string
  status: string
  parent: number
  menu_order: number
}

async function fetchAll<T>(endpoint: string): Promise<T[]> {
  const results: T[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/${endpoint}?per_page=100&page=${page}`)
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

  console.log('Extraindo páginas...')
  const pages = await fetchAll<WPPage>('pages')
  console.log(`${pages.length} páginas encontradas`)

  const processed = pages.map((p) => ({
    wpId: p.id,
    slug: p.slug,
    title: p.title.rendered,
    content: p.content.rendered,
    publishedAt: p.date,
    updatedAt: p.modified,
    status: p.status === 'publish' ? 'published' : 'draft',
    wpParent: p.parent,
    order: p.menu_order,
  }))

  writeFileSync(`${OUTPUT_DIR}/pages.json`, JSON.stringify(processed, null, 2))
  console.log(`Salvo em ${OUTPUT_DIR}/pages.json`)
}

main().catch(console.error)
