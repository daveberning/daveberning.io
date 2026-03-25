# Code Style Rules

## TypeScript

- Use `import type` for TypeScript-only symbols: `import type { Foo } from '...'`
- Use generic `defineProps<T>()` syntax — never the object form `defineProps({ foo: String })`
- Prefer `interface` over `type` for object shapes; use `type` for unions and aliases
- No `any` — use `unknown` and narrow, or define a proper type

## Vue SFCs

- Always `<script setup lang="ts">` — no options API, no `<script>` without `setup`
- Reference props as `props.foo` in templates — never destructure props (breaks reactivity)
- Apply classes inline: `:class="cn(...)"` — never create a `mergedClass` computed ref
- Do not use `defineSlots`
- No `<style scoped>` — all styling via Tailwind utility classes

## Components

- Every component lives in its own directory with an `index.ts` barrel file
- Primitives: `app/components/ui/<name>/`
- Compound: `app/components/<Name>/`
- Export the component as default from `index.ts`; never re-export from a parent barrel
- All class merging goes through `cn()` from `~/lib/utils`

## Variants & Theming

- All component variants are defined with **CVA** in the component's `index.ts` — never inline in the SFC
- Variants are driven by `useTheme()` — specifically `isDark` and `color` (a `ThemeColor`: `'teal' | 'red' | 'blue' | 'green' | 'purple'`)
- Theme-based variants must use the **brand CSS custom properties** defined in `main.css` — never Tailwind color utilities like `bg-teal-500`

  Available brand tokens:
  ```
  bg-brand-teal        bg-brand-teal-dark
  bg-brand-red         bg-brand-red-dark
  bg-brand-blue        bg-brand-blue-dark
  bg-brand-green       bg-brand-green-dark
  bg-brand-purple      bg-brand-purple-dark
  text-brand-teal-text text-brand-red-text
  text-brand-blue-text text-brand-green-text text-brand-purple-text
  ```
  Semantic tokens (respond to light/dark mode automatically):
  ```
  bg-background   bg-surface   bg-surface-raised
  border-border   text-text    text-text-muted
  bg-theme        bg-theme-dark   bg-theme-light   bg-theme-black
  text-theme-fg
  ```

- The component's **props** determine which CVA variant is active — `useTheme()` values are read in the SFC and passed as variant keys
- Do not hardcode dark/light styles inside variants — use semantic tokens that respond to the `dark` class on `<html>` automatically where possible

## General

- No `console.log` in committed code
- No commented-out code blocks
- Prefer early returns over nested conditionals
- Do not install new packages or Nuxt modules without discussing first
