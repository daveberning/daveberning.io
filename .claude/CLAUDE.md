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
import { useCreateContext } from '~/composables/useCreateContext' // compound only
import Button from './Button.vue'

/* Variants
--------------------------------------------------------------------- */
export const buttonVariants = cva('...base classes...', {
  variants: {
    variant: {
      default: '...'
    },
  },
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

export interface ButtonContext {
  // context values go here for compound components; empty for primitives
}

/* Context
--------------------------------------------------------------------- */
export const [
  injectButtonContext,
  provideButtonContext
] = useCreateContext<ButtonContext>('Button')

/* Components
--------------------------------------------------------------------- */
export {
  Button as default,
  // other exports (compound subcomponents, context helpers) go here
}
```

### SFC pattern

```vue
<script setup lang="ts">
import { myVariants, type MyProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<MyProps>(), {
  as: 'div',
})
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
export const [
  injectHeaderContext,
  provideHeaderContext
] = useCreateContext<HeaderContext>('Header')
```

Root calls `provideHeaderContext(...)` inline; subcomponents call `injectHeaderContext()` and destructure what they need.

Key rules:
- Always use `<script setup lang="ts">`
- Use `props.foo` in templates (not destructured props) to preserve reactivity
- Use `as` prop for polymorphic rendering
- Apply classes with `cn()` inline in `:class` — never create a `mergedClass` computed ref
- Do not use `defineSlots`

## Agents

This project uses specialized agents that collaborate to solve problems. When a prompt is received, the appropriate agents should work together to formulate a complete solution.

| Agent                | Role | When to use |
|----------------------|---|---|
| `Front-End Engineer` | Builds, refactors, and tests front-end code — Vue components, composables, Tailwind styling, Vitest tests | Any task touching `app/` |
| `QA Engineer`        | Writes and runs unit, component, and e2e tests (Vitest + Playwright) | After new components or features are written; regression coverage after refactors |
| `UI/UX Designer`     | UI/UX design guidance, accessibility reviews (WCAG), layout recommendations, design system consistency | **Only** when creating new components or asking about colors, layouts, spacing, or visual design |
| `Plan`               | Software architect — designs implementation strategies, identifies critical files, weighs trade-offs | Before starting non-trivial features or refactors |
| `Explore`            | Fast codebase exploration — finds files by pattern, searches for keywords, answers structural questions | When context about existing code is needed before making changes |

### Collaboration rules

- For any non-trivial feature: `Plan` → `front-end-software-engineer` → `qa-engineer`
- For new UI components: `ui-designer` (design) → `front-end-software-engineer` (build) → `qa-engineer` (test)
- `ui-designer` is **only invoked** for tasks explicitly involving component creation, visual design decisions, or UX/accessibility review — not for general coding tasks
- `qa-engineer` runs **after** implementation is complete, not during

## Nuxt modules in use

- `@nuxt/image` — image optimization
- `@nuxt/fonts` — Google Fonts (Inter configured)
- `@nuxt/icon` — icon system
- `oxlint` — linting (no config file needed for defaults)
