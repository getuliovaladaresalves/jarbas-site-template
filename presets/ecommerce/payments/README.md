# Como Adicionar um Novo Gateway de Pagamento

Este template usa uma interface abstrata (`PaymentGateway`) que permite adicionar novos gateways de forma padronizada.

## Passo 1: Criar a implementação

Crie uma pasta `payments/seu-gateway/` com o arquivo principal:

```typescript
import type { PaymentGateway, CheckoutParams, CheckoutResult, WebhookResult, RefundResult, PaymentStatus } from '../PaymentGateway'

export class SeuGateway implements PaymentGateway {
  name = 'seu-gateway'

  async createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    // Implementar criação de checkout
  }

  async handleWebhook(payload: unknown, headers: Record<string, string>): Promise<WebhookResult> {
    // Implementar processamento de webhook
  }

  async refund(paymentId: string, amount?: number): Promise<RefundResult> {
    // Implementar estorno
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    // Implementar consulta de status
  }
}
```

## Passo 2: Criar o handler de webhook

Crie `payments/seu-gateway/webhooks.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { SeuGateway } from './SeuGateway'

export async function POST(req: NextRequest) {
  const gateway = new SeuGateway()
  const result = await gateway.handleWebhook(await req.json(), Object.fromEntries(req.headers))
  // Atualizar pedido no Payload se result.status === 'success'
  return NextResponse.json({ received: true })
}
```

## Passo 3: Criar a rota no Next.js

Crie `src/app/api/webhooks/seu-gateway/route.ts` importando o handler.

## Passo 4: Adicionar variáveis de ambiente

Adicione as chaves no `.env`:
```
SEU_GATEWAY_SECRET_KEY=...
SEU_GATEWAY_WEBHOOK_SECRET=...
```

## Passo 5: Registrar no checkout

Adicione o gateway como opção no componente `Checkout.tsx`.
