import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const textVariants = cva('text-theme-dark dark:text-text', {
  variants: {
    as: {
      h1: 'text-5xl font-bold',
      h2: 'text-4xl font-bold',
      h3: 'text-3xl font-semibold',
      h4: 'text-2xl font-semibold',
      h5: 'text-xl font-semibold',
      h6: 'text-lg font-semibold',
      p:  'text-base font-normal',
    },
  },
  defaultVariants: {
    as: 'p',
  },
})

/* Types
--------------------------------------------------------------------- */
export type TextVariants = VariantProps<typeof textVariants>

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export interface TextProps {
  as?: TextAs
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Text from './Text.vue'

export {
  Text as default,
  Text
}
