# Checklist de Migração WordPress → Next.js + Payload CMS

## Pré-Migração

- [ ] Backup completo do WordPress (DB + arquivos)
- [ ] Documentar URLs atuais (todas as páginas e posts)
- [ ] Identificar plugins ativos e suas funcionalidades
- [ ] Configurar ambiente Next.js + Payload local
- [ ] Configurar `.env` com `WP_URL` e `DATABASE_URI`

## Extração de Dados

- [ ] Executar `extract-posts.ts` — verificar posts.json
- [ ] Executar `extract-pages.ts` — verificar pages.json
- [ ] Executar `extract-media.ts` — verificar downloads
- [ ] Executar `extract-menus.ts` — verificar menus.json
- [ ] Executar `extract-seo.ts` — verificar seo.json
- [ ] Executar `extract-redirects.ts` — verificar redirects.json

## Importação

- [ ] Executar `import-media.ts` (PRIMEIRO)
- [ ] Executar `import-posts.ts`
- [ ] Executar `import-pages.ts`
- [ ] Executar `url-mapper.ts`
- [ ] Executar `import-redirects.ts`

## Reconstrução Visual

- [ ] Configurar SiteSettings (nome, logo, cores)
- [ ] Configurar Header (menu de navegação)
- [ ] Configurar Footer (links, redes sociais)
- [ ] Reconstruir home page com blocos
- [ ] Reconstruir páginas internas com blocos
- [ ] Verificar formatação de posts importados

## SEO

- [ ] Configurar Google Analytics ID
- [ ] Configurar Google Search Console
- [ ] Verificar meta tags de todas as páginas
- [ ] Verificar sitemap.xml
- [ ] Verificar robots.txt
- [ ] Testar Schema.org/JSON-LD
- [ ] Verificar canonical URLs
- [ ] Testar todos os redirects 301

## Marketing

- [ ] Configurar Meta Pixel (se aplicável)
- [ ] Configurar Google Ads (se aplicável)
- [ ] Configurar GTM (se aplicável)
- [ ] Testar ConsentBanner (LGPD)
- [ ] Verificar eventos de conversão

## Pré-Launch

- [ ] Testar em dispositivos móveis
- [ ] Testar Core Web Vitals (LCP, CLS, FID)
- [ ] Testar acessibilidade (WCAG AA)
- [ ] Testar formulários
- [ ] Testar links internos e externos
- [ ] Testar imagens (loading, alt text)
- [ ] Build sem erros (`npm run build`)

## Go Live

- [ ] Deploy para produção
- [ ] Apontar DNS para novo servidor
- [ ] Verificar SSL/HTTPS
- [ ] Monitorar redirects 301 por 48h
- [ ] Submeter novo sitemap ao Google Search Console
- [ ] Monitorar erros de rastreamento no GSC
- [ ] Monitorar Core Web Vitals por 1 semana
