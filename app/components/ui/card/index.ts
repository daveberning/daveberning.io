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
        teal:    'bg-brand-teal border border-brand-teal-dark text-white',
        red:     'bg-brand-red border border-brand-red-dark text-white',
        blue:    'bg-brand-blue border border-brand-blue-dark text-white',
        green:   'bg-brand-green border border-brand-green-dark text-white',
        purple:  'bg-brand-purple border border-brand-purple-dark text-white',
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
      { variant: 'teal',    mode: 'dark',  class: 'bg-brand-teal-dark border-brand-teal' },
      { variant: 'red',     mode: 'dark',  class: 'bg-brand-red-dark border-brand-red' },
      { variant: 'blue',    mode: 'dark',  class: 'bg-brand-blue-dark border-brand-blue' },
      { variant: 'green',   mode: 'dark',  class: 'bg-brand-green-dark border-brand-green' },
      { variant: 'purple',  mode: 'dark',  class: 'bg-brand-purple-dark border-brand-purple' },
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
        teal:    'border-b border-brand-teal-dark',
        red:     'border-b border-brand-red-dark',
        blue:    'border-b border-brand-blue-dark',
        green:   'border-b border-brand-green-dark',
        purple:  'border-b border-brand-purple-dark',
      },
      mode: {
        light: '',
        dark:  '',
      },
    },
    compoundVariants: [
      { variant: 'teal',   mode: 'dark', class: 'border-brand-teal' },
      { variant: 'red',    mode: 'dark', class: 'border-brand-red' },
      { variant: 'blue',   mode: 'dark', class: 'border-brand-blue' },
      { variant: 'green',  mode: 'dark', class: 'border-brand-green' },
      { variant: 'purple', mode: 'dark', class: 'border-brand-purple' },
    ],
    defaultVariants: {
      variant: 'default',
      mode:    'light',
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
        teal:    'border-t border-brand-teal-dark',
        red:     'border-t border-brand-red-dark',
        blue:    'border-t border-brand-blue-dark',
        green:   'border-t border-brand-green-dark',
        purple:  'border-t border-brand-purple-dark',
      },
      mode: {
        light: '',
        dark:  '',
      },
    },
    compoundVariants: [
      { variant: 'teal',   mode: 'dark', class: 'border-brand-teal' },
      { variant: 'red',    mode: 'dark', class: 'border-brand-red' },
      { variant: 'blue',   mode: 'dark', class: 'border-brand-blue' },
      { variant: 'green',  mode: 'dark', class: 'border-brand-green' },
      { variant: 'purple', mode: 'dark', class: 'border-brand-purple' },
    ],
    defaultVariants: {
      variant: 'default',
      mode:    'light',
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
