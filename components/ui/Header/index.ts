import Header from './Header.vue'
import HeaderNavigation from './HeaderNavigation.vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { RouteLocationRaw } from 'vue-router'

/* Variant
----------------------------------------------------------------------------*/
export const headerVariants = cva(
  "w-full border-b border-white/5 px-6 py-3 flex items-center justify-between gap-6",
  {
    variants: {
      theme: {
        primary: "bg-primary text-white",
        green: "bg-green text-white",
        blue: "bg-blue text-white",
        purple: "bg-purple text-white",
        red: "bg-red text-white",
        dark: "bg-slate-900 text-white",
        light: "bg-white text-slate-900 border-slate-200",
      },
    },
    defaultVariants: {
      theme: "primary",
    },
  }
);

export const headerNavigationItemVariants = cva(
  "inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-white transition-colors",
  {
    variants: {
      theme: {
        primary: "bg-primary-dark text-white hover:bg-primary-black",
        green: "bg-green-dark hover:bg-green-black",
        blue: "bg-blue-dark hover:bg-blue-black",
        purple: "bg-purple-dark hover:bg-purple-black",
        red: "bg-red-dark hover:bg-red-black",
      },
    },
    defaultVariants: {
      theme: "primary",
    },
  }
);

/* Types
----------------------------------------------------------------------------*/
export type HeaderVariants = VariantProps<typeof headerVariants>;
export type HeaderNavigationItemVariants = VariantProps<typeof headerNavigationItemVariants>;

export interface HeaderProps {
  tag?: keyof HTMLElementTagNameMap;
  theme?: HeaderVariants["theme"];
}

export interface HeaderNavigationProps {
  theme?: HeaderNavigationItemVariants["theme"];
}

export interface HeaderNavigationRouteMeta {
  headerNav?: boolean;
  headerNavLabel?: string;
  headerNavColor?: HeaderNavigationItemVariants["theme"];
  headerNavOrder?: number;
  to?: RouteLocationRaw;
}

/* Components
----------------------------------------------------------------------------*/
export {
  Header as default,
  HeaderNavigation
}
