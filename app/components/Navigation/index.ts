import { cva } from 'class-variance-authority'
import Navigation from './Navigation.vue'
import NavigationItem from './NavigationItem.vue'

/* Variants
--------------------------------------------------------------------- */
export const navigationVariants = cva('flex items-center gap-2')

/* Types
--------------------------------------------------------------------- */
export interface NavigationProps {
  class?: string
}

export interface NavigationItemProps {
  to: string
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Navigation as default,
  Navigation,
  NavigationItem
}
