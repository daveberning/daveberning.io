import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Navigation from './Navigation.vue'
import NavigationItem from './NavigationItem.vue'

/* Variants
--------------------------------------------------------------------- */
export const navigationVariants = cva('flex items-center gap-2')

export const navigationItemVariants = cva('', {
  variants: {
    variant: {
      solid:   'dark:bg-transparent dark:border-2 dark:border-white dark:text-white',
      outline: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
  },
})

/* Types
--------------------------------------------------------------------- */
export type NavigationItemVariants = VariantProps<typeof navigationItemVariants>

export interface NavigationProps {
  class?: string
}

export interface NavigationItemProps {
  to: string
  variant?: NavigationItemVariants['variant']
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Navigation as default,
  Navigation,
  NavigationItem
}
