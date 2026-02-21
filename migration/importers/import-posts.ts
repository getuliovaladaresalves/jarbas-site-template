/**
 * Importa posts extraídos para o Payload CMS
 * Uso: npx tsx migration/importers/import-posts.ts
 * Executar APÓS import-media
 */

import { readFileSync } from 'fs'
import { getPayload } from '../../src/lib/payload'

interface ExtractedPost {
  wpId: number
  slug: string
  title: string
  content: string
  excerpt: string
  publishedAt: string
  status: string
  wpFeaturedMedia: number
}

async function main() {
  const posts: ExtractedPost[] = JSON.parse(readFileSync('./migration/data/posts.json', 'utf-8'))
  const payload = await getPayload()

  // Carregar mapa de IDs de mídia
  let mediaIdMap: Record<string, string> = {}
  try {
    mediaIdMap = JSON.parse(readFileSync('./migration/data/media-id-map.json', 'utf-8'))
  } catch {
    console.log('Mapa de mídia não encontrado, importando sem imagens')
  }

  console.log(`Importando ${posts.length} posts...`)

  let success = 0
  for (const post of posts) {
    try {
      await payload.create({
        collection: 'posts',
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          publishedAt: post.publishedAt,
          status: post.status as 'draft' | 'published',
          featuredImage: mediaIdMap[String(post.wpFeaturedMedia)] || undefined,
          // content será importado como rich text - requer conversão HTML → Lexical
          // TODO: Implementar conversor HTML para Lexical
        },
      })
      success++
      console.log(`  ✓ ${post.title}`)
    } catch (err) {
      console.error(`  ✗ ${post.title}:`, (err as Error).message)
    }
  }

  console.log(`\n${success}/${posts.length} posts importados com sucesso`)
}

main().catch(console.error)
