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
  // Legacy redirects for blog posts that were moved to the /writing section
  routeRules: {
    '/how-to-stay-ahead-of-googles-non-intrusive-popup-update': {
      redirect: { to: '/writing/how-to-stay-ahead-of-googles-non-intrusive-popup-update', statusCode: 301 },
    },
    '/which-is-better-for-seo-www-or-non-www': {
      redirect: { to: '/writing/which-is-better-for-seo-www-or-non-www', statusCode: 301 },
    },
    '/best-way-to-learn-find-a-topic-run-with-it': {
      redirect: { to: '/writing/best-way-to-learn-find-a-topic-run-with-it', statusCode: 301 },
    },
    '/setting-up-and-getting-rest-service-data-with-firebase-and-axios': {
      redirect: { to: '/writing/setting-up-and-getting-rest-service-data-with-firebase-and-axios', statusCode: 301 },
    },
    '/creating-alias-for-package-imports-in-react': {
      redirect: { to: '/writing/creating-alias-for-package-imports-in-react', statusCode: 301 },
    },
    '/importing-global-libraries-into-vue-cli-the-clean-way': {
      redirect: { to: '/writing/importing-global-libraries-into-vue-cli-the-clean-way', statusCode: 301 },
    },
    '/five-things-every-new-web-developer-should-do': {
      redirect: { to: '/writing/five-things-every-new-web-developer-should-do', statusCode: 301 },
    },
  },
  app: {
    pageTransition: { name: 'page' },
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      link: [
        { rel: 'manifest', href: '/manifest.webmanifest' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://daveberning.io',
    },
  },
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
  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL ?? 'https://daveberning.io',
  },
  image: {
    format: ['webp'],
    quality: 80,
    screens: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536,
    },
    densities: [1, 2],
  },
  modules: [
    '@nuxt/image',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/content',
    '@nuxtjs/sitemap',
  ],
  sitemap: {
    exclude: ['/storybook/**'],
    sources: ['/api/__sitemap__/writing'],
  },
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
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light-high-contrast',
            dark: 'github-dark-high-contrast',
          },
          langs: ['javascript', 'typescript', 'vue', 'html', 'css', 'bash', 'json', 'yaml', 'markdown', 'shell'],
        },
      },
    },
  },
  nitro: {
    prerender: {
      ignore: [/^\/writing\?/],
    },
  },
  compatibilityDate: '2025-03-19',
})
