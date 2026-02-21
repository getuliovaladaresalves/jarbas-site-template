import { NextRequest, NextResponse } from 'next/server'
import { MercadoPagoGateway } from './MercadoPagoGateway'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const headers: Record<string, string> = {}
    req.headers.forEach((value, key) => {
      headers[key] = value
    })

    const gateway = new MercadoPagoGateway()
    const result = await gateway.handleWebhook(body, headers)

    if (result.status === 'success' && result.orderId) {
      // TODO: Atualizar pedido no Payload
      // const payload = await getPayload()
      // await payload.update({ collection: 'orders', id: result.orderId, data: { status: 'paid', paymentId: result.paymentId, paymentMethod: 'mercadopago' } })
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('MercadoPago webhook error:', err)
    return NextResponse.json({ error: 'Webhook error' }, { status: 400 })
  }
}
