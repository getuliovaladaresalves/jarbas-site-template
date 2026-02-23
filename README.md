# Jarbas Tech Site Builder

> Crie sites profissionais completos usando IA — do briefing ao deploy, guiado por agentes especializados.

---

## O que é isso?

Um repositório que funciona como um **web designer + desenvolvedor + copywriter movido a IA**.

Você descreve o que quer. Os agentes planejam, projetam, escrevem os textos e constroem o site. O resultado é um site funcional com painel de administração — não só um visual bonito.

**Stack:** Next.js 15 + Payload CMS 3.0 + TypeScript + Tailwind CSS v4

---

## Como funciona

```
@brief     → entrevista você e gera o briefing do projeto
@architect → define a arquitetura técnica
               ↳ se houver WordPress: @migrate extrai e audita o conteúdo
@ux        → pesquisa referências e cria o sistema visual  ┐ paralelo
@copy      → escreve todos os textos com foco em conversão ┘
@dev       → implementa frontend, backend e integrações
@qa        → valida qualidade, SEO e acessibilidade
@devops    → faz o deploy em produção (staging → produção)

@revise    → iterações e manutenção em qualquer etapa
```

Cada agente lê o output do anterior. Você aprova ou ajusta entre etapas.

---

## Início rápido

**Cada projeto de cliente = um repositório próprio.** Use o botão abaixo para criar um repo limpo a partir deste template:

1. Clique em **"Use this template"** → **"Create a new repository"**
2. Nomeie o repo com o nome do projeto (ex: `site-cliente-abc`)
3. Clone o repo recém-criado (não este template)

```bash
git clone https://github.com/seu-usuario/site-cliente-abc.git
cd site-cliente-abc
npm install
cp deploy/shared/env.example .env
npx claude
```

No chat do Claude Code:
```
@brief
```

> Leia `START_HERE.md` para o guia completo.

---

## O que o site gerado inclui

| Categoria | O que vem |
|---|---|
| **CMS** | Painel admin em `/admin` — o cliente edita textos, imagens e páginas sem tocar no código |
| **SEO** | Sitemap, robots.txt, meta tags dinâmicas, Open Graph, JSON-LD |
| **Marketing** | Google Analytics, GTM, Meta Pixel, Google Ads, TikTok Pixel, banner de consentimento LGPD |
| **Performance** | next/image, next/font, lazy loading, ISR |
| **Acessibilidade** | WCAG AA — contraste, navegação por teclado, aria-labels |
| **Deploy** | Vercel, Docker/VPS ou Hostinger |

---

## Migração WordPress

Tem um site WordPress e quer migrar? O repositório inclui ferramentas de extração e importação em `migration/`. Mencione isso ao `@brief` no início do projeto.

---

## Estrutura

```
.claude/commands/agents/   ← os 9 agentes Jarbas Tech
docs/                      ← PRD template + documentação
migration/                 ← ferramentas WordPress
deploy/                    ← Docker, Vercel, Hostinger
src/
├── app/                   ← rotas Next.js (frontend + admin)
├── blocks/                ← schemas de blocos do Payload
├── collections/           ← Pages, Posts, Media, Users, Categories
├── components/            ← componentes React
├── globals/               ← SiteSettings, Header, Footer, SEO, Marketing
└── ...
START_HERE.md              ← leia primeiro
```

---

## Pré-requisitos

- Node.js 18+
- Claude Code (`npx claude`)
- Conta no Claude (claude.ai)

---

## Licença

Uso privado — Jarbas Tech.
