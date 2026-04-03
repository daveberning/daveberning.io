import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Card from './Card.vue'
import CardContent from './CardContent.vue'

/* Context
--------------------------------------------------------------------- */
interface CardContext {
  variant: Ref<CardVariants['variant']>
  color:   Ref<CardVariants['color']>
}

const [injectCardContext, provideCardContext] = useCreateContext<CardContext>('Card')

export { injectCardContext, provideCardContext }

/* Variants
--------------------------------------------------------------------- */
export const cardVariants = cva(
  'rounded-lg overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme',
  {
    variants: {
      variant: {
        solid:   'bg-background border border-border text-text',
        outline: '!bg-transparent border-2 border-border text-text',
      },
      color: {
        teal:   'bg-brand-teal border border-brand-teal-dark text-brand-teal-text dark:bg-brand-teal-dark dark:border-brand-teal',
        red:    'bg-brand-red border border-brand-red-dark text-brand-red-text dark:bg-brand-red-dark dark:border-brand-red',
        blue:   'bg-brand-blue border border-brand-blue-dark text-brand-blue-text dark:bg-brand-blue-dark dark:border-brand-blue',
        green:  'bg-brand-green border border-brand-green-dark text-brand-green-text dark:bg-brand-green-dark dark:border-brand-green',
        purple: 'bg-brand-purple border border-brand-purple-dark text-brand-purple-text dark:bg-brand-purple-dark dark:border-brand-purple',
      },
    },
    defaultVariants: {
      variant: 'solid',
    },
  },
)

export const cardContentVariants = cva('px-6 py-4')

/* Types
--------------------------------------------------------------------- */
export type CardVariants = VariantProps<typeof cardVariants>

export interface CardProps {
  variant?: CardVariants['variant']
  color?:   CardVariants['color']
  class?:   string
  as?:      string
}

export interface CardContentProps {
  class?: string
  as?:    string
}

/* Components
--------------------------------------------------------------------- */
export {
  Card as default,
  CardContent,
}
