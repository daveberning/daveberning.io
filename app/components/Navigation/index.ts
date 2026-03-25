import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Navigation from './Navigation.vue'
import NavigationItem from './NavigationItem.vue'

/* Context
--------------------------------------------------------------------- */
interface NavigationContext {
  darkVariant: Ref<'text' | 'outline'>
}

export const [
  injectNavigationContext,
  provideNavigationContext
] = useCreateContext<NavigationContext>('Navigation')

/* Variants
--------------------------------------------------------------------- */
export const navigationVariants = cva('flex items-center gap-2')

/* Types
--------------------------------------------------------------------- */
export interface NavigationProps {
  darkVariant?: 'text' | 'outline'
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
  NavigationItem
}
