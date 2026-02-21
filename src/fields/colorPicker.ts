import type { Field } from 'payload'

const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/

export interface ColorPickerOptions {
  name?: string
  label?: string
  required?: boolean
  defaultValue?: string
}

export const colorPickerField = (options: ColorPickerOptions = {}): Field => {
  const {
    name = 'color',
    label = 'Color',
    required = false,
    defaultValue = '#000000',
  } = options

  return {
    name,
    type: 'text',
    label,
    required,
    defaultValue,
    admin: {
      description: 'Enter a hex color value (e.g. #FF5733 or #F00).',
    },
    validate: (value: string | null | undefined) => {
      if (!value && !required) return true
      if (!value && required) return 'Color is required.'
      if (value && !HEX_COLOR_REGEX.test(value)) {
        return 'Invalid hex color format. Use #RGB or #RRGGBB (e.g. #FF5733).'
      }
      return true
    },
  }
}
