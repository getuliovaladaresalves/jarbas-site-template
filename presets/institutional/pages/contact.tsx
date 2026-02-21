'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const formData = new FormData(e.currentTarget)
    try {
      await fetch('/api/form-submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form: 'contact',
          submissionData: [
            { field: 'name', value: formData.get('name') },
            { field: 'email', value: formData.get('email') },
            { field: 'message', value: formData.get('message') },
          ],
        }),
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="container py-12 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">Contato</h1>

      {status === 'sent' ? (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-green-800">
          Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nome</label>
            <input id="name" name="name" type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
            <input id="email" name="email" type="email" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Mensagem</label>
            <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {status === 'sending' ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
          {status === 'error' && (
            <p className="text-red-600 text-sm">Erro ao enviar. Tente novamente.</p>
          )}
        </form>
      )}
    </div>
  )
}
