# Checklist — Pré-Lançamento

## Funcionalidade
- [ ] Todas as páginas renderizam corretamente
- [ ] Navegação funciona (menu, links internos)
- [ ] Formulários enviam e recebem dados
- [ ] Imagens carregam corretamente
- [ ] Vídeos e embeds funcionam
- [ ] Blog funciona (listagem, post individual)
- [ ] Admin panel funciona em produção
- [ ] Upload de mídia funciona em produção

## SEO
- [ ] Meta tags em todas as páginas (title, description)
- [ ] Open Graph tags (og:title, og:image, etc.)
- [ ] sitemap.xml acessível e correto
- [ ] robots.txt configurado
- [ ] Canonical URLs corretos
- [ ] JSON-LD/Schema.org implementado
- [ ] Redirects 301 configurados (se migração)

## Performance
- [ ] LCP < 2.5 segundos
- [ ] CLS < 0.1
- [ ] FID < 100ms
- [ ] Imagens otimizadas (WebP/AVIF)
- [ ] Lazy loading de imagens
- [ ] Minificação de CSS/JS (via build)

## Acessibilidade
- [ ] Alt text em todas as imagens
- [ ] Contraste de cores adequado
- [ ] Navegação por teclado funciona
- [ ] ARIA labels onde necessário
- [ ] Hierarquia de headings (h1 → h2 → h3)

## Segurança
- [ ] HTTPS habilitado
- [ ] Headers de segurança configurados
- [ ] Variáveis sensíveis não expostas
- [ ] Autenticação do admin funciona
- [ ] Rate limiting na API

## Marketing
- [ ] Google Analytics configurado e rastreando
- [ ] Pixels de conversão configurados
- [ ] Consent banner (LGPD) funcionando
- [ ] Eventos de conversão testados

## Infraestrutura
- [ ] Backup de banco de dados configurado
- [ ] Monitoramento de erros (opcional)
- [ ] DNS configurado corretamente
- [ ] SSL/TLS válido
- [ ] Domínio apontando para o servidor correto
