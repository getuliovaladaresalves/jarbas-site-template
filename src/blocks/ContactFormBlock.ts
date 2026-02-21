import type { Block } from 'payload'

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  labels: {
    singular: 'Formulário de Contato',
    plural: 'Formulários de Contato',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Título',
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Descrição',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
      label: 'E-mail de Destino',
      admin: {
        description: 'E-mail que receberá as mensagens do formulário',
      },
    },
    {
      name: 'fields',
      type: 'array',
      required: true,
      minRows: 1,
      label: 'Campos',
      labels: {
        singular: 'Campo',
        plural: 'Campos',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Nome do Campo',
        },
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'text',
          label: 'Tipo',
          options: [
            { label: 'Texto', value: 'text' },
            { label: 'E-mail', value: 'email' },
            { label: 'Área de Texto', value: 'textarea' },
            { label: 'Telefone', value: 'phone' },
          ],
        },
        {
          name: 'required',
          type: 'checkbox',
          label: 'Obrigatório',
          defaultValue: false,
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder',
        },
      ],
    },
    {
      name: 'submitLabel',
      type: 'text',
      defaultValue: 'Enviar',
      label: 'Texto do Botão de Envio',
    },
  ],
}
