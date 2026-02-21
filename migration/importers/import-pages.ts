/**
 * Importa páginas extraídas para o Payload CMS
 * Uso: npx tsx migration/importers/import-pages.ts
 */

import { readFileSync } from 'fs'
import { getPayload } from '../../src/lib/payload'

interface ExtractedPage {
  wpId: number
  slug: string
  title: string
  content: string
  publishedAt: string
  status: string
}

async function main() {
  const pages: ExtractedPage[] = JSON.parse(readFileSync('./migration/data/pages.json', 'utf-8'))
  const payload = await getPayload()

  console.log(`Importando ${pages.length} páginas...`)

  let success = 0
  for (const page of pages) {
    try {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          slug: page.slug,
          publishedAt: page.publishedAt,
          status: page.status as 'draft' | 'published',
          layout: [],
          // TODO: Converter content HTML em blocos Payload
          // O conteúdo HTML precisa ser mapeado para os blocos disponíveis
        },
      })
      success++
      console.log(`  ✓ ${page.title}`)
    } catch (err) {
      console.error(`  ✗ ${page.title}:`, (err as Error).message)
    }
  }

  console.log(`\n${success}/${pages.length} páginas importadas com sucesso`)
}

main().catch(console.error)
