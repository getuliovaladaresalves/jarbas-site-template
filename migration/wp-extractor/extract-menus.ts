/**
 * Extrai menus de navegação do WordPress
 * Uso: npx tsx migration/wp-extractor/extract-menus.ts
 * Nota: Requer plugin WP REST API Menus ativo, ou acesso ao endpoint /menus
 */

import { writeFileSync, mkdirSync } from 'fs'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('Extraindo menus...')

  // Tenta endpoint padrão do WP REST API v2 Menus
  const endpoints = [
    '/wp-json/wp-api-menus/v2/menus',
    '/wp-json/menus/v1/menus',
    '/wp-json/wp/v2/menu-items',
  ]

  for (const endpoint of endpoints) {
    try {
      const res = await fetch(`${WP_URL}${endpoint}`)
      if (res.ok) {
        const menus = await res.json()
        writeFileSync(`${OUTPUT_DIR}/menus.json`, JSON.stringify(menus, null, 2))
        console.log(`Menus extraídos via ${endpoint}`)
        console.log(`Salvo em ${OUTPUT_DIR}/menus.json`)
        return
      }
    } catch {
      continue
    }
  }

  console.log('Nenhum endpoint de menus disponível.')
  console.log('Instale o plugin "WP REST API Menus" no WordPress ou exporte manualmente.')
  writeFileSync(`${OUTPUT_DIR}/menus.json`, JSON.stringify([], null, 2))
}

main().catch(console.error)
