import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const linkVariants = cva(
  'inline-flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2 cursor-pointer',
  {
    variants: {
      variant: {
        solid:   'bg-theme text-theme-fg hover:bg-theme-dark active:bg-theme-darker',
        outline: 'border-2 bg-transparent border-theme text-theme hover:bg-theme-light/50 dark:border-white dark:text-white',
        text:    'bg-transparent hover:underline text-theme dark:text-white',
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
    },
    defaultVariants: {
      variant: 'text',
      size:    'regular',
      radius:  'regular',
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

export {
  Link as default,
}
