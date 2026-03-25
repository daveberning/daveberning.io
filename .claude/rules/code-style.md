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

## General

- No `console.log` in committed code
- No commented-out code blocks
- Prefer early returns over nested conditionals
- Do not install new packages or Nuxt modules without discussing first
