# Guia do Desenvolvedor

## Setup Inicial

```bash
# Clone o template
git clone <repo-url> meu-projeto
cd meu-projeto

# Execute o scaffold (ou configure manualmente)
npx tsx scaffold/init.ts

# Instale dependências
npm install

# Configure variáveis de ambiente
cp deploy/shared/env.example .env
# Edite .env com suas credenciais

# Inicie o desenvolvimento
npm run dev
```

## Criando uma Nova Collection

```typescript
// src/collections/MinhaCollection.ts
import type { CollectionConfig } from 'payload'

export const MinhaCollection: CollectionConfig = {
  slug: 'minha-collection',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,
    create: ({ req: { user } }) => user?.role === 'admin',
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    // ... mais campos
  ],
}
```

Registre em `src/payload.config.ts`:
```typescript
collections: [Pages, Posts, Media, Users, Categories, MinhaCollection],
```

## Criando um Novo Bloco

1. Defina o bloco em `src/blocks/MeuBloco.ts`:
```typescript
import type { Block } from 'payload'

export const MeuBloco: Block = {
  slug: 'meuBloco',
  fields: [
    { name: 'heading', type: 'text' },
    // ... campos
  ],
}
```

2. Adicione ao array de blocos em `src/blocks/index.ts`

3. Crie o componente em `src/components/blocks/MeuBloco.tsx`

4. Registre no `RenderBlocks.tsx`:
```typescript
import { MeuBloco } from './MeuBloco'
const blockComponents = {
  // ...existentes
  meuBloco: MeuBloco,
}
```

## Criando um Novo Global

```typescript
// src/globals/MeuGlobal.ts
import type { GlobalConfig } from 'payload'

export const MeuGlobal: GlobalConfig = {
  slug: 'meu-global',
  access: {
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    // ... campos
  ],
}
```

## Padrões de Data Fetching

### Em Server Components (recomendado)

```typescript
import { getPayload } from '@/lib/payload'

export default async function Page() {
  const payload = await getPayload()

  // Collection
  const { docs } = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
    limit: 10,
  })

  // Global
  const settings = await payload.findGlobal({ slug: 'site-settings' })
}
```

### Em Client Components (via API)

```typescript
const res = await fetch('/api/pages?where[status][equals]=published')
const data = await res.json()
```

## Adicionando um Preset

Para aplicar um preset após scaffold:

1. Copie collections do preset para `src/collections/`
2. Importe e registre no `payload.config.ts`
3. Copie componentes para `src/components/`
4. Copie blocos para `src/blocks/` e registre no index

## Deploy

### Vercel
```bash
npm install -g vercel
vercel --prod
```

### Docker
```bash
docker compose -f deploy/docker/docker-compose.prod.yml up -d --build
```

### Hostinger
Use o MCP Hostinger via Claude Code ou siga `deploy/hostinger/setup-hostinger.md`.

## Gerar Tipos TypeScript

```bash
npm run generate:types
```

Isso gera `src/payload-types.ts` com tipos para todas as collections e globals.

## Comandos Úteis

```bash
npm run dev          # Dev server
npm run build        # Build produção
npm run lint         # Lint
npm run typecheck    # TypeScript check
npm run generate:types  # Gera tipos
```
