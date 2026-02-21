import { StripeGateway } from './StripeGateway'
import type { CheckoutItem } from '../PaymentGateway'

export async function createStripeCheckout(params: {
  items: CheckoutItem[]
  customerEmail?: string
  orderId: string
}) {
  const gateway = new StripeGateway()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  return gateway.createCheckout({
    items: params.items,
    customerEmail: params.customerEmail,
    successUrl: `${siteUrl}/pedido/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${siteUrl}/carrinho`,
    metadata: { orderId: params.orderId },
  })
}
