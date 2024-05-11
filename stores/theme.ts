import { defineStore } from 'pinia'
import type { Theme, ThemeName } from '~/types/theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    currentTheme: 'teal' as ThemeName,
    colors: [
      {
        name: 'teal',
        light: '#b6f6ec',
        background: '#3d9e91',
        dark: '#348479',
        text: '#334241',
      },
      {
        name: 'green',
        light: '#9ED9B8',
        background: '#40884E',
        dark: '#2D7439',
        text: '#2F413C',
      },
      {
        name: 'blue',
        light: '#A1C8E4',
        background: '#2E5186',
        dark: '#1A3D72',
        text: '#191B29',
      },
      {
        name: 'purple',
        light: '#BFA0D9',
        background: '#8D6299',
        dark: '#794E85',
        text: '#2A1E2B',
      },
      {
        name: 'red',
        light: '#E6B0A4',
        background: '#A83B44',
        dark: '#992D35',
        text: '#423332',
      }

    ] as Theme[],
  }),
  getters: {
    theme(state) {
      return state.colors.find(color => color.name === state.currentTheme)
    },
    portrait(state) {
      return `/portraits/${state.currentTheme}.png`
    }
  },
})