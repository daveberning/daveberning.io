import Text from './Text.vue'

/* Types
-------------------------------------------------------------------------------- */
export type TextVariants = VariantProps<typeof textVariants>;

export interface TextProps {
  as?: TextVariants["as"];
  tag?: keyof HTMLElementTagNameMap;
  color?: TextVariants["color"];
};

/* Variants
-------------------------------------------------------------------------------- */
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
      default: "text-slate-100",
      muted: "text-slate-400",
      primary: "text-cyan-300",
      accent: "text-emerald-300",
      danger: "text-rose-300",
    },
  },
  defaultVariants: {
    as: "body",
    color: "default",
  },
});

export {
  Text as default
}