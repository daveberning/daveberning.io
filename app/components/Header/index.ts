import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'

/* Context
--------------------------------------------------------------------- */
interface HeaderContext {
  variant: Ref<HeaderVariants['variant']>
}

const [injectHeaderContext, provideHeaderContext] = useCreateContext<HeaderContext>('Header')

export { injectHeaderContext, provideHeaderContext }

/* Variants
--------------------------------------------------------------------- */
export const headerVariants = cva(
  'sticky top-0 z-50 flex justify-center p-2',
  {
    variants: {
      variant: {
        teal:   'border-b border-[#2a7a6f] bg-teal-600',
        red:    'border-b border-[#7a2a30] bg-red-60',
        blue:   'border-b border-[#1e3a63] bg-blue-600',
        green:  'border-b border-[#2a6035] bg-green-600',
        purple: 'border-b border-[#5e3d6b] bg-purple-600',
      },
    },
    defaultVariants: {
      variant: 'teal',
    },
  }
)

export const headerBrandVariants = cva('text-lg font-bold text-white transition-opacity hover:opacity-80 dark:text-text', {
  variants: {
    variant: {
      teal:   '',
      red:    '',
      blue:   '',
      green:  '',
      purple: '',
    },
  },
  defaultVariants: {
    variant: 'teal',
  },
})

/* Types
--------------------------------------------------------------------- */
export type HeaderVariants = VariantProps<typeof headerVariants>
export type HeaderBrandVariants = VariantProps<typeof headerBrandVariants>

export interface HeaderProps {
  variant?: HeaderVariants['variant']
  class?: string
}

export interface HeaderBrandProps {
  to?: string
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Header from './Header.vue'
import HeaderBrand from './HeaderBrand.vue'

export { Header as default, Header, HeaderBrand }
