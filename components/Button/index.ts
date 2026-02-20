import Button from './Button.vue'
import { cva, type VariantProps } from 'class-variance-authority'

/* Variants
----------------------------------------------------------------------------*/
export const buttonVariants = cva(
  'inline-flex items-center justify-center border px-4 py-2 text-sm font-semibold transition-colors duration-200',
  {
    variants: {
      color: {
        primary: '',
        blue: '',
        green: '',
        red: '',
        purple: '',
      },
      type: {
        solid: '',
        ghost: 'bg-transparent',
      },
      rounded: {
        none: 'rounded-none',
        full: 'rounded-full',
      },
    },
    compoundVariants: [
      {
        type: 'solid',
        color: 'primary',
        class: 'bg-primary border-primary-dark text-white hover:bg-primary-dark',
      },
      {
        type: 'solid',
        color: 'blue',
        class: 'bg-blue border-blue-dark text-white hover:bg-blue-dark',
      },
      {
        type: 'solid',
        color: 'green',
        class: 'bg-green border-green-dark text-white hover:bg-green-dark',
      },
      {
        type: 'solid',
        color: 'red',
        class: 'bg-red border-red-dark text-white hover:bg-red-dark',
      },
      {
        type: 'solid',
        color: 'purple',
        class: 'bg-purple border-purple-dark text-white hover:bg-purple-dark',
      },
      {
        type: 'ghost',
        color: 'primary',
        class: 'border-primary text-primary hover:bg-primary/10',
      },
      {
        type: 'ghost',
        color: 'blue',
        class: 'border-blue text-blue hover:bg-blue/10',
      },
      {
        type: 'ghost',
        color: 'green',
        class: 'border-green text-green hover:bg-green/10',
      },
      {
        type: 'ghost',
        color: 'red',
        class: 'border-red text-red hover:bg-red/10',
      },
      {
        type: 'ghost',
        color: 'purple',
        class: 'border-purple text-purple hover:bg-purple/10',
      },
    ],
    defaultVariants: {
      color: 'primary',
      type: 'solid',
      rounded: 'none',
    },
  },
)

/* Types
----------------------------------------------------------------------------*/
export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps {
  tag?: keyof HTMLElementTagNameMap
  color?: ButtonVariants['color']
  type?: ButtonVariants['type']
  rounded?: ButtonVariants['rounded']
  buttonType?: 'button' | 'submit' | 'reset'
}

/* Components
----------------------------------------------------------------------------*/
export {
  Button as default
}
