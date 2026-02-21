/**
 * Extrai redirects existentes do WordPress (plugin Redirection ou similar)
 * Uso: npx tsx migration/wp-extractor/extract-redirects.ts
 */

import { writeFileSync, mkdirSync } from 'fs'

const WP_URL = process.env.WP_URL || 'https://seu-site.com.br'
const OUTPUT_DIR = './migration/data'

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true })

  console.log('Extraindo redirects...')

  // Tenta endpoint do plugin Redirection
  try {
    const res = await fetch(`${WP_URL}/wp-json/redirection/v1/redirect?per_page=200`, {
      headers: { 'X-WP-Nonce': process.env.WP_NONCE || '' },
    })

    if (res.ok) {
      const data = await res.json()
      const redirects = (data.items || []).map((r: { url: string; action_data: { url: string }; action_code: number }) => ({
        from: r.url,
        to: r.action_data?.url || '',
        type: r.action_code || 301,
      }))

      writeFileSync(`${OUTPUT_DIR}/redirects.json`, JSON.stringify(redirects, null, 2))
      console.log(`${redirects.length} redirects extraídos`)
      return
    }
  } catch {
    // Plugin não instalado
  }

  console.log('Plugin Redirection não encontrado. Gerando redirects vazios.')
  console.log('Os redirects serão gerados pelo url-mapper baseado nas URLs do WP.')
  writeFileSync(`${OUTPUT_DIR}/redirects.json`, JSON.stringify([], null, 2))
}

main().catch(console.error)
