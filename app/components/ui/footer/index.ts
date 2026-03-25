import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const footerVariants = cva(
  'flex justify-center px-4 py-6 text-white',
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
        light: 'bg-theme-black',
        dark:  'bg-theme-dark/5',
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
export type FooterVariants = VariantProps<typeof footerVariants>

export interface FooterProps {
  color?: FooterVariants['color']
  mode?:  FooterVariants['mode']
  class?: string
  as?:    string
}

/* Components
--------------------------------------------------------------------- */
import Footer from './Footer.vue'

export {
  Footer as default,
  Footer,
}
