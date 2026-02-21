import type { FieldHook } from 'payload'

const format = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const formatSlug =
  (fieldToUse: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.length > 0) {
      return format(value)
    }

    if (operation === 'create' || operation === 'update') {
      const fieldValue = data?.[fieldToUse]

      if (typeof fieldValue === 'string' && fieldValue.length > 0) {
        return format(fieldValue)
      }
    }

    return value
  }
