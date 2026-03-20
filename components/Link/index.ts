import Link from './Link.vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { RouteLocationRaw } from 'vue-router'

/* Variants
----------------------------------------------------------------------------*/
export const linkVariants = cva(
  "font-medium transition-colors transition-opacity duration-200 ease-in-out underline-offset-4",
  {
    variants: {
      color: {
        primary: "text-primary hover:text-primary-dark",
        green: "text-green hover:text-green-dark",
        blue: "text-blue hover:text-blue-dark",
        purple: "text-purple hover:text-purple-dark",
        red: "text-red hover:text-red-dark",
        white: "text-white hover:text-slate-200",
        cta: "text-cta hover:text-cta-dark",
      },
      type: {
        normal: "underline",
        subtle: "underline decoration-dotted",
        bare: 'no-underline',
        button: "no-underline px-4 py-2 rounded font-semibold",
      }
    },
    defaultVariants: {
      color: "primary",
      type: 'normal'
    },
    compoundVariants: [
      {
        type: 'button',
        color: 'primary',
        class: "bg-primary text-white! hover:bg-primary-dark"
      },
      {
        type: 'button',
        color: 'green',
        class: "bg-green text-white! hover:bg-green-dark"
      },
      {
        type: 'button',
        color: 'blue',
        class: "bg-blue text-white! hover:bg-blue-dark"
      },
      {
        type: 'button',
        color: 'purple',
        class: "bg-purple text-white! hover:bg-purple-dark"
      },
      {
        type: 'button',
        color: 'red',
        class: "bg-red text-white! hover:bg-red-dark"
      },
      {
        type: 'button',
        color: 'white',
        class: "bg-white text-slate-900 hover:bg-slate-200"
      },
      {
        type: 'button',
        color: 'cta',
        class: "bg-cta hover:bg-cta-dark text-cta-black"
      },
    ]
  }
);

/* Types
----------------------------------------------------------------------------*/
export type LinkVariants = VariantProps<typeof linkVariants>;

export interface LinkProps {
  to: string | RouteLocationRaw;
  color?: LinkVariants["color"];
  type?: LinkVariants["type"]
}

/* Components
----------------------------------------------------------------------------*/
export {
  Link as default
}
