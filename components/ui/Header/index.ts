import Header from './Header.vue'
import HeaderNavigation from './HeaderNavigation.vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { RouteLocationRaw } from 'vue-router'

/* Variant
----------------------------------------------------------------------------*/
export const headerVariants = cva(
  "w-full border-b border-white/5 px-6 py-4 flex items-center justify-between gap-6",
  {
    variants: {
      theme: {
        primary: "bg-primary-dark text-white",
        green: "bg-green-dark text-white",
        blue: "bg-blue-dark text-white",
        purple: "bg-purple-dark text-white",
        red: "bg-red-dark text-white",
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
        primary: "bg-primary text-white hover:bg-primary-black",
        green: "bg-green-dark hover:bg-green",
        blue: "bg-blue-dark hover:bg-blue",
        purple: "bg-purple-dark hover:bg-purple",
        red: "bg-red-dark hover:bg-red",
        dark: "bg-slate-900 hover:bg-slate-800",
        light: "bg-slate-200 text-slate-900 hover:bg-white",
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
