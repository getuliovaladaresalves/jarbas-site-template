import { MercadoPagoGateway } from './MercadoPagoGateway'
import type { CheckoutItem } from '../PaymentGateway'

export async function createMercadoPagoCheckout(params: {
  items: CheckoutItem[]
  customerEmail?: string
  orderId: string
}) {
  const gateway = new MercadoPagoGateway()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return gateway.createCheckout({
    items: params.items,
    customerEmail: params.customerEmail,
    successUrl: `${siteUrl}/pedido/sucesso?provider=mercadopago`,
    cancelUrl: `${siteUrl}/carrinho`,
    metadata: { orderId: params.orderId },
  })
}
