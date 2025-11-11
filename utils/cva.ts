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
