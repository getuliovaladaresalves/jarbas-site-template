'use client'

import { useState } from 'react'
import Image from 'next/image'

interface CartItem {
  id: string
  title: string
  price: number
  quantity: number
  image?: { url?: string; alt?: string } | null
}

function formatBRL(value: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
}

export function Cart() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  function updateQuantity(id: string, delta: number) {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="relative p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-xl">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-lg font-bold">Carrinho ({itemCount})</h2>
              <button onClick={() => setIsOpen(false)} className="p-1">✕</button>
            </div>

            {items.length === 0 ? (
              <p className="p-8 text-center text-gray-500">Seu carrinho está vazio.</p>
            ) : (
              <>
                <div className="p-4 space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      {item.image?.url && (
                        <Image src={item.image.url} alt={item.image.alt || item.title} width={64} height={64} className="rounded object-cover" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-sm text-gray-600">{formatBRL(item.price)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 border rounded text-sm">−</button>
                          <span className="text-sm">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 border rounded text-sm">+</button>
                          <button onClick={() => removeItem(item.id)} className="ml-auto text-red-500 text-xs">Remover</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">{formatBRL(total)}</span>
                  </div>
                  <a href="/checkout" className="block w-full text-center py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    Finalizar Compra
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
