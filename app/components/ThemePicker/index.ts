import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { ThemeColor } from '~/composables/useTheme'
import ThemePicker from './ThemePicker.vue'
import ThemePickerItem from './ThemePickerItem.vue'

/* Variants
--------------------------------------------------------------------- */
export const themePickerVariants = cva('flex items-center gap-3', {
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical:   'flex-col',
    },
  },
  defaultVariants: {
    orientation: 'vertical',
  },
})

/* Types
--------------------------------------------------------------------- */
export type ThemePickerVariants = VariantProps<typeof themePickerVariants>

export interface ThemePickerProps {
  orientation?: ThemePickerVariants['orientation']
  class?: string
}

export interface ThemePickerItemProps {
  name: ThemeColor
  color: string
  selected: boolean
  class?: string
}

/* Theme definitions
--------------------------------------------------------------------- */
export const THEMES: { name: ThemeColor; color: string }[] = [
  { name: 'teal',   color: '#3e9e91' },
  { name: 'red',    color: '#a83c44' },
  { name: 'blue',   color: '#2e5186' },
  { name: 'green',  color: '#40894e' },
  { name: 'purple', color: '#8d6299' },
]

/* Components
--------------------------------------------------------------------- */
export {
  ThemePicker as default,
  ThemePickerItem
}
