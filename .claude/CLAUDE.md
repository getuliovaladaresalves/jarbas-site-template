# CLAUDE.md — Jarbas Site Template
> Escopo: LOCAL — aplica-se a este projeto. Lido junto com o CLAUDE.md global.

## Infraestrutura e decisões técnicas

> **Consulte `~/.claude/STACKS_GUIDE.md`** antes de qualquer escolha de stack ou plataforma de deploy.
> **Deploy padrão neste projeto: Coolify/Hetzner (Docker).** Vercel é opção secundária para casos simples sem backend.

## O que é este projeto

Template para criar e migrar sites com **Next.js 15** + **Payload CMS 3.0**.

Casos de uso principais:
- Migração de sites WordPress (Hostinger) → Coolify/Hetzner
- Novos sites institucionais, blogs e landing pages com painel de admin próprio

## Comandos

```bash
npm run dev             # Dev server (frontend + admin em localhost:3000)
npm run build           # Build de produção
npm run lint            # ESLint
npm run typecheck       # TypeScript check
npm run generate:types  # Gera payload-types.ts
npm run test            # Smoke tests com Playwright
```

## Estrutura

- `src/collections/` — Collections do Payload (Pages, Posts, Media, Users, Categories)
- `src/globals/` — Globals editáveis (SiteSettings, Header, Footer, SEOSettings, MarketingSettings)
- `src/blocks/` — Schemas de blocos para layout builder
- `src/components/` — Componentes React (layout, blocks, seo, marketing, ui)
- `src/app/(frontend)/` — Rotas públicas do site
- `src/app/(payload)/` — Admin panel e API do Payload
- `migration/` — Ferramentas de migração WordPress
- `deploy/coolify/` — Deploy no Coolify/Hetzner **(primário)**
- `deploy/docker/` — Dockerfile e Docker Compose (dev/staging)
- `deploy/vercel/` — Vercel (secundário)
- `deploy/shared/` — Variáveis de ambiente compartilhadas

## Globals editáveis pelo cliente (sem dev)

- **SiteSettings**: nome, logo, cores, contato, redes sociais
- **Header**: menu de navegação, CTA
- **Footer**: colunas de links, copyright
- **SEOSettings**: Google Analytics, Search Console, GTM
- **MarketingSettings**: Meta Pixel, Google Ads, TikTok Pixel, scripts custom

## Convenções

- TypeScript strict mode
- Imports absolutos com `@/`
- Tailwind CSS — sem CSS customizado desnecessário
- Componentes server-side por padrão — client apenas quando necessário
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`

## Payload CMS 3.0

- Admin panel em `/admin`
- API REST em `/api`
- Collections = dados estruturados
- Globals = singletons editáveis
- Blocks = compõem layouts de páginas
- Plugins ativos: SEO, Redirects, Form Builder

## Banco de dados

- **Dev local**: SQLite (zero configuração)
- **Produção**: PostgreSQL gerenciado pelo Coolify

## Agentes Jarbas Tech

Agentes em `.claude/commands/agents/`:
- `@brief` — Entrevista e gera `docs/PRD.md` ← **começa aqui**
- `@architect` — Lê PRD, gera `docs/architecture.md`
- `@ux` — Pesquisa referências, gera `docs/design-system.md`
- `@copy` — Pesquisa mercado, gera `docs/copy.md`
- `@dev` — Implementa o site (lê architecture + design + copy)
- `@qa` — Valida qualidade, SEO, performance → gera `docs/qa-report.md`
- `@devops` — Quality gates + deploy no Coolify/Hetzner
- `@migrate` — Migração WordPress → Payload (chamar quando PRD indicar)
- `@revise` — Iteração e manutenção pós-deploy
