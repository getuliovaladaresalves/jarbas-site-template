# Guia do Desenvolvedor

Este guia é para desenvolvedores que precisam entender a estrutura do projeto ou fazer alterações manuais fora do fluxo de agentes.

> Para criar um site do zero, use os agentes Jarbas Tech descritos no `START_HERE.md`.

---

## Setup

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
npm install
cp deploy/shared/env.example .env
npm run dev
```

O banco SQLite é criado automaticamente em `data/dev.db` na primeira execução.

---

## Comandos

```bash
npm run dev            # Dev server (frontend + admin)
npm run build          # Build de produção
npm run start          # Inicia o build de produção localmente
npm run lint           # ESLint
npm run typecheck      # TypeScript sem emitir arquivos
npm run format         # Prettier — formata todos os arquivos
npm run format:check   # Prettier — só verifica, não altera
npm run generate:types # Gera src/payload-types.ts a partir das collections
npm run clean          # Apaga .next e data/dev.db (começa do zero)
npm run test           # Playwright smoke tests
npm run test:ui        # Playwright com interface visual
```

---

## Estrutura de pastas relevante

```
src/
├── access/          ← funções de controle de acesso (isAdmin, isAdminOrEditor, isPublished)
├── app/
│   ├── (frontend)/  ← rotas públicas do site (page.tsx, [slug]/page.tsx, posts/)
│   └── (payload)/   ← admin panel e API do Payload CMS
├── blocks/          ← schemas de blocos para o Payload CMS (HeroBlock.ts, etc.)
├── collections/     ← definições de collections (Pages, Posts, Media, Users, Categories)
├── components/
│   ├── blocks/      ← componentes React dos blocos (Hero.tsx, Features.tsx, etc.)
│   ├── layout/      ← Header.tsx, Footer.tsx
│   ├── marketing/   ← scripts de rastreamento (GTM, Pixel, Analytics)
│   ├── seo/         ← JsonLd.tsx, GoogleAnalytics.tsx
│   └── ui/          ← componentes reutilizáveis (criados pelo @dev: Button, Card, etc.)
├── fields/          ← campos reutilizáveis (slug, link, colorPicker)
├── globals/         ← globals do Payload (SiteSettings, Header, Footer, SEO, Marketing)
├── hooks/           ← hooks do Payload (revalidatePage, formatSlug, populatePublishedAt)
├── lib/             ← utilitários (payload.ts, generateMeta.ts, fonts.ts)
└── styles/          ← globals.css (variáveis CSS, Tailwind)
```

---

## Criando uma Collection

```typescript
// src/collections/MinhaCollection.ts
import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrEditor } from '@/access/isAdminOrEditor'

export const MinhaCollection: CollectionConfig = {
  slug: 'minha-collection',
  admin: { useAsTitle: 'title' },
  access: {
    read: () => true,        // conteúdo público
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
  ],
}
```

Registre em `src/payload.config.ts`:
```typescript
collections: [Pages, Posts, Media, Users, Categories, MinhaCollection],
```

Execute `npm run generate:types` após qualquer mudança de schema.

---

## Criando um Bloco

**1. Schema Payload** (`src/blocks/MeuBlocoBlock.ts`):
```typescript
import type { Block } from 'payload'

export const MeuBlocoBlock: Block = {
  slug: 'meuBloco',
  fields: [
    { name: 'heading', type: 'text' },
  ],
}
```

**2. Registre** em `src/blocks/index.ts`

**3. Componente React** (`src/components/blocks/MeuBloco.tsx`):
```tsx
import type { MeuBlocoBlock as MeuBlocoBlockType } from '@/payload-types'

export function MeuBloco({ heading }: MeuBlocoBlockType) {
  return <section>{heading}</section>
}
```

**4. Registre** em `src/components/blocks/RenderBlocks.tsx`

---

## Data fetching (Server Components)

```typescript
import { getPayload } from '@/lib/payload'

export default async function Page() {
  const payload = await getPayload()

  // Collection
  const { docs } = await payload.find({
    collection: 'pages',
    where: { status: { equals: 'published' } },
  })

  // Global
  const settings = await payload.findGlobal({ slug: 'site-settings' })
}
```

---

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
|---|---|---|
| `PAYLOAD_SECRET` | Sim | Chave secreta do CMS (mín. 32 chars) |
| `DATABASE_URI` | Não (usa SQLite) | String PostgreSQL para produção |
| `NEXT_PUBLIC_SITE_URL` | Sim em prod | URL pública do site |

Veja `deploy/shared/env.example` para a lista completa.

---

## Deploy

```bash
# Vercel
vercel --prod

# Docker
docker compose -f deploy/docker/docker-compose.prod.yml up -d --build

# Hostinger
# Siga deploy/hostinger/setup-hostinger.md
```

---

## Testes

```bash
npm run test           # Roda smoke tests (requer dev server rodando ou inicia automaticamente)
npm run test:ui        # Interface visual do Playwright
```

Os testes ficam em `tests/smoke.spec.ts`. Adicione novos testes conforme novas páginas são criadas.
