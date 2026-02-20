import ThemePicker from './ThemePicker.vue'
import { cva, type VariantProps } from 'class-variance-authority'
import type { ThemeMode, ThemeVariant } from '~/stores/theme'

const themeVariantClasses = {
  primary: 'bg-primary border-primary-dark',
  blue: 'bg-blue border-blue-dark',
  green: 'bg-green border-green-dark',
  red: 'bg-red border-red-dark',
  purple: 'bg-purple border-purple-dark',
} satisfies Record<ThemeVariant, string>

/* Variants
----------------------------------------------------------------------------*/
export const themePickerListVariants = cva(
  'fixed bottom-6 left-6 z-50 flex gap-3 items-center',
  {
    variants: {
      orientation: {
        vertical: 'flex-col',
        horizontal: 'flex-row',
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
)

export const themePickerSwatchVariants = cva(
  'h-[20px] w-[20px] rounded-full border-2 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  {
    variants: {
      theme: themeVariantClasses,
      state: {
        active: 'scale-110 ring-2 ring-white/80 opacity-100',
        idle: 'opacity-60 hover:opacity-100',
      },
    },
    defaultVariants: {
      state: 'idle',
    },
  },
)

const modeToggleVariantClasses = {
  light: 'bg-white text-slate-900 border-white/80',
  dark: 'bg-slate-900 text-white border-white/60',
} satisfies Record<ThemeMode, string>

export const themePickerModeToggleVariants = cva(
  'flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
  {
    variants: {
      mode: modeToggleVariantClasses,
      state: {
        active: 'ring-2 ring-white/80 opacity-100',
        idle: 'opacity-70 hover:opacity-100',
      },
    },
    defaultVariants: {
      mode: 'light',
      state: 'idle',
    },
  },
)

/* Types
----------------------------------------------------------------------------*/
export type ThemePickerListVariants = VariantProps<typeof themePickerListVariants>

export interface ThemePickerProps {
  orientation?: ThemePickerListVariants['orientation']
}

/* Components
----------------------------------------------------------------------------*/
export {
  ThemePicker as default,
}
