import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        solid:   'bg-theme text-theme-fg hover:bg-theme-dark hover:outline-2 hover:outline-offset-2',
        outline: 'border-2 bg-transparent hover:outline-2 hover:outline-offset-2',
        text:    'bg-transparent hover:underline',
      },
      size: {
        small:   'h-8 px-3 text-xs',
        regular: 'h-10 px-4 text-sm',
        large:   'h-12 px-6 text-base',
      },
      radius: {
        small:   'rounded-sm',
        regular: 'rounded-md',
        full:    'rounded-full',
        none:    'rounded-none',
      },
      mode: {
        light: '',
        dark:  '',
      },
    },
    compoundVariants: [
      { variant: 'solid',   mode: 'light', class: 'hover:outline-theme' },
      { variant: 'solid',   mode: 'dark',  class: 'hover:outline-white' },
      { variant: 'outline', mode: 'light', class: 'border-theme text-theme hover:outline-theme' },
      { variant: 'outline', mode: 'dark',  class: 'border-white text-white hover:outline-white' },
      { variant: 'text',    mode: 'light', class: 'text-theme' },
      { variant: 'text',    mode: 'dark',  class: 'text-white' },
    ],
    defaultVariants: {
      variant: 'text',
      size:    'regular',
      radius:  'regular',
      mode:    'light',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type LinkVariants = VariantProps<typeof linkVariants>

export interface LinkProps {
  variant?: LinkVariants['variant']
  size?: LinkVariants['size']
  radius?: LinkVariants['radius']
  to?: string | Record<string, unknown>
  href?: string
  class?: string
  as?: string
}

/* Components
--------------------------------------------------------------------- */
import Link from './Link.vue'

export { Link as default, Link }
