/**
 * Mapeia URLs do WordPress para URLs do Next.js
 * Gera arquivo de redirects 301
 * Uso: npx tsx migration/url-mapper.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs'

const OUTPUT_DIR = './migration/data'

interface WPItem {
  slug: string
  wpId: number
}

function mapPostUrl(slug: string): string {
  // WP: /2024/01/slug ou /categoria/slug → Next.js: /posts/slug
  return `/posts/${slug}`
}

function mapPageUrl(slug: string): string {
  // WP: /slug → Next.js: /slug (mesma estrutura)
  return `/${slug}`
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  const urlMap: Array<{ wpUrl: string; newUrl: string; type: string }> = []

  // Mapear posts
  if (existsSync(`${OUTPUT_DIR}/posts.json`)) {
    const posts: WPItem[] = JSON.parse(readFileSync(`${OUTPUT_DIR}/posts.json`, 'utf-8'))
    for (const post of posts) {
      urlMap.push({
        wpUrl: `/${post.slug}`,
        newUrl: mapPostUrl(post.slug),
        type: 'post',
      })
      // Variações comuns de URL do WP
      urlMap.push({
        wpUrl: `/blog/${post.slug}`,
        newUrl: mapPostUrl(post.slug),
        type: 'post',
      })
    }
  }

  // Mapear páginas
  if (existsSync(`${OUTPUT_DIR}/pages.json`)) {
    const pages: WPItem[] = JSON.parse(readFileSync(`${OUTPUT_DIR}/pages.json`, 'utf-8'))
    for (const page of pages) {
      urlMap.push({
        wpUrl: `/${page.slug}`,
        newUrl: mapPageUrl(page.slug),
        type: 'page',
      })
    }
  }

  // Remover duplicatas e auto-redirects
  const unique = urlMap.filter((item, index, self) => {
    if (item.wpUrl === item.newUrl) return false
    return index === self.findIndex((t) => t.wpUrl === item.wpUrl)
  })

  writeFileSync(`${OUTPUT_DIR}/url-map.json`, JSON.stringify(unique, null, 2))
  console.log(`${unique.length} mapeamentos de URL gerados`)
  console.log(`Salvo em ${OUTPUT_DIR}/url-map.json`)
  console.log('\nExecute import-redirects.ts para importar no Payload')
}

main().catch(console.error)
