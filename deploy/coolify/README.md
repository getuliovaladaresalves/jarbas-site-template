# Deploy no Coolify / Hetzner

Deploy padrão deste template. O Coolify gerencia o app e o banco separadamente via Docker.

**Painel:** https://dev.jarbastech.com/

---

## 1. Crie o banco PostgreSQL no Coolify

No painel: Novo Recurso → PostgreSQL → preencha nome e senha.

Anote a connection string interna gerada pelo Coolify:
```
postgresql://usuario:senha@host-interno:5432/nome_banco
```

Via API:
```bash
curl -X POST https://dev.jarbastech.com/api/v1/databases \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "standalone-postgresql",
    "name": "nome-do-projeto-db",
    "server_uuid": "UUID_DO_SERVIDOR"
  }'
```

---

## 2. Crie a aplicação no Coolify

No painel: Novo Recurso → Application → GitHub → selecione o repositório.

Configurações obrigatórias:
- **Build Pack:** Dockerfile
- **Dockerfile path:** `deploy/docker/Dockerfile`
- **Build context:** `/` (raiz do repositório)
- **Porta exposta:** `3000`
- **Branch:** `main`

---

## 3. Configure as variáveis de ambiente

No painel da aplicação → Environment Variables:

```env
DATABASE_URI=postgresql://usuario:senha@host-interno:5432/nome_banco
PAYLOAD_SECRET=GERE_COM_openssl_rand_-base64_32
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com.br
NODE_ENV=production
```

Gere o `PAYLOAD_SECRET`:
```bash
openssl rand -base64 32
```

---

## 4. Configure o domínio

No painel da aplicação → Domains:
- Adicione seu domínio ou subdomínio
- Coolify configura HTTPS automaticamente via Let's Encrypt

---

## 5. Execute o primeiro deploy

No painel: clique em **Deploy**.

O Payload roda as migrações do banco automaticamente no primeiro start.
Acompanhe os logs no painel para confirmar.

---

## 6. Primeiro acesso ao admin

Após o deploy:
1. Acesse `https://seu-dominio.com.br/admin`
2. Crie o primeiro usuário administrador
3. Configure SiteSettings (nome, logo, cores)
4. Configure SEOSettings (Google Analytics, GTM)
5. Configure MarketingSettings (Meta Pixel, etc.)

---

## 7. Auto-deploy via webhook

Para re-deploy automático a cada `git push` para `main`:

**No Coolify:** Application → Webhooks → copie a URL do webhook.

**No GitHub:** Settings → Secrets → Actions → adicione:
- `COOLIFY_WEBHOOK_URL` — URL copiada do Coolify

**Crie `.github/workflows/deploy.yml`:**
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Coolify deploy
        run: |
          curl --silent --show-error \
            -X GET "${{ secrets.COOLIFY_WEBHOOK_URL }}"
```

---

## 8. Staging

**Opção A — Segundo app no Coolify:**
Crie uma segunda aplicação apontando para a branch `staging`.
Use um subdomínio: `staging.seu-dominio.com.br`.

**Opção B — Docker local:**
```bash
docker compose -f deploy/docker/docker-compose.staging.yml up -d --build
```
Acesse em `http://localhost:3001`.

---

## Referência rápida — Coolify API

```bash
# Listar aplicações
curl https://dev.jarbastech.com/api/v1/applications \
  -H "Authorization: Bearer SEU_TOKEN"

# Listar bancos
curl https://dev.jarbastech.com/api/v1/databases \
  -H "Authorization: Bearer SEU_TOKEN"

# Disparar deploy manual
curl -X GET "WEBHOOK_URL_DA_APLICACAO"
```

Token da API disponível no CLAUDE.md global (`~/.claude/CLAUDE.md`).
