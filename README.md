# daveberning.io (Nuxt 4 + Tailwind 4)

Fresh Nuxt 4 starter that wires up the Tailwind CSS v4 PostCSS plugin and a minimal landing page hero.

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – generate production build
- `npm run preview` – preview the production build locally

Tailwind v4 is loaded via a single `@import "tailwindcss"` inside `assets/css/main.css` and processed by `@tailwindcss/postcss` configured in `nuxt.config.ts`.
