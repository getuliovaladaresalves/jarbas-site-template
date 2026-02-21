# Site Template — Next.js 15 + Payload CMS 3.0

Template universal reutilizável para criar sites profissionais: institucionais, blogs, landing pages e e-commerce.

## Features

- **Payload CMS 3.0** embutido no Next.js (admin em `/admin`)
- **12 blocos** de layout prontos (Hero, Content, CTA, Features, FAQ, etc.)
- **5 globals** editáveis pelo cliente (SiteSettings, Header, Footer, SEO, Marketing)
- **4 presets** de site (institucional, blog, landing page, e-commerce)
- **SEO completo**: sitemap, robots.txt, meta tags, JSON-LD, Google Analytics
- **Marketing**: Meta Pixel, Google Ads, GTM, TikTok, ConsentBanner (LGPD)
- **E-commerce**: Stripe + Mercado Pago com interface extensível
- **Migração WordPress**: scripts de extração e importação
- **Deploy**: Vercel, Docker, Hostinger (via MCP)
- **5 agentes AIOS** para desenvolvimento assistido por IA

## Quick Start

```bash
# Clone
git clone <url> meu-site
cd meu-site

# Setup interativo
npx tsx scaffold/init.ts

# Instalar dependências
npm install

# Configurar variáveis
cp deploy/shared/env.example .env
# Edite .env com DATABASE_URI e PAYLOAD_SECRET

# Iniciar
npm run dev
```

Acesse:
- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

## Tech Stack

| Tecnologia | Uso |
|-----------|-----|
| Next.js 15 | Framework frontend (App Router) |
| Payload CMS 3.0 | Backend/CMS (embutido) |
| TypeScript | Linguagem |
| Tailwind CSS v4 | Estilização |
| Lexical | Editor rich text |
| PostgreSQL | Banco de dados (padrão) |
| sharp | Processamento de imagens |

## Estrutura

```
src/
├── collections/     # Collections do Payload
├── globals/         # Globals editáveis
├── blocks/          # Blocos de layout
├── components/      # Componentes React
├── app/(frontend)/  # Rotas do site
├── app/(payload)/   # Admin e API
└── lib/             # Utilitários

presets/             # Variantes por tipo de site
migration/           # Migração WordPress
deploy/              # Configs de deploy
checklists/          # Checklists operacionais
docs/                # Documentação
```

## Documentação

- [Guia do Cliente](docs/client-guide.md) — Como usar o admin
- [Guia do Desenvolvedor](docs/developer-guide.md) — Como customizar
- [Migração WordPress](migration/migration-checklist.md) — Checklist de migração

## Presets Disponíveis

| Preset | Descrição |
|--------|-----------|
| `institutional` | Site institucional com serviços, equipe e blog |
| `blog` | Portal de conteúdo com tags, autores, busca |
| `landing-page` | Landing page com countdown e formulário de leads |
| `ecommerce` | E-commerce com produtos, carrinho, Stripe e Mercado Pago |

## Licença

Uso privado — Jarbas Tech.
