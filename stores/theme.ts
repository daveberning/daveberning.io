import { defineStore } from 'pinia'

export const themeOptions = ['primary', 'blue', 'green', 'red', 'purple'] as const

export type ThemeVariant = (typeof themeOptions)[number]

interface ThemeState {
  active: ThemeVariant
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    active: 'primary',
  }),
})
