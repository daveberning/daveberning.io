---
name: axe-core a11y browser test setup
description: How axe-core was integrated, the shared helper location, which components are covered, and the key gotcha about useAttrs auto-import
type: project
---

`axe-core` is installed as a devDependency. WCAG 2.1 AA scanning runs only in the browser test environment (Playwright Chromium via `vitest.browser.config.ts`) — never in happy-dom unit tests, as axe requires real layout.

## Files

- `app/lib/a11y.ts` — shared `runAxe(container: Element)` helper; wraps `axe.run()` with WCAG 2.1 AA tag filter; returns a typed violation array with a `message` field for readable assertion failure output
- `app/components/ui/a11y.browser.test.ts` — browser tests covering Button (solid/outline/text/white), Text (p/h1/h2), Card (solid/outline/teal), Blockquote, and Aside

## Coverage exclusion

`app/lib/a11y.ts` is excluded from the unit test coverage config in `vitest.config.ts` because axe cannot be meaningfully tested in happy-dom. The exclude entry reads:
```ts
exclude: ['app/lib/a11y.ts']
```

## Harness pattern

```ts
function renderWithTheme(component, options = {}) {
  const Harness = defineComponent({
    setup() {
      provideTheme()
      return () => h(component, options)
    },
  })
  return render(Harness, {
    global: {
      components: {
        UiText: Text,
        UiCardContent: CardContent,
      },
    },
  })
}
```

Run axe on `view.baseElement` (not `view.container`) so axe sees the full document body context.

## Key gotcha: useAttrs auto-import

`Text.vue` originally called `useAttrs()` without importing it, relying on Nuxt's Vue auto-imports. The plain Vite browser test config does not have auto-imports, causing `ReferenceError: useAttrs is not defined`. Fixed by adding `useAttrs` to the explicit `import { computed, useAttrs } from 'vue'` in `Text.vue`. Any SFC that calls Vue composables without explicit imports will fail similarly in the browser test environment.

**Why:** Nuxt auto-imports all Vue APIs (`ref`, `computed`, `useAttrs`, etc.) globally. The browser test config is plain Vite+Vue — no Nuxt, no auto-imports.
**How to apply:** When writing or reviewing browser tests for a new component, check its SFCs for Vue composable calls that lack an explicit `import from 'vue'`. Fix at the source file level, not in the test.
