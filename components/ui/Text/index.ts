import Text from './Text.vue'
import { cva, type VariantProps } from 'class-variance-authority'

/* Variant
----------------------------------------------------------------------------*/
export const textVariants = cva("tracking-tight leading-tight text-pretty", {
  variants: {
    as: {
      h1: "text-4xl font-bold sm:text-5xl md:text-6xl",
      h2: "text-3xl font-semibold sm:text-4xl",
      h3: "text-2xl font-semibold sm:text-3xl",
      h4: "text-xl font-semibold",
      h5: "text-lg font-medium",
      h6: "text-base font-medium uppercase tracking-wide",
      body: "text-base font-normal leading-relaxed",
    },
    color: {
      primary: "text-primary-black",
      green: "text-green-black",
      blue: "text-blue-black",
      purple: "text-purple-black",
      red: "text-red-black",
      white: "text-white",
    },
  },
  defaultVariants: {
    as: "body",
    color: "primary",
  },
});

/* Types
----------------------------------------------------------------------------*/
export type TextVariants = VariantProps<typeof textVariants>;

export interface TextProps {
  as?: TextVariants["as"];
  tag?: keyof HTMLElementTagNameMap;
  color?: TextVariants["color"];
}

/* Components
----------------------------------------------------------------------------*/
export {
  Text as default
}