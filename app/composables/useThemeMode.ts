import { computed, type ComputedRef } from 'vue'
import { useTheme } from './useTheme'

/**
 * Derives a reactive 'dark' | 'light' mode string from the current theme's isDark state.
 * Useful for variant systems that need a mode prop instead of a boolean.
 *
 * @returns A computed ref that is 'dark' when isDark is true, 'light' otherwise
 *
 * @example
 * const mode = useThemeMode()
 * const buttonClasses = cn(buttonVariants({ variant: 'default', mode }))
 */
export function useThemeMode(): ComputedRef<'dark' | 'light'> {
  const { isDark } = useTheme()
  return computed(() => isDark.value ? 'dark' : 'light')
}
