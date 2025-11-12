import { defineStore } from 'pinia'

export const themeOptions = ['primary', 'blue', 'green', 'red', 'purple'] as const

export type ThemeVariant = (typeof themeOptions)[number]
export type ThemeMode = 'light' | 'dark'

interface ThemeState {
  active: ThemeVariant
  mode: ThemeMode
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    active: 'primary',
    mode: 'light',
  }),
  getters: {
    isDark(state) {
      return state.mode === 'dark'
    },
    bodyBackground(state) {
      return state.mode === 'dark'
        ? `var(--color-${state.active}-black)`
        : '#ffffff'
    },
  },
  actions: {
    setTheme(theme: ThemeVariant) {
      this.active = theme
    },
    setMode(mode: ThemeMode) {
      this.mode = mode
    },
    toggleMode() {
      this.mode = this.mode === 'light' ? 'dark' : 'light'
    },
  },
})
