import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const ctaBarVariants = cva(
  'w-full flex justify-center px-4 py-18 bg-theme',
  {
    variants: {
      color: {
        teal:   '',
        red:    '',
        blue:   '',
        green:  '',
        purple: '',
      },
      mode: {
        light: 'bg-theme',
        dark:  'bg-theme',
      },
    },
    defaultVariants: {
      color: 'teal',
      mode:  'light',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type CtaBarVariants = VariantProps<typeof ctaBarVariants>

export interface CtaBarProps {
  color?: CtaBarVariants['color']
  mode?:  CtaBarVariants['mode']
  class?: string
  as?:    string
}

/* Components
--------------------------------------------------------------------- */
import CtaBar from './CtaBar.vue'

export {
  CtaBar as default,
  CtaBar,
}
