import tailwindcss from '@tailwindcss/vite'
import { createLogger } from 'vite'

function createFilteredLogger() { // Ignoring sourcemap and lexical errors that are not relevant during development
  const logger = createLogger()
  const originalWarn = logger.warn.bind(logger)
  logger.warn = (msg, options) => {
    if (
      msg.includes('Sourcemap is likely to be incorrect') ||
      msg.includes('Lexical error')
    ) return
    originalWarn(msg, options)
  }
  return logger
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  hooks: {
    'vite:extendConfig'(config) {
      Object.assign(config, { customLogger: createFilteredLogger() })
    },
  },
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@iconify/utils',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'class-variance-authority',
        'clsx',
        'tailwind-merge',
        'yup',
        'vee-validate',
      ]
    },
  },
  devtools: {
    enabled: true
  },
  alias: {
    '@': './src',
  },
  modules: [
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
  components: {
    dirs: [
      {
        path: '~/components',
        extensions: ['vue'],
      },
    ],
  },
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-03-19',
})
