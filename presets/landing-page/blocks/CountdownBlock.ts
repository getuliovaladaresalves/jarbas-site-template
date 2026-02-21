import type { Block } from 'payload'

export const CountdownBlock: Block = {
  slug: 'countdown',
  labels: { singular: 'Countdown', plural: 'Countdowns' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'targetDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'expiredMessage', type: 'text', defaultValue: 'Oferta encerrada!' },
    { name: 'backgroundColor', type: 'text', defaultValue: '#1e40af' },
    { name: 'textColor', type: 'text', defaultValue: '#ffffff' },
  ],
}
