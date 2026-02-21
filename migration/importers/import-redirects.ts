/**
 * Importa redirects para o Payload CMS (plugin redirects)
 * Uso: npx tsx migration/importers/import-redirects.ts
 */

import { readFileSync, existsSync } from 'fs'
import { getPayload } from '../../src/lib/payload'

interface Redirect {
  from: string
  to: string
  type: number
}

async function main() {
  const payload = await getPayload()
  const redirects: Redirect[] = []

  // Carregar redirects extraídos do WP
  if (existsSync('./migration/data/redirects.json')) {
    const extracted = JSON.parse(readFileSync('./migration/data/redirects.json', 'utf-8'))
    redirects.push(...extracted)
  }

  // Carregar redirects gerados pelo url-mapper
  if (existsSync('./migration/data/url-map.json')) {
    const urlMap: Array<{ wpUrl: string; newUrl: string }> = JSON.parse(
      readFileSync('./migration/data/url-map.json', 'utf-8'),
    )
    for (const mapping of urlMap) {
      if (mapping.wpUrl !== mapping.newUrl) {
        redirects.push({ from: mapping.wpUrl, to: mapping.newUrl, type: 301 })
      }
    }
  }

  console.log(`Importando ${redirects.length} redirects...`)

  let success = 0
  for (const redirect of redirects) {
    try {
      await payload.create({
        collection: 'redirects',
        data: {
          from: redirect.from,
          to: { type: 'custom', url: redirect.to },
          type: String(redirect.type),
        },
      })
      success++
    } catch (err) {
      console.error(`  ✗ ${redirect.from}:`, (err as Error).message)
    }
  }

  console.log(`${success}/${redirects.length} redirects importados`)
}

main().catch(console.error)
