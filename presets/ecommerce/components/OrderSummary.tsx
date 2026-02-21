interface OrderItem {
  title: string
  quantity: number
  price: number
}

interface OrderSummaryProps {
  items: OrderItem[]
  subtotal: number
  shipping?: number
  discount?: number
  total: number
  status?: string
  orderNumber?: string
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

const statusLabels: Record<string, string> = {
  pending: 'Pendente',
  paid: 'Pago',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
}

export function OrderSummary({ items, subtotal, shipping = 0, discount = 0, total, status, orderNumber }: OrderSummaryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      {orderNumber && (
        <div className="mb-4">
          <span className="text-sm text-gray-500">Pedido</span>
          <span className="ml-2 font-mono font-bold">{orderNumber}</span>
          {status && (
            <span className="ml-3 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
              {statusLabels[status] || status}
            </span>
          )}
        </div>
      )}

      <div className="space-y-3 mb-4">
        {items.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span>{item.title} × {item.quantity}</span>
            <span>{formatBRL(item.price * item.quantity)}</span>
          </div>
        ))}
      </div>

      <div className="border-t pt-3 space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>{formatBRL(subtotal)}</span>
        </div>
        {shipping > 0 && (
          <div className="flex justify-between">
            <span>Frete</span>
            <span>{formatBRL(shipping)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Desconto</span>
            <span>-{formatBRL(discount)}</span>
          </div>
        )}
      </div>

      <div className="border-t mt-3 pt-3 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{formatBRL(total)}</span>
      </div>
    </div>
  )
}
