import { cva, type VariantProps } from 'class-variance-authority'
import Card from './Card.vue'

/* Variants
----------------------------------------------------------------------------*/
export const cardVariants = cva(
  'rounded-lg border px-6 py-6 shadow-lg transition-colors duration-200 text-white',
  {
    variants: {
      color: {
        primary: 'bg-primary border-primary-dark',
        blue: 'bg-blue border-blue-dark',
        green: 'bg-green border-green-dark',
        purple: 'bg-purple border-purple-dark',
        red: 'bg-red border-red-dark',
      },
    },
    defaultVariants: {
      color: 'primary',
    },
  },
)

/* Types
----------------------------------------------------------------------------*/
export type CardVariants = VariantProps<typeof cardVariants>

export interface CardProps {
  tag?: keyof HTMLElementTagNameMap
  color?: CardVariants['color']
}

/* Components
----------------------------------------------------------------------------*/
export {
  Card as default
}
