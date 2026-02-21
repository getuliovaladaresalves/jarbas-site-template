'use client'

import { useState } from 'react'

interface CheckoutProps {
  items: Array<{ id: string; title: string; price: number; quantity: number }>
  total: number
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function Checkout({ items, total }: CheckoutProps) {
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'mercadopago'>('mercadopago')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod,
          items,
          customer: {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
          },
          shippingAddress: {
            street: formData.get('street'),
            city: formData.get('city'),
            state: formData.get('state'),
            zip: formData.get('zip'),
          },
        }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
          <div className="space-y-3">
            <input name="name" placeholder="Nome completo" required className="w-full px-4 py-2 border rounded-lg" />
            <input name="email" type="email" placeholder="E-mail" required className="w-full px-4 py-2 border rounded-lg" />
            <input name="phone" placeholder="Telefone" className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Endereço de Entrega</h2>
          <div className="space-y-3">
            <input name="street" placeholder="Rua, número" required className="w-full px-4 py-2 border rounded-lg" />
            <div className="grid grid-cols-2 gap-3">
              <input name="city" placeholder="Cidade" required className="w-full px-4 py-2 border rounded-lg" />
              <input name="state" placeholder="Estado" required className="w-full px-4 py-2 border rounded-lg" />
            </div>
            <input name="zip" placeholder="CEP" required className="w-full px-4 py-2 border rounded-lg" />
          </div>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Forma de Pagamento</h2>
          <div className="space-y-2">
            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === 'mercadopago' ? 'border-blue-500 bg-blue-50' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'mercadopago'} onChange={() => setPaymentMethod('mercadopago')} />
              <span className="font-medium">Mercado Pago</span>
              <span className="text-sm text-gray-500">(PIX, Cartão, Boleto)</span>
            </label>
            <label className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer ${paymentMethod === 'stripe' ? 'border-blue-500 bg-blue-50' : ''}`}>
              <input type="radio" name="payment" checked={paymentMethod === 'stripe'} onChange={() => setPaymentMethod('stripe')} />
              <span className="font-medium">Stripe</span>
              <span className="text-sm text-gray-500">(Cartão Internacional)</span>
            </label>
          </div>
        </section>
      </div>

      <div>
        <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
          <h2 className="text-xl font-bold mb-4">Resumo do Pedido</h2>
          <div className="space-y-3 mb-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.title} × {item.quantity}</span>
                <span>{formatBRL(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>{formatBRL(total)}</span>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Processando...' : 'Finalizar Pedido'}
          </button>
        </div>
      </div>
    </form>
  )
}
