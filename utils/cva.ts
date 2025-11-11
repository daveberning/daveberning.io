import { cva, type VariantProps } from "class-variance-authority";

/**
 * Re-export cva utilities so components can import from a single place:
 * `import { cva, type VariantProps } from "~/utils/cva";`
 */
export { cva };
export type { VariantProps };

/**
 * Example variant config that other components can reuse or extend.
 * Keeping one exemplar makes it easy to copy patterns for future components.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      intent: {
        primary: "bg-black text-white hover:bg-black/90",
        secondary: "bg-white text-black border border-black/10 hover:bg-black/5",
        ghost: "bg-transparent hover:bg-black/5",
      },
      size: {
        sm: "h-8 px-3",
        md: "h-10 px-4",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;

/**
 * Typography system that mirrors the ShadCN-style API.
 * The `as` variant represents visual hierarchy, while the runtime `tag`
 * prop on the Text component controls which HTML node is rendered.
 */
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

export type TextVariants = VariantProps<typeof textVariants>;
