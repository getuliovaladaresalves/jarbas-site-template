import Stripe from 'stripe'
import type {
  PaymentGateway,
  CheckoutParams,
  CheckoutResult,
  WebhookResult,
  RefundResult,
  PaymentStatus,
} from '../PaymentGateway'

export class StripeGateway implements PaymentGateway {
  name = 'stripe'
  private stripe: Stripe

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: '2025-01-27.acacia',
    })
  }

  async createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    const session = await this.stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: params.customerEmail,
      line_items: params.items.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
            images: item.imageUrl ? [item.imageUrl] : [],
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      metadata: params.metadata,
    })

    return {
      id: session.id,
      url: session.url!,
      provider: this.name,
    }
  }

  async handleWebhook(payload: unknown, headers: Record<string, string>): Promise<WebhookResult> {
    const sig = headers['stripe-signature']
    const event = this.stripe.webhooks.constructEvent(
      payload as string | Buffer,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session
      return {
        event: event.type,
        paymentId: session.payment_intent as string,
        orderId: session.metadata?.orderId,
        status: 'success',
        metadata: session.metadata as Record<string, string>,
      }
    }

    return {
      event: event.type,
      paymentId: '',
      status: 'pending',
    }
  }

  async refund(paymentId: string, amount?: number): Promise<RefundResult> {
    const refund = await this.stripe.refunds.create({
      payment_intent: paymentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    })

    return {
      id: refund.id,
      status: refund.status === 'succeeded' ? 'succeeded' : 'pending',
      amount: refund.amount / 100,
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const intent = await this.stripe.paymentIntents.retrieve(paymentId)
    const statusMap: Record<string, PaymentStatus> = {
      succeeded: 'succeeded',
      canceled: 'cancelled',
      requires_payment_method: 'failed',
      processing: 'pending',
    }
    return statusMap[intent.status] || 'pending'
  }
}
