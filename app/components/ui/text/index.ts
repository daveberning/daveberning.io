import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const textVariants = cva('', {
  variants: {
    as: {
      h1: 'text-5xl font-black',
      h2: 'text-4xl font-black',
      h3: 'text-3xl font-bold',
      h4: 'text-2xl font-bold',
      h5: 'text-xl font-bold',
      h6: 'text-lg font-bold',
      p:  'text-base font-normal',
    },
    mode: {
      light: 'text-theme-black',
      dark:  'text-text',
    },
  },
  defaultVariants: {
    as:   'p',
    mode: 'light',
  },
})

/* Types
--------------------------------------------------------------------- */
export type TextVariants = VariantProps<typeof textVariants>

export type TextAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p'

export interface TextProps {
  as?: TextAs
}

/* Components
--------------------------------------------------------------------- */
import Text from './Text.vue'

export {
  Text as default,
  Text
}
