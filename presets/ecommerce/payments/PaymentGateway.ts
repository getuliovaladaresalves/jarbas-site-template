export interface CheckoutItem {
  name: string
  price: number
  quantity: number
  imageUrl?: string
}

export interface CheckoutParams {
  items: CheckoutItem[]
  customerEmail?: string
  customerId?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
  coupon?: string
}

export interface CheckoutResult {
  id: string
  url: string
  provider: string
}

export interface WebhookResult {
  event: string
  orderId?: string
  paymentId: string
  status: 'success' | 'failed' | 'pending'
  metadata?: Record<string, string>
}

export interface RefundResult {
  id: string
  status: 'succeeded' | 'pending' | 'failed'
  amount: number
}

export type PaymentStatus = 'pending' | 'succeeded' | 'failed' | 'refunded' | 'cancelled'

export interface PaymentGateway {
  name: string
  createCheckout(params: CheckoutParams): Promise<CheckoutResult>
  handleWebhook(payload: unknown, headers: Record<string, string>): Promise<WebhookResult>
  refund(paymentId: string, amount?: number): Promise<RefundResult>
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>
}
