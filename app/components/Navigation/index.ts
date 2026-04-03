import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Navigation from './Navigation.vue'
import NavigationItem from './NavigationItem.vue'

/* Context
--------------------------------------------------------------------- */
interface NavigationContext {
  variant: Ref<'text' | 'outline' | 'solid' | undefined>
  darkVariant: Ref<'text' | 'outline'>
  color: Ref<'white' | 'theme' | undefined>
  darkColor: Ref<'white' | 'theme' | undefined>
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
  variant?: 'text' | 'outline' | 'solid'
  darkVariant?: 'text' | 'outline'
  color?: 'white' | 'theme'
  darkColor?: 'white' | 'theme'
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
