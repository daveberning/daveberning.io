---
name: Blockquote and ProseImg coverage
description: Coverage status and testing notes for Blockquote and ProseImg after initial test authoring
type: project
---

Both `app/components/ui/blockquote/Blockquote.vue` and `app/components/ui/prose-img/ProseImg.vue` reached 100% coverage (statements, branches, functions, lines) as of 2026-04-08.

**Blockquote** — a simple polymorphic primitive with no CVA variants and no `useTheme` dependency. No mocks needed. Tests mount directly.

**ProseImg** — uses CVA for `align` variants (`center`, `full`, `left`, `right`). The base class `my-6` is applied by CVA, not inline. Left and right variants include additional responsive classes (`sm:float-left`, `sm:mr-6`, `sm:mb-4`, `sm:max-w-sm` and equivalents for right) that the original spec did not enumerate — tests assert the classes actually present in `index.ts`, not the abbreviated spec list. No `useTheme` dependency; no mocks needed.

**Why:** Both components render static classes or CVA variant classes with no async, no external composables, and no context injection, making them the simplest category of test to write.

**How to apply:** Future primitives in this category (no theme, no context) can be tested with zero mocks. Read `index.ts` to get the exact CVA class strings before asserting — do not rely solely on the task spec if the variant definition is more detailed.
