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
    '@nuxt/content',
  ],
  css: [
    '~/assets/css/main.css'
  ],
  fonts: {
    families: [
      { name: 'Space Grotesk', provider: 'google', weights: [300, 400, 500, 600, 700] },
      { name: 'DM Sans', provider: 'google', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-03-19',
})
