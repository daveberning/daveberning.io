import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Text from './Text.vue'

/* Variants
--------------------------------------------------------------------- */
export const textVariants = cva('', {
  variants: {
    as: {
      h1: 'text-5xl font-black leading-tight tracking-tight',
      h2: 'text-4xl font-black leading-tight tracking-tight',
      h3: 'text-3xl font-bold leading-snug tracking-tight',
      h4: 'text-2xl font-bold leading-snug tracking-tight',
      h5: 'text-xl font-bold leading-normal',
      h6: 'text-lg font-bold leading-normal',
      p:  'text-base font-normal',
    },
    color: {
      default: '',       // resolved via compound variants + mode
      inherit: 'text-inherit',
      white:   'text-white',
      muted:   'text-text-muted',
      theme:   'text-theme',
      teal:    'text-brand-teal',
      red:     'text-brand-red',
      blue:    'text-brand-blue',
      green:   'text-brand-green',
      purple:  'text-brand-purple',
    },
    mode: {
      light: '',
      dark:  '',
    },
  },
  compoundVariants: [
    { color: 'default', mode: 'light', class: 'text-theme-black' },
    { color: 'default', mode: 'dark',  class: 'text-text' },
  ],
  defaultVariants: {
    as:    'p',
    color: 'default',
    mode:  'light',
  },
})

/* Types
--------------------------------------------------------------------- */
export type TextVariants = VariantProps<typeof textVariants>

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export interface TextProps {
  as?:    TextAs
  color?: TextVariants['color']
}

/* Components
--------------------------------------------------------------------- */
export {
  Text as default,
}
