# Deploy na Hostinger (Node.js)

## Pré-requisitos

- Plano Hostinger com suporte a Node.js (Business ou superior)
- Acesso ao painel hPanel
- Token de API da Hostinger

## Passos

### 1. Configurar Node.js no hPanel

1. Acesse hPanel > Avançado > Node.js
2. Selecione Node.js versão 20.x
3. Defina o diretório raiz: `/`
4. Defina o arquivo de entrada: `server.js`

### 2. Variáveis de Ambiente

No hPanel, configure as variáveis:
- `DATABASE_URI` — String de conexão PostgreSQL
- `PAYLOAD_SECRET` — Secret aleatório (min 32 chars)
- `NEXT_PUBLIC_SITE_URL` — URL do site (ex: https://seusite.com.br)
- `NODE_ENV` — `production`

### 3. Deploy via Claude Code + MCP

Com o MCP Hostinger configurado:
```
@devops *deploy hostinger
```

### 4. Deploy Manual

```bash
npm run build
# Transferir arquivos para o servidor via SFTP/SSH
# Reiniciar aplicação no hPanel
```

## Banco de Dados

- Use PostgreSQL da própria Hostinger ou externo (Supabase, Neon, etc.)
- Para MongoDB, use MongoDB Atlas
