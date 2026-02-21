import { NextRequest, NextResponse } from 'next/server'
import { StripeGateway } from './StripeGateway'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const headers: Record<string, string> = {}
  req.headers.forEach((value, key) => {
    headers[key] = value
  })

  try {
    const gateway = new StripeGateway()
    const result = await gateway.handleWebhook(body, headers)

    if (result.status === 'success' && result.orderId) {
      // TODO: Atualizar pedido no Payload
      // const payload = await getPayload()
      // await payload.update({ collection: 'orders', id: result.orderId, data: { status: 'paid', paymentId: result.paymentId } })
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Stripe webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
