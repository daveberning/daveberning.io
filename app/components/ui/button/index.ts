import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Button from './Button.vue'

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
        white:  '',
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
      /* White ---------------------------------------------------------- */
      { variant: 'solid',   color: 'white', class: 'bg-white text-text hover:bg-white/90 active:bg-white/80 focus-visible:bg-white/80 focus-visible:ring-white' },
      { variant: 'outline', color: 'white', class: 'border-white text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-white' },
      { variant: 'text',    color: 'white', class: 'text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-white' },

      /* Solid ---------------------------------------------------------- */
      { variant: 'solid', color: 'teal',   class: 'bg-brand-teal   text-white hover:bg-brand-teal-light   active:bg-brand-teal-dark   focus-visible:bg-brand-teal-dark   focus-visible:ring-brand-teal' },
      { variant: 'solid', color: 'purple', class: 'bg-brand-purple text-white hover:bg-brand-purple-light active:bg-brand-purple-dark focus-visible:bg-brand-purple-dark focus-visible:ring-brand-purple' },
      { variant: 'solid', color: 'red',    class: 'bg-brand-red    text-white hover:bg-brand-red-light    active:bg-brand-red-dark    focus-visible:bg-brand-red-dark    focus-visible:ring-brand-red' },
      { variant: 'solid', color: 'green',  class: 'bg-brand-green  text-white hover:bg-brand-green-light  active:bg-brand-green-dark  focus-visible:bg-brand-green-dark  focus-visible:ring-brand-green' },
      { variant: 'solid', color: 'blue',   class: 'bg-brand-blue   text-white hover:bg-brand-blue-light   active:bg-brand-blue-dark   focus-visible:bg-brand-blue-dark   focus-visible:ring-brand-blue' },

      /* Outline — light ------------------------------------------------ */
      { variant: 'outline', color: 'teal',   mode: 'light', class: 'border-brand-teal   text-brand-teal   hover:bg-brand-teal/10   active:bg-brand-teal/20   focus-visible:ring-brand-teal' },
      { variant: 'outline', color: 'purple', mode: 'light', class: 'border-brand-purple text-brand-purple hover:bg-brand-purple/10 active:bg-brand-purple/20 focus-visible:ring-brand-purple' },
      { variant: 'outline', color: 'red',    mode: 'light', class: 'border-brand-red    text-brand-red    hover:bg-brand-red/10    active:bg-brand-red/20    focus-visible:ring-brand-red' },
      { variant: 'outline', color: 'green',  mode: 'light', class: 'border-brand-green  text-brand-green  hover:bg-brand-green/10  active:bg-brand-green/20  focus-visible:ring-brand-green' },
      { variant: 'outline', color: 'blue',   mode: 'light', class: 'border-brand-blue   text-brand-blue   hover:bg-brand-blue/10   active:bg-brand-blue/20   focus-visible:ring-brand-blue' },

      /* Outline — dark ------------------------------------------------- */
      { variant: 'outline', color: 'teal',   mode: 'dark', class: 'border-brand-teal-light   text-brand-teal-light   hover:bg-brand-teal/10   active:bg-brand-teal/20   focus-visible:ring-brand-teal-light' },
      { variant: 'outline', color: 'purple', mode: 'dark', class: 'border-brand-purple-light text-brand-purple-light hover:bg-brand-purple/10 active:bg-brand-purple/20 focus-visible:ring-brand-purple-light' },
      { variant: 'outline', color: 'red',    mode: 'dark', class: 'border-brand-red-light    text-brand-red-light    hover:bg-brand-red/10    active:bg-brand-red/20    focus-visible:ring-brand-red-light' },
      { variant: 'outline', color: 'green',  mode: 'dark', class: 'border-brand-green-light  text-brand-green-light  hover:bg-brand-green/10  active:bg-brand-green/20  focus-visible:ring-brand-green-light' },
      { variant: 'outline', color: 'blue',   mode: 'dark', class: 'border-brand-blue-light   text-brand-blue-light   hover:bg-brand-blue/10   active:bg-brand-blue/20   focus-visible:ring-brand-blue-light' },

      /* Text — light --------------------------------------------------- */
      { variant: 'text', color: 'teal',   mode: 'light', class: 'text-brand-teal   hover:bg-brand-teal/10   active:bg-brand-teal/20   focus-visible:ring-brand-teal' },
      { variant: 'text', color: 'purple', mode: 'light', class: 'text-brand-purple hover:bg-brand-purple/10 active:bg-brand-purple/20 focus-visible:ring-brand-purple' },
      { variant: 'text', color: 'red',    mode: 'light', class: 'text-brand-red    hover:bg-brand-red/10    active:bg-brand-red/20    focus-visible:ring-brand-red' },
      { variant: 'text', color: 'green',  mode: 'light', class: 'text-brand-green  hover:bg-brand-green/10  active:bg-brand-green/20  focus-visible:ring-brand-green' },
      { variant: 'text', color: 'blue',   mode: 'light', class: 'text-brand-blue   hover:bg-brand-blue/10   active:bg-brand-blue/20   focus-visible:ring-brand-blue' },

      /* Text — dark ---------------------------------------------------- */
      { variant: 'text', color: 'teal',   mode: 'dark', class: 'text-brand-teal-light   hover:bg-brand-teal/10   active:bg-brand-teal/20   focus-visible:ring-brand-teal-light' },
      { variant: 'text', color: 'purple', mode: 'dark', class: 'text-brand-purple-light hover:bg-brand-purple/10 active:bg-brand-purple/20 focus-visible:ring-brand-purple-light' },
      { variant: 'text', color: 'red',    mode: 'dark', class: 'text-brand-red-light    hover:bg-brand-red/10    active:bg-brand-red/20    focus-visible:ring-brand-red-light' },
      { variant: 'text', color: 'green',  mode: 'dark', class: 'text-brand-green-light  hover:bg-brand-green/10  active:bg-brand-green/20  focus-visible:ring-brand-green-light' },
      { variant: 'text', color: 'blue',   mode: 'dark', class: 'text-brand-blue-light   hover:bg-brand-blue/10   active:bg-brand-blue/20   focus-visible:ring-brand-blue-light' },
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
export {
  Button as default,
}
