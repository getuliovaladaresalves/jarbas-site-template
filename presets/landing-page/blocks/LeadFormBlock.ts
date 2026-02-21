import type { Block } from 'payload'

export const LeadFormBlock: Block = {
  slug: 'leadForm',
  labels: { singular: 'Formulário de Lead', plural: 'Formulários de Lead' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'description', type: 'textarea' },
    { name: 'buttonText', type: 'text', defaultValue: 'Quero Participar' },
    { name: 'successMessage', type: 'text', defaultValue: 'Cadastro realizado com sucesso!' },
    {
      name: 'fields',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'type', type: 'select', options: ['text', 'email', 'phone', 'select'], defaultValue: 'text' },
        { name: 'required', type: 'checkbox', defaultValue: true },
        { name: 'placeholder', type: 'text' },
        { name: 'options', type: 'text', admin: { description: 'Para tipo select: opções separadas por vírgula' } },
      ],
    },
    { name: 'integrationWebhook', type: 'text', admin: { description: 'URL do webhook para enviar os dados do lead' } },
  ],
}
