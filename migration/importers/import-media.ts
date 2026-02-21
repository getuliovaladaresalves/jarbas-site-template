/**
 * Importa mídia extraída para o Payload CMS
 * Uso: npx tsx migration/importers/import-media.ts
 * Executar ANTES de import-posts e import-pages
 */

import { readFileSync } from 'fs'
import { getPayload } from '../../src/lib/payload'

interface ExtractedMedia {
  wpId: number
  alt: string
  filename: string
  mimeType: string
}

async function main() {
  const mediaData: ExtractedMedia[] = JSON.parse(readFileSync('./migration/data/media.json', 'utf-8'))
  const payload = await getPayload()

  console.log(`Importando ${mediaData.length} arquivos de mídia...`)

  const idMap: Record<number, string> = {}

  for (const item of mediaData) {
    try {
      const filePath = `./migration/data/media/${item.filename}`
      const doc = await payload.create({
        collection: 'media',
        data: {
          alt: item.alt,
        },
        filePath,
      })
      idMap[item.wpId] = doc.id
      console.log(`  ✓ ${item.filename} → ${doc.id}`)
    } catch (err) {
      console.error(`  ✗ ${item.filename}:`, (err as Error).message)
    }
  }

  // Salva mapa de IDs para uso nos outros importadores
  const { writeFileSync: write } = await import('fs')
  write('./migration/data/media-id-map.json', JSON.stringify(idMap, null, 2))
  console.log(`\nMapa de IDs salvo em migration/data/media-id-map.json`)
  console.log(`${Object.keys(idMap).length}/${mediaData.length} importados com sucesso`)
}

main().catch(console.error)
