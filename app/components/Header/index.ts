import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'

/* Context
--------------------------------------------------------------------- */
interface HeaderContext {
  variant: Ref<HeaderVariants['variant']>
}

export const [
  injectHeaderContext,
  provideHeaderContext
] = useCreateContext<HeaderContext>('Header')

/* Variants
--------------------------------------------------------------------- */
export const headerVariants = cva(
  'sticky top-0 z-50 flex justify-center p-2 border-b border-theme-dark backdrop-blur-md',
  {
    variants: {
      variant: {
        teal:   '',
        red:    '',
        blue:   '',
        green:  '',
        purple: '',
      },
      mode: {
        light: 'bg-theme/90',
        dark:  'bg-theme-dark/90',
      },
    },
    defaultVariants: {
      variant: 'teal',
      mode:    'light',
    },
  }
)

export const headerBrandVariants = cva('text-lg font-bold transition-opacity hover:opacity-80', {
  variants: {
    variant: {
      teal:   '',
      red:    '',
      blue:   '',
      green:  '',
      purple: '',
    },
    mode: {
      light: 'text-white',
      dark:  'text-text',
    },
  },
  defaultVariants: {
    variant: 'teal',
    mode:    'light',
  },
})

/* Types
--------------------------------------------------------------------- */
export type HeaderVariants = VariantProps<typeof headerVariants>

export interface HeaderProps {
  variant?: HeaderVariants['variant']
  class?: string
}

export interface HeaderBrandProps {
  to?: string
  class?: string
}

export interface HeaderHamburgerProps {
  isOpen: boolean
  class?: string
}

/* Components
--------------------------------------------------------------------- */
import Header from './Header.vue'
import HeaderBrand from './HeaderBrand.vue'
import HeaderHamburger from './HeaderHamburger.vue'

export {
  Header as default,
  HeaderBrand,
  HeaderHamburger
}
