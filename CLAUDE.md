# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run generate     # Static site generation
npm run preview      # Preview production build
npm run lint         # oxlint
npm run typecheck    # TypeScript check
npm run test         # Vitest (watch mode)
npm run test:coverage  # Vitest with v8 coverage (must hit 100%)
```

## Architecture

**Nuxt 4** with `compatibilityVersion: 4` — source files live under `app/` (not the root). Auto-imports are active for components, composables, and utils.

**Styling** uses Tailwind CSS v4 via `@tailwindcss/vite`. There is no `tailwind.config.js`; configuration is CSS-first using `@theme` directives inside `app/assets/css/main.css`, which is the single global stylesheet.

**Component architecture** follows a shadcn-style pattern. Every component — including simple primitives — lives in its own directory with an `index.ts` barrel file:

- `app/components/ui/<name>/` — base UI primitives (button, input, etc.)
- `app/components/<Name>/` — compound components with subcomponents

**Variants** are managed with `class-variance-authority` (CVA). The `cn()` utility at `app/lib/utils.ts` combines `clsx` + `tailwind-merge` and is used everywhere for conditional/merged class application.

### Component directory structure

Every component, simple or compound, follows this layout:

```
app/components/ui/button/
├── Button.vue   # SFC — imports variants/types from index.ts
└── index.ts     # Variants, types, props, component re-exports
```

Compound components with subcomponents add more SFCs and a provide/inject context in `index.ts`:

```
app/components/Header/
├── Header.vue            # Root — calls provideHeaderContext(...)
├── HeaderNavigation.vue  # Subcomponent — calls injectHeaderContext()
└── index.ts              # Context, variants, types, exports
```

### `index.ts` structure

Sections appear in this order: imports → context block (compound only) → types → variants → component exports.

```ts
import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
// import { useCreateContext } from '~/composables/useCreateContext' // compound only

/* Variants
--------------------------------------------------------------------- */
export const buttonVariants = cva('...base classes...', {
  variants: { variant: { default: '...' } },
  defaultVariants: { variant: 'default' },
})

/* Types
--------------------------------------------------------------------- */
export type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps {
  variant?: ButtonVariants['variant']
  class?: string
  as?: string
}

/* Components
--------------------------------------------------------------------- */
import Button from './Button.vue'

export { Button as default, Button }
```

### SFC pattern

```vue
<script setup lang="ts">
import { myVariants, type MyProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<MyProps>(), { as: 'div' })
</script>

<template>
  <component :is="props.as" :class="cn(myVariants({ variant: props.variant }), props.class)">
    <slot />
  </component>
</template>
```

### Compound components — provide/inject

Compound components share state via `useCreateContext`. The context helpers live in `index.ts`:

```ts
const [injectHeaderContext, provideHeaderContext] = useCreateContext<HeaderContext>('Header')
export { injectHeaderContext, provideHeaderContext }
```

Root calls `provideHeaderContext(...)` inline; subcomponents call `injectHeaderContext()` and destructure what they need.

Key rules:
- Always use `<script setup lang="ts">`
- Use `props.foo` in templates (not destructured props) to preserve reactivity
- Use `as` prop for polymorphic rendering
- Apply classes with `cn()` inline in `:class` — never create a `mergedClass` computed ref
- Do not use `defineSlots`

## Nuxt modules in use

- `@pinia/nuxt` — state management (`app/stores/`)
- `@nuxt/image` — image optimization
- `@nuxt/fonts` — Google Fonts (Inter configured)
- `@nuxt/icon` — icon system
- `oxlint` — linting (no config file needed for defaults)
