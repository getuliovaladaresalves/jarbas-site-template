/**
 * Extrai e baixa mídia do WordPress
 * Uso: npx tsx migration/wp-extractor/extract-media.ts
 */

import { writeFileSync, mkdirSync, createWriteStream } from 'fs'
import { Readable } from 'stream'
import { pipeline } from 'stream/promises'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'
const MEDIA_DIR = './migration/data/media'

interface WPMedia {
  id: number
  slug: string
  title: { rendered: string }
  alt_text: string
  source_url: string
  mime_type: string
  media_details?: { width?: number; height?: number }
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

async function downloadFile(url: string, filepath: string) {
  const res = await fetch(url)
  if (!res.ok || !res.body) return false
  const dest = createWriteStream(filepath)
  await pipeline(Readable.fromWeb(res.body as never), dest)
  return true
}

async function main() {
  mkdirSync(MEDIA_DIR, { recursive: true })

  console.log('Extraindo mídia...')
  const media = await fetchAll<WPMedia>('media')
  console.log(`${media.length} arquivos de mídia encontrados`)

  const processed = media.map((m) => ({
    wpId: m.id,
    alt: m.alt_text || m.title.rendered,
    sourceUrl: m.source_url,
    mimeType: m.mime_type,
    filename: m.source_url.split('/').pop() || `media-${m.id}`,
    width: m.media_details?.width,
    height: m.media_details?.height,
  }))

  writeFileSync(`${OUTPUT_DIR}/media.json`, JSON.stringify(processed, null, 2))

  console.log('Baixando arquivos...')
  for (const item of processed) {
    const filepath = `${MEDIA_DIR}/${item.filename}`
    console.log(`  ${item.filename}`)
    await downloadFile(item.sourceUrl, filepath)
  }

  console.log('Concluído!')
}

main().catch(console.error)
