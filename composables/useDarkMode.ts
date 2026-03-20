import { computed, onMounted } from 'vue'
import { useThemeStore } from '~/stores/theme'

/**
 * A composable to manage dark mode and theme classes/styles.
 * This composable computes the appropriate classes and styles based on the current theme mode (dark or light) and the active theme color.
 */
export function useDarkMode() {
  const themeStore = useThemeStore()
  const classes = computed(() => `app-body ${themeStore.mode === 'dark' ? 'app-body--dark' : 'app-body--light'}`)

  const style = computed(() =>
    themeStore.mode === 'dark'
      ? `background-color: var(--color-${themeStore.active}-black); color: #ffffff;`
      : 'background-color: #ffffff; color: #0f172a;',
  )

  onMounted(() => {
    if (typeof window !== 'undefined' || typeof window.matchMedia === 'function') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      themeStore.setMode(mediaQuery.matches ? 'dark' : 'light')
    }
  })

  return {
    classes,
    style,
  }
}