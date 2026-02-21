/**
 * Extrai dados SEO (Yoast/RankMath) do WordPress
 * Uso: npx tsx migration/wp-extractor/extract-seo.ts
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'

interface WPPostWithSEO {
  id: number
  slug: string
  yoast_head_json?: {
    title?: string
    description?: string
    og_title?: string
    og_description?: string
    og_image?: Array<{ url: string }>
    canonical?: string
  }
  rank_math_title?: string
  rank_math_description?: string
}

async function fetchWithSEO(type: 'posts' | 'pages'): Promise<WPPostWithSEO[]> {
  const results: WPPostWithSEO[] = []
  let page = 1
  let hasMore = true

  while (hasMore) {
    const res = await fetch(`${WP_URL}/wp-json/wp/v2/${type}?per_page=100&page=${page}`)
    if (!res.ok) break
    const data = (await res.json()) as WPPostWithSEO[]
    results.push(...data)
    const totalPages = parseInt(res.headers.get('X-WP-TotalPages') || '1')
    hasMore = page < totalPages
    page++
  }

  return results
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('Extraindo dados SEO...')

  const posts = await fetchWithSEO('posts')
  const pages = await fetchWithSEO('pages')
  const all = [...posts, ...pages]

  const seoData = all.map((item) => {
    const yoast = item.yoast_head_json
    return {
      wpId: item.id,
      slug: item.slug,
      seo: {
        title: yoast?.title || item.rank_math_title || '',
        description: yoast?.description || item.rank_math_description || '',
        ogTitle: yoast?.og_title || '',
        ogDescription: yoast?.og_description || '',
        ogImage: yoast?.og_image?.[0]?.url || '',
        canonical: yoast?.canonical || '',
      },
    }
  })

  writeFileSync(`${OUTPUT_DIR}/seo.json`, JSON.stringify(seoData, null, 2))
  console.log(`${seoData.length} registros SEO extraídos`)
  console.log(`Salvo em ${OUTPUT_DIR}/seo.json`)
}

main().catch(console.error)
