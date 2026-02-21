import type { Field } from 'payload'

export interface LinkFieldOptions {
  name?: string
  label?: string
  required?: boolean
}

export const linkField = (options: LinkFieldOptions = {}): Field => {
  const { name = 'link', label = 'Link', required = false } = options

  return {
    name,
    type: 'group',
    label,
    fields: [
      {
        name: 'type',
        type: 'select',
        defaultValue: 'internal',
        required: true,
        options: [
          { label: 'Internal', value: 'internal' },
          { label: 'External', value: 'external' },
          { label: 'Custom', value: 'custom' },
        ],
      },
      {
        name: 'reference',
        type: 'relationship',
        relationTo: ['pages', 'posts'],
        required,
        admin: {
          condition: (_data, siblingData) => siblingData?.type === 'internal',
        },
      },
      {
        name: 'url',
        type: 'text',
        required,
        admin: {
          condition: (_data, siblingData) =>
            siblingData?.type === 'external' || siblingData?.type === 'custom',
        },
        validate: (value: string | null | undefined, { siblingData }: { siblingData: Record<string, unknown> }) => {
          if (siblingData?.type === 'external' && value && !value.startsWith('http')) {
            return 'External URLs must start with http:// or https://'
          }
          return true
        },
      },
      {
        name: 'label',
        type: 'text',
        required,
      },
      {
        name: 'newTab',
        type: 'checkbox',
        label: 'Open in new tab',
        defaultValue: false,
      },
    ],
  }
}
