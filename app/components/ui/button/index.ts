import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      color: {
        teal: '',
        purple: '',
        red: '',
        green: '',
        blue: '',
      },
      variant: {
        solid: '',
        outline: 'border-2 bg-transparent',
        text: 'bg-transparent',
      },
      size: {
        small: 'h-8 px-3 text-xs',
        regular: 'h-10 px-4 text-sm',
        large: 'h-12 px-6 text-base',
      },
      radius: {
        small: 'rounded-sm',
        regular: 'rounded-md',
        full: 'rounded-full',
        none: 'rounded-none',
      },
    },
    compoundVariants: [
      /* Solid ---------------------------------------------------------- */
      { variant: 'solid', color: 'teal',   class: 'bg-teal-600   text-white hover:bg-teal-500   active:bg-teal-700   focus-visible:ring-teal-400' },
      { variant: 'solid', color: 'purple', class: 'bg-purple-600 text-white hover:bg-purple-500 active:bg-purple-700 focus-visible:ring-purple-400' },
      { variant: 'solid', color: 'red',    class: 'bg-red-600    text-white hover:bg-red-500    active:bg-red-700    focus-visible:ring-red-400' },
      { variant: 'solid', color: 'green',  class: 'bg-green-600  text-white hover:bg-green-500  active:bg-green-700  focus-visible:ring-green-400' },
      { variant: 'solid', color: 'blue',   class: 'bg-blue-700   text-white hover:bg-blue-600   active:bg-blue-800   focus-visible:ring-blue-500' },

      /* Outline -------------------------------------------------------- */
      { variant: 'outline', color: 'teal',   class: 'border-teal-600   text-teal-600   hover:bg-teal-50   dark:hover:bg-teal-900/30   active:bg-teal-100   dark:active:bg-teal-900/50   focus-visible:ring-teal-400' },
      { variant: 'outline', color: 'purple', class: 'border-purple-600 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/30 active:bg-purple-100 dark:active:bg-purple-900/50 focus-visible:ring-purple-400' },
      { variant: 'outline', color: 'red',    class: 'border-red-600    text-red-600    hover:bg-red-50    dark:hover:bg-red-900/30    active:bg-red-100    dark:active:bg-red-900/50    focus-visible:ring-red-400' },
      { variant: 'outline', color: 'green',  class: 'border-green-600  text-green-600  hover:bg-green-50  dark:hover:bg-green-900/30  active:bg-green-100  dark:active:bg-green-900/50  focus-visible:ring-green-400' },
      { variant: 'outline', color: 'blue',   class: 'border-blue-700   text-blue-700   hover:bg-blue-50   dark:hover:bg-blue-900/30   active:bg-blue-100  dark:active:bg-blue-900/50   focus-visible:ring-blue-500' },

      /* Text ----------------------------------------------------------- */
      { variant: 'text', color: 'teal',   class: 'text-teal-600   hover:bg-teal-50/80   dark:hover:bg-teal-900/30   active:bg-teal-100/80   dark:active:bg-teal-900/50   focus-visible:ring-teal-400' },
      { variant: 'text', color: 'purple', class: 'text-purple-600 hover:bg-purple-50/80 dark:hover:bg-purple-900/30 active:bg-purple-100/80 dark:active:bg-purple-900/50 focus-visible:ring-purple-400' },
      { variant: 'text', color: 'red',    class: 'text-red-600    hover:bg-red-50/80    dark:hover:bg-red-900/30    active:bg-red-100/80    dark:active:bg-red-900/50    focus-visible:ring-red-400' },
      { variant: 'text', color: 'green',  class: 'text-green-600  hover:bg-green-50/80  dark:hover:bg-green-900/30  active:bg-green-100/80  dark:active:bg-green-900/50  focus-visible:ring-green-400' },
      { variant: 'text', color: 'blue',   class: 'text-blue-700   hover:bg-blue-50/80   dark:hover:bg-blue-900/30   active:bg-blue-100/80   dark:active:bg-blue-900/50   focus-visible:ring-blue-500' },
    ],
    defaultVariants: {
      color: 'teal',
      variant: 'solid',
      size: 'regular',
      radius: 'regular',
    },
  },
)

/* Types
--------------------------------------------------------------------- */
export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps {
  color?: ButtonVariants['color']
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  radius?: ButtonVariants['radius']
  class?: string
  as?: string
}

/* Components
--------------------------------------------------------------------- */
import Button from './Button.vue'

export { Button as default, Button }
