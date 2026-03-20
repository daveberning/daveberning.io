# daveberning.io (Nuxt 4 + Tailwind 4)

Fresh Nuxt 4 starter that wires up the Tailwind CSS v4 PostCSS plugin and a minimal landing page hero.

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – generate production build
- `npm run preview` – preview the production build locally

Tailwind v4 is loaded via a single `@import "tailwindcss"` inside `assets/css/main.css` and processed by `@tailwindcss/postcss` configured in `nuxt.config.ts`.

## UI Building Blocks

- `components/ui/Text.vue` – composable typography component powered by [`class-variance-authority`](https://github.com/joe-bell/cva).
- `tokens/design-tokens.ts` – central place to declare color tokens (primary, green, blue, purple, red) for the design system.

Example usage:

```vue
<Text as="h2" color="primary">
  Gradient-powered typography
</Text>

<!-- render as a span while keeping body styles -->
<Text as="body" tag="span" color="muted">
  Muted inline helper copy
</Text>
```
