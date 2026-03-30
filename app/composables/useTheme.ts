import { inject, onMounted, onUnmounted, provide, ref, type InjectionKey, type Ref } from 'vue'

export type ThemeColor = 'teal' | 'red' | 'blue' | 'green' | 'purple'

/* Context shape
--------------------------------------------------------------------- */
interface ThemeContext {
  color:       Ref<ThemeColor>
  isDark:      Ref<boolean>
  setColor:    (color: ThemeColor) => void
  toggleDark:  () => void
}

const THEME_KEY: InjectionKey<ThemeContext> = Symbol('theme')
const STORAGE_COLOR = 'theme:color'
const STORAGE_DARK  = 'theme:dark'

/* Helpers
--------------------------------------------------------------------- */
/**
 * Reads the persisted theme color and dark mode from localStorage, falling back to OS preference for dark mode if no saved value exists.
 */
function readStorage(): { color: ThemeColor; isDark: boolean } {
  const color  = (localStorage.getItem(STORAGE_COLOR) as ThemeColor | null) ?? 'teal'
  const hasSavedDark = localStorage.getItem(STORAGE_DARK) !== null
  const isDark = hasSavedDark
    ? localStorage.getItem(STORAGE_DARK) === 'true'
    : window.matchMedia('(prefers-color-scheme: dark)').matches

  return { color, isDark }
}

/**
 * Applies the given theme color and dark mode to the DOM by setting a data attribute and toggling a class on the root element.
 * @param color
 * @param isDark
 */
function applyToDOM(color: ThemeColor, isDark: boolean) {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', color)
  document.documentElement.classList.toggle('dark', isDark)
}

/**
 * Saves the given theme color and dark mode to localStorage for persistence across sessions.
 * @param color
 * @param isDark
 */
function saveToStorage(color: ThemeColor, isDark: boolean) {
  localStorage.setItem(STORAGE_COLOR, color)
  localStorage.setItem(STORAGE_DARK, String(isDark))
}

/* Provider — call once in the root layout
--------------------------------------------------------------------- */
/**
 * Provides the theme context to child components, managing the reactive state and syncing with localStorage and the DOM.
 */
export function provideTheme(): ThemeContext {
  // Start with defaults — localStorage must only be touched after mount
  // to avoid triggering happy-dom's localStorage warning during SSR/pre-render.
  const color  = ref<ThemeColor>('teal')
  const isDark = ref(false)

  onMounted(() => {
    // Now we're guaranteed to be in a real browser — read persisted state.
    const saved  = readStorage()
    color.value  = saved.color
    isDark.value = saved.isDark
    applyToDOM(color.value, isDark.value)

    // Listen for OS dark-mode changes only when the user has no saved preference.
    if (localStorage.getItem(STORAGE_DARK) !== null) return

    const mq = window.matchMedia('(prefers-color-scheme: dark)')

    const handler = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_DARK) !== null) return
      isDark.value = e.matches
      applyToDOM(color.value, isDark.value)
    }

    mq.addEventListener('change', handler)
    onUnmounted(() => mq.removeEventListener('change', handler))
  })

  function setColor(newColor: ThemeColor) {
    color.value = newColor
    applyToDOM(color.value, isDark.value)
    saveToStorage(color.value, isDark.value)
  }

  function toggleDark() {
    isDark.value = !isDark.value
    applyToDOM(color.value, isDark.value)
    saveToStorage(color.value, isDark.value)
  }

  const context: ThemeContext = {
    color,
    isDark,
    setColor,
    toggleDark
  }

  provide(THEME_KEY, context)
  return context
}

/* Consumer — call in any child component
--------------------------------------------------------------------- */
/**
 * Access the theme context in any child component. Must be used within a parent that called provideTheme().
 */
export function useTheme(): ThemeContext {
  const context = inject(THEME_KEY)
  if (!context) throw new Error('[useTheme] Missing provider — call provideTheme() in a parent component.')
  return context
}
