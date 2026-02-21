import type {
  PaymentGateway,
  CheckoutParams,
  CheckoutResult,
  WebhookResult,
  RefundResult,
  PaymentStatus,
} from '../PaymentGateway'

interface MPPreference {
  id: string
  init_point: string
}

interface MPPayment {
  id: number
  status: string
  external_reference?: string
}

export class MercadoPagoGateway implements PaymentGateway {
  name = 'mercadopago'
  private accessToken: string
  private baseUrl = 'https://api.mercadopago.com'

  constructor() {
    this.accessToken = process.env.MERCADOPAGO_ACCESS_TOKEN!
  }

  private async fetch<T>(path: string, options?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.accessToken}`,
        ...options?.headers,
      },
    })
    return res.json() as Promise<T>
  }

  async createCheckout(params: CheckoutParams): Promise<CheckoutResult> {
    const preference = await this.fetch<MPPreference>('/checkout/preferences', {
      method: 'POST',
      body: JSON.stringify({
        items: params.items.map((item) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          currency_id: 'BRL',
          picture_url: item.imageUrl,
        })),
        payer: params.customerEmail ? { email: params.customerEmail } : undefined,
        back_urls: {
          success: params.successUrl,
          failure: params.cancelUrl,
          pending: params.successUrl,
        },
        external_reference: params.metadata?.orderId,
        auto_return: 'approved',
        payment_methods: {
          excluded_payment_types: [],
          installments: 12,
        },
      }),
    })

    return {
      id: preference.id,
      url: preference.init_point,
      provider: this.name,
    }
  }

  async handleWebhook(payload: unknown, _headers: Record<string, string>): Promise<WebhookResult> {
    const body = payload as { type?: string; data?: { id?: string } }

    if (body.type === 'payment' && body.data?.id) {
      const payment = await this.fetch<MPPayment>(`/v1/payments/${body.data.id}`)

      const statusMap: Record<string, WebhookResult['status']> = {
        approved: 'success',
        rejected: 'failed',
        pending: 'pending',
        in_process: 'pending',
      }

      return {
        event: 'payment',
        paymentId: String(payment.id),
        orderId: payment.external_reference,
        status: statusMap[payment.status] || 'pending',
      }
    }

    return { event: body.type || 'unknown', paymentId: '', status: 'pending' }
  }

  async refund(paymentId: string, amount?: number): Promise<RefundResult> {
    const result = await this.fetch<{ id: number; status: string; amount: number }>(
      `/v1/payments/${paymentId}/refunds`,
      {
        method: 'POST',
        body: JSON.stringify(amount ? { amount } : {}),
      },
    )

    return {
      id: String(result.id),
      status: result.status === 'approved' ? 'succeeded' : 'pending',
      amount: result.amount,
    }
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const payment = await this.fetch<MPPayment>(`/v1/payments/${paymentId}`)
    const statusMap: Record<string, PaymentStatus> = {
      approved: 'succeeded',
      rejected: 'failed',
      pending: 'pending',
      in_process: 'pending',
      refunded: 'refunded',
      cancelled: 'cancelled',
    }
    return statusMap[payment.status] || 'pending'
  }
}
