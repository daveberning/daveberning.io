import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Pill from './Pill.vue'

/* Variants
--------------------------------------------------------------------- */
export const pillVariants = cva(
  'inline-flex items-center rounded-full font-medium',
  {
    variants: {
      variant: {
        solid:   '',
        outline: 'border',
      },
      color: {
        teal:   '',
        red:    '',
        blue:   '',
        green:  '',
        purple: '',
        white:  '',
      },
      size: {
        small:   'text-xs px-2 py-0.5',
        regular: 'text-sm px-2.5 py-1',
        large:   'text-base px-3 py-1.5',
      },
    },
    compoundVariants: [
      /* solid */
      { variant: 'solid', color: 'teal',   class: 'bg-brand-teal text-brand-teal-text' },
      { variant: 'solid', color: 'red',    class: 'bg-brand-red text-brand-red-text' },
      { variant: 'solid', color: 'blue',   class: 'bg-brand-blue text-brand-blue-text' },
      { variant: 'solid', color: 'green',  class: 'bg-brand-green text-brand-green-text' },
      { variant: 'solid', color: 'purple', class: 'bg-brand-purple text-brand-purple-text' },
      { variant: 'solid', color: 'white',  class: 'bg-white text-black' },
      /* outline */
      { variant: 'outline', color: 'teal',   class: 'border-brand-teal text-brand-teal' },
      { variant: 'outline', color: 'red',    class: 'border-brand-red text-brand-red' },
      { variant: 'outline', color: 'blue',   class: 'border-brand-blue text-brand-blue' },
      { variant: 'outline', color: 'green',  class: 'border-brand-green text-brand-green' },
      { variant: 'outline', color: 'purple', class: 'border-brand-purple text-brand-purple' },
      { variant: 'outline', color: 'white',  class: 'border-white text-white' },
    ],
    defaultVariants: {
      variant: 'outline',
      color:   'teal',
      size:    'regular',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type PillVariants = VariantProps<typeof pillVariants>

export interface PillProps {
  variant?: PillVariants['variant']
  color?:   PillVariants['color']
  size?:    PillVariants['size']
  class?:   string
  as?:      string
}

/* Components
--------------------------------------------------------------------- */
export {
  Pill as default,
}
