export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/image'],
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },
  future: {
    compatibilityVersion: 4
  },
  components: [
    {
      path: "~/components",
      extensions: ["vue"],
    },
  ],
});