# CLAUDE.md — Site Template

## O que é este projeto

Template universal para criar sites profissionais com **Next.js 15** + **Payload CMS 3.0**. Suporta sites institucionais, blogs, landing pages e e-commerce.

## Comandos

```bash
npm run dev          # Inicia dev server (frontend + admin)
npm run build        # Build de produção
npm run lint         # ESLint
npm run typecheck    # TypeScript check
npm run generate:types  # Gera payload-types.ts
```

## Estrutura

- `src/collections/` — Collections do Payload (Pages, Posts, Media, Users, Categories)
- `src/globals/` — Globals (SiteSettings, Header, Footer, SEOSettings, MarketingSettings)
- `src/blocks/` — Blocos para layout builder
- `src/components/` — Componentes React (layout, blocks, seo, marketing, ui)
- `src/app/(frontend)/` — Rotas do frontend Next.js
- `src/app/(payload)/` — Admin panel e API do Payload
- `presets/` — Variantes por tipo de site
- `migration/` — Ferramentas de migração WordPress
- `deploy/` — Configs de deploy (Vercel, Docker, Hostinger)

## Globals editáveis pelo cliente (sem dev)

- **SiteSettings**: nome, logo, cores, contato, redes sociais
- **Header**: menu de navegação, CTA
- **Footer**: colunas de links, copyright
- **SEOSettings**: Google Analytics, Search Console, GTM
- **MarketingSettings**: Meta Pixel, Google Ads, TikTok Pixel, scripts custom

## Convenções

- TypeScript strict mode
- Imports absolutos com `@/`
- Tailwind CSS para estilização
- Componentes server-side por padrão (client apenas quando necessário)
- Conventional commits: `feat:`, `fix:`, `docs:`, `chore:`

## Payload CMS 3.0

- Admin panel em `/admin`
- API REST em `/api`
- Collections definem dados estruturados
- Globals definem singletons editáveis
- Blocks compõem layouts de páginas
- Plugins: SEO, Redirects, Form Builder

## Agentes AIOS

Agentes disponíveis em `.claude/commands/agents/`:
- `@architect` — Arquitetura do site
- `@ux` — Design system e componentes
- `@dev` — Implementação
- `@qa` — Qualidade e performance
- `@devops` — Deploy e CI/CD
