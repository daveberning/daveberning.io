import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardContent from './CardContent.vue'
import CardFooter from './CardFooter.vue'

/* Context
--------------------------------------------------------------------- */
interface CardContext {
  variant: Ref<CardVariants['variant']>
  mode:    Ref<'light' | 'dark'>
}

const [injectCardContext, provideCardContext] = useCreateContext<CardContext>('Card')

export { injectCardContext, provideCardContext }

/* Variants
--------------------------------------------------------------------- */
export const cardVariants = cva(
  'rounded-lg overflow-hidden',
  {
    variants: {
      variant: {
        default: 'border border-border text-text',
        raised:  'border border-border text-text shadow-sm',
        outline: 'bg-transparent border-2 border-border text-text',
        theme:   'bg-theme border border-theme-dark text-white',
      },
      mode: {
        light: '',
        dark:  '',
      },
    },
    compoundVariants: [
      { variant: 'default', mode: 'light', class: 'bg-white' },
      { variant: 'default', mode: 'dark',  class: 'bg-surface' },
      { variant: 'raised',  mode: 'light', class: 'bg-white' },
      { variant: 'raised',  mode: 'dark',  class: 'bg-surface-raised' },
    ],
    defaultVariants: {
      variant: 'default',
      mode:    'light',
    },
  },
)

export const cardHeaderVariants = cva(
  'px-6 py-4',
  {
    variants: {
      variant: {
        default: 'border-b border-border',
        raised:  'border-b border-border',
        outline: 'border-b border-border',
        theme:   'border-b border-theme-dark',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export const cardContentVariants = cva('px-6 py-4')

export const cardFooterVariants = cva(
  'px-6 py-4',
  {
    variants: {
      variant: {
        default: 'border-t border-border',
        raised:  'border-t border-border',
        outline: 'border-t border-border',
        theme:   'border-t border-theme-dark',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type CardVariants = VariantProps<typeof cardVariants>

export interface CardProps {
  variant?: CardVariants['variant']
  class?: string
  as?: string
}

export interface CardHeaderProps {
  class?: string
}

export interface CardContentProps {
  class?: string
}

export interface CardFooterProps {
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Card as default,
  Card,
  CardHeader,
  CardContent,
  CardFooter
}
