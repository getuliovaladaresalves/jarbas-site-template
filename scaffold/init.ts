#!/usr/bin/env npx tsx
/**
 * Script de scaffold para gerar um novo projeto a partir do template.
 * Uso: npx tsx scaffold/init.ts
 *
 * Lê as opções de setup.config.ts ou pergunta interativamente.
 */

import * as readline from 'readline'
import { cpSync, writeFileSync, readFileSync, mkdirSync, existsSync, rmSync } from 'fs'
import { resolve, join } from 'path'

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

function ask(question: string, options?: string[]): Promise<string> {
  return new Promise((resolve) => {
    const prompt = options ? `${question} [${options.join('/')}]: ` : `${question}: `
    rl.question(prompt, (answer) => {
      if (options && !options.includes(answer)) {
        console.log(`  Opções válidas: ${options.join(', ')}`)
        resolve(ask(question, options))
      } else {
        resolve(answer)
      }
    })
  })
}

async function main() {
  console.log('\n🏗️  Scaffold — Site Template\n')

  const projectName = await ask('Nome do projeto')
  const siteType = await ask('Tipo de site', ['institutional', 'blog', 'landing-page', 'ecommerce'])
  const database = await ask('Banco de dados', ['postgres', 'mongodb'])
  const deploy = await ask('Plataforma de deploy', ['vercel', 'docker', 'hostinger'])

  console.log(`\nConfigurações:`)
  console.log(`  Projeto: ${projectName}`)
  console.log(`  Tipo: ${siteType}`)
  console.log(`  Banco: ${database}`)
  console.log(`  Deploy: ${deploy}`)

  const confirm = await ask('\nConfirmar? (s/n)')
  if (confirm !== 's') {
    console.log('Cancelado.')
    rl.close()
    return
  }

  const rootDir = resolve(__dirname, '..')

  // 1. Atualizar package.json
  console.log('\n📦 Atualizando package.json...')
  const pkgPath = join(rootDir, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8'))
  pkg.name = projectName
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))

  // 2. Configurar banco de dados no payload.config.ts
  if (database === 'mongodb') {
    console.log('🗄️  Configurando MongoDB...')
    const configPath = join(rootDir, 'src', 'payload.config.ts')
    let config = readFileSync(configPath, 'utf-8')
    config = config.replace(
      "import { postgresAdapter } from '@payloadcms/db-postgres'",
      "import { mongooseAdapter } from '@payloadcms/db-mongodb'",
    )
    config = config.replace(
      /db: postgresAdapter\(\{[\s\S]*?\}\),/,
      "db: mongooseAdapter({\n    url: process.env.DATABASE_URI || '',\n  }),",
    )
    writeFileSync(configPath, config)

    // Precisa instalar pacote mongodb
    console.log('  ⚠️  Execute: npm install @payloadcms/db-mongodb && npm uninstall @payloadcms/db-postgres')
  }

  // 3. Copiar preset específico
  console.log(`📋 Aplicando preset "${siteType}"...`)
  const presetDir = join(rootDir, 'presets', siteType)
  if (existsSync(presetDir)) {
    // Copiar collections do preset para src/collections
    const presetCollections = join(presetDir, 'collections')
    if (existsSync(presetCollections)) {
      cpSync(presetCollections, join(rootDir, 'src', 'collections'), { recursive: true })
      console.log('  ✓ Collections do preset copiadas')
    }

    // Copiar componentes do preset para src/components
    const presetComponents = join(presetDir, 'components')
    if (existsSync(presetComponents)) {
      mkdirSync(join(rootDir, 'src', 'components', 'presets'), { recursive: true })
      cpSync(presetComponents, join(rootDir, 'src', 'components', 'presets'), { recursive: true })
      console.log('  ✓ Componentes do preset copiados')
    }

    // Copiar blocks do preset para src/blocks
    const presetBlocks = join(presetDir, 'blocks')
    if (existsSync(presetBlocks)) {
      cpSync(presetBlocks, join(rootDir, 'src', 'blocks'), { recursive: true })
      console.log('  ✓ Blocos do preset copiados')
    }

    // Copiar pages do preset
    const presetPages = join(presetDir, 'pages')
    if (existsSync(presetPages)) {
      mkdirSync(join(rootDir, 'src', 'app', '(frontend)', 'preset-pages'), { recursive: true })
      cpSync(presetPages, join(rootDir, 'src', 'app', '(frontend)', 'preset-pages'), { recursive: true })
      console.log('  ✓ Páginas do preset copiadas')
    }

    // Copiar payments (ecommerce)
    const presetPayments = join(presetDir, 'payments')
    if (existsSync(presetPayments)) {
      mkdirSync(join(rootDir, 'src', 'payments'), { recursive: true })
      cpSync(presetPayments, join(rootDir, 'src', 'payments'), { recursive: true })
      console.log('  ✓ Módulos de pagamento copiados')
    }
  }

  // 4. Configurar deploy
  console.log(`🚀 Configurando deploy "${deploy}"...`)
  if (deploy === 'vercel') {
    cpSync(join(rootDir, 'deploy', 'vercel', 'vercel.json'), join(rootDir, 'vercel.json'))
    console.log('  ✓ vercel.json criado na raiz')
  } else if (deploy === 'docker') {
    cpSync(join(rootDir, 'deploy', 'docker', 'Dockerfile'), join(rootDir, 'Dockerfile'))
    cpSync(join(rootDir, 'deploy', 'docker', 'docker-compose.yml'), join(rootDir, 'docker-compose.yml'))
    console.log('  ✓ Dockerfile e docker-compose.yml criados na raiz')
  }

  // 5. Copiar .env.example
  cpSync(join(rootDir, 'deploy', 'shared', 'env.example'), join(rootDir, '.env.example'))
  cpSync(join(rootDir, 'deploy', 'shared', 'env.example'), join(rootDir, '.env'))
  console.log('  ✓ .env.example e .env criados')

  // 6. Limpeza opcional — remover diretórios de template
  console.log('\n🧹 Limpando diretórios do template...')
  const cleanupDirs = ['presets', 'scaffold', 'migration', 'deploy']
  for (const dir of cleanupDirs) {
    const path = join(rootDir, dir)
    if (existsSync(path)) {
      // Não remove, apenas avisa
      console.log(`  ℹ️  ${dir}/ mantido (remova manualmente se não precisar)`)
    }
  }

  console.log('\n✅ Projeto configurado com sucesso!')
  console.log('\nPróximos passos:')
  console.log('  1. Configure o .env com suas credenciais')
  console.log('  2. npm install')
  console.log('  3. npm run dev')
  console.log('  4. Acesse /admin para configurar o site')

  rl.close()
}

main().catch((err) => {
  console.error(err)
  rl.close()
  process.exit(1)
})
