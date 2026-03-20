import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  devtools: {
    enabled: true
  },
  alias: {
    '@': './src',
  },
  modules: [
    '@pinia/nuxt',
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'google' },
      { name: 'Roboto', provider: 'google', weights: [100, 300, 400, 500, 700, 900] },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-03-19',
})
