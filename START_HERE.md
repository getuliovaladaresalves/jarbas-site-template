# Bem-vindo ao Jarbas Tech Site Builder

Este repositório é um **sistema de criação de sites guiado por IA**. Você não precisa saber programar para começar — os agentes fazem o trabalho técnico enquanto você define o que quer.

## O que você vai ter no final

- Site profissional completo (frontend Next.js)
- Painel de administração para gerenciar conteúdo (Payload CMS)
- SEO configurado (Google Analytics, Search Console, GTM)
- Marketing integrado (Meta Pixel, Google Ads, etc.)
- Backend extensível conforme o projeto cresce
- Deploy em produção

---

## Pré-requisitos

```bash
node --version   # v18 ou superior
npm --version    # v9 ou superior
git --version    # qualquer versão
```

Também precisará de uma conta no Claude (para usar o Claude Code com os agentes).

---

## Como começar

### Passo 1 — Crie o repositório do projeto

Este template deve ser usado uma vez por projeto. Cada cliente ou site recebe seu próprio repositório isolado.

**No GitHub, acesse o template e clique em "Use this template" → "Create a new repository".**

Dê um nome relacionado ao projeto (ex: `site-restaurante-aurora`, `loja-moda-bia`). Isso cria um repo limpo com todo o código do template, sem histórico do template original.

Depois clone o repo recém-criado:

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
npm install
```

> Não tem acesso ao GitHub Template? Clone manualmente e desconecte da origem:
> ```bash
> git clone https://github.com/seu-usuario/aios-site-builder.git nome-do-projeto
> cd nome-do-projeto
> git remote remove origin
> gh repo create nome-do-projeto --private --source=. --push
> ```

### Passo 2 — Configure o ambiente

```bash
cp deploy/shared/env.example .env
```

Edite o `.env` com suas configurações básicas (pode deixar SQLite por padrão em dev).

### Passo 3 — Inicie o Claude Code

```bash
npx claude
```

### Passo 4 — Comece pelo briefing

No chat do Claude Code, chame o primeiro agente:

```
@brief
```
A Bia vai te entrevistar e gerar o `docs/PRD.md` automaticamente a partir das suas respostas. São ~8 perguntas em linguagem natural — sem formulários, sem arquivos para editar.

> Prefere preencher manualmente? Copie `docs/PRD.template.md` para `docs/PRD.md` e edite à vontade.

### Passo 5 — Continue com os agentes

Após o PRD gerado:

**1. Arquitetura**
```
@architect
```
Lê o PRD e cria o plano técnico completo (`architecture.md`).
> Se o projeto tiver migração WordPress, o @architect vai instruir você a chamar `@migrate` antes de continuar.

**2. Design e Copy — podem rodar em paralelo (abra dois chats)**
```
@ux      → pesquisa referências, cria o sistema visual (design-system.md)
@copy    → pesquisa o mercado, cria todos os textos com foco em conversão (copy.md)
```

**3. Implementação — após @ux e @copy estarem prontos**
```
@dev
```
Lê `architecture.md` + `design-system.md` + `copy.md` e implementa tudo em 6 fases com checkpoint entre cada uma.

**4. Qualidade**
```
@qa
```
Valida código, SEO, acessibilidade e performance. Gera `qa-report.md`.

**5. Deploy**
```
@devops
```
Verifica os quality gates, faz deploy em staging para validação, depois vai para produção.

---

**A qualquer momento — iterações e correções:**
```
@revise
```
Para qualquer mudança após a implementação: visual, conteúdo, bugs, novas features, integrações.

---

## Fluxo dos agentes

```
       @brief ─────→ docs/PRD.md
          │
          ▼
     @architect ────→ docs/architecture.md
          │
     ┌────┴────┐
     ▼         ▼
   @ux        @copy
design.md   copy.md
     └────┬────┘
          ▼
        @dev ──────→ site implementado
          │
          ▼
        @qa ───────→ docs/qa-report.md
          │
          ▼
      @devops ──────→ site em produção
```

> `@ux` e `@copy` podem rodar em paralelo após o `@architect`.

Cada agente lê o output do anterior e produz o seu. Você pode intervir entre etapas se quiser ajustar algo.

---

## Quer importar um site WordPress?

Veja `migration/README.md` para o fluxo de migração.

---

## Estrutura do projeto

```
.
├── START_HERE.md              ← você está aqui
├── README.md                  ← visão geral para o GitHub
│
├── docs/
│   ├── PRD.template.md        ← template manual de requisitos
│   ├── client-guide.md        ← guia de uso do painel (entregar ao cliente)
│   ├── developer-guide.md     ← referência técnica para devs
│   │
│   │   — gerados pelos agentes —
│   ├── PRD.md                 ← gerado pelo @brief
│   ├── architecture.md        ← gerado pelo @architect
│   ├── design-system.md       ← gerado pelo @ux
│   ├── copy.md                ← gerado pelo @copy
│   ├── migration-report.md    ← gerado pelo @migrate (se WordPress)
│   └── qa-report.md           ← gerado pelo @qa
│
├── src/
│   ├── app/(frontend)/        ← rotas públicas do site
│   ├── app/(payload)/         ← admin panel e API do Payload
│   ├── blocks/                ← schemas de blocos (Payload)
│   ├── collections/           ← Pages, Posts, Media, Users, Categories
│   ├── components/
│   │   ├── blocks/            ← componentes React dos blocos (shells)
│   │   ├── layout/            ← Header, Footer
│   │   ├── marketing/         ← scripts de rastreamento
│   │   ├── seo/               ← JsonLd, Analytics
│   │   └── ui/                ← componentes reutilizáveis (criados pelo @dev)
│   ├── globals/               ← SiteSettings, Header, Footer, SEO, Marketing
│   ├── access/                ← funções de controle de acesso
│   ├── fields/                ← campos reutilizáveis (slug, link)
│   ├── hooks/                 ← hooks do Payload
│   └── lib/                   ← utilitários (payload, generateMeta, fonts)
│
├── tests/
│   └── smoke.spec.ts          ← smoke tests com Playwright
│
├── migration/
│   ├── wp-extractor/          ← scripts de extração do WordPress
│   └── importers/             ← importadores para o Payload
│
├── deploy/
│   ├── docker/                ← Dockerfile, docker-compose (dev/staging/prod)
│   ├── vercel/                ← vercel.json
│   ├── hostinger/             ← guia de setup
│   └── shared/env.example     ← todas as variáveis de ambiente
│
└── .claude/
    └── commands/agents/       ← os 9 agentes Jarbas Tech
```

---

## Dúvidas?

Abra uma issue no GitHub ou pergunte diretamente no chat do Claude Code.
