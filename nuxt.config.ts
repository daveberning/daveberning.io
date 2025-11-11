import { tokensToCss } from "./tokens/design-tokens";

const tokenStyles = tokensToCss();

export default defineNuxtConfig({
  devtools: { enabled: true },
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
  app: {
    head: {
      style: [
        {
          id: "design-token-vars",
          innerHTML: tokenStyles,
        },
      ],
    },
  }
});
