import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'

/* Variants
--------------------------------------------------------------------- */
export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 font-medium transition-colors hover:ring-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      color: {
        teal:   '',
        purple: '',
        red:    '',
        green:  '',
        blue:   '',
      },
      variant: {
        solid:   '',
        outline: 'border-2 bg-transparent',
        text:    'bg-transparent',
      },
      size: {
        small:   'h-8 px-3 text-xs',
        regular: 'h-10 px-4 text-sm',
        large:   'h-12 px-6 text-base',
      },
      radius: {
        small:   'rounded-sm',
        regular: 'rounded-md',
        full:    'rounded-full',
        none:    'rounded-none',
      },
      mode: {
        light: '',
        dark:  '',
      },
    },
    compoundVariants: [
      /* Solid ---------------------------------------------------------- */
      { variant: 'solid', color: 'teal',   class: 'bg-teal-600   text-white hover:bg-teal-700   active:bg-teal-800   focus-visible:ring-teal-400' },
      { variant: 'solid', color: 'purple', class: 'bg-purple-600 text-white hover:bg-purple-700 active:bg-purple-800 focus-visible:ring-purple-400' },
      { variant: 'solid', color: 'red',    class: 'bg-red-600    text-white hover:bg-red-700    active:bg-red-800    focus-visible:ring-red-400' },
      { variant: 'solid', color: 'green',  class: 'bg-green-600  text-white hover:bg-green-700  active:bg-green-800  focus-visible:ring-green-400' },
      { variant: 'solid', color: 'blue',   class: 'bg-blue-700   text-white hover:bg-blue-800   active:bg-blue-900   focus-visible:ring-blue-500' },

      /* Outline — light ------------------------------------------------ */
      { variant: 'outline', color: 'teal',   mode: 'light', class: 'border-teal-600   text-teal-600   hover:bg-teal-100   active:bg-teal-200   focus-visible:ring-teal-400' },
      { variant: 'outline', color: 'purple', mode: 'light', class: 'border-purple-600 text-purple-600 hover:bg-purple-100 active:bg-purple-200 focus-visible:ring-purple-400' },
      { variant: 'outline', color: 'red',    mode: 'light', class: 'border-red-600    text-red-600    hover:bg-red-100    active:bg-red-200    focus-visible:ring-red-400' },
      { variant: 'outline', color: 'green',  mode: 'light', class: 'border-green-600  text-green-600  hover:bg-green-100  active:bg-green-200  focus-visible:ring-green-400' },
      { variant: 'outline', color: 'blue',   mode: 'light', class: 'border-blue-700   text-blue-700   hover:bg-blue-100   active:bg-blue-200   focus-visible:ring-blue-500' },

      /* Outline — dark ------------------------------------------------- */
      { variant: 'outline', color: 'teal',   mode: 'dark', class: 'border-teal-400   text-teal-400   hover:bg-teal-900/30   active:bg-teal-900/50   focus-visible:ring-teal-400' },
      { variant: 'outline', color: 'purple', mode: 'dark', class: 'border-purple-400 text-purple-400 hover:bg-purple-900/30 active:bg-purple-900/50 focus-visible:ring-purple-400' },
      { variant: 'outline', color: 'red',    mode: 'dark', class: 'border-red-400    text-red-400    hover:bg-red-900/30    active:bg-red-900/50    focus-visible:ring-red-400' },
      { variant: 'outline', color: 'green',  mode: 'dark', class: 'border-green-400  text-green-400  hover:bg-green-900/30  active:bg-green-900/50  focus-visible:ring-green-400' },
      { variant: 'outline', color: 'blue',   mode: 'dark', class: 'border-blue-400   text-blue-400   hover:bg-blue-900/30   active:bg-blue-900/50   focus-visible:ring-blue-500' },

      /* Text — light --------------------------------------------------- */
      { variant: 'text', color: 'teal',   mode: 'light', class: 'text-teal-600   hover:bg-teal-50/80   active:bg-teal-100/80   focus-visible:ring-teal-400' },
      { variant: 'text', color: 'purple', mode: 'light', class: 'text-purple-600 hover:bg-purple-50/80 active:bg-purple-100/80 focus-visible:ring-purple-400' },
      { variant: 'text', color: 'red',    mode: 'light', class: 'text-red-600    hover:bg-red-50/80    active:bg-red-100/80    focus-visible:ring-red-400' },
      { variant: 'text', color: 'green',  mode: 'light', class: 'text-green-600  hover:bg-green-50/80  active:bg-green-100/80  focus-visible:ring-green-400' },
      { variant: 'text', color: 'blue',   mode: 'light', class: 'text-blue-700   hover:bg-blue-50/80   active:bg-blue-100/80   focus-visible:ring-blue-500' },

      /* Text — dark ---------------------------------------------------- */
      { variant: 'text', color: 'teal',   mode: 'dark', class: 'text-teal-400   hover:bg-teal-900/30   active:bg-teal-900/50   focus-visible:ring-teal-400' },
      { variant: 'text', color: 'purple', mode: 'dark', class: 'text-purple-400 hover:bg-purple-900/30 active:bg-purple-900/50 focus-visible:ring-purple-400' },
      { variant: 'text', color: 'red',    mode: 'dark', class: 'text-red-400    hover:bg-red-900/30    active:bg-red-900/50    focus-visible:ring-red-400' },
      { variant: 'text', color: 'green',  mode: 'dark', class: 'text-green-400  hover:bg-green-900/30  active:bg-green-900/50  focus-visible:ring-green-400' },
      { variant: 'text', color: 'blue',   mode: 'dark', class: 'text-blue-400   hover:bg-blue-900/30   active:bg-blue-900/50   focus-visible:ring-blue-500' },
    ],
    defaultVariants: {
      color:   'teal',
      variant: 'solid',
      size:    'regular',
      radius:  'regular',
      mode:    'light',
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

export {
  Button as default,
}
