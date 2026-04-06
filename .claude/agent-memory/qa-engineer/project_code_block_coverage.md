---
name: CodeBlock component coverage status
description: Coverage status and known V8 branch gaps for the CodeBlock component family after initial test suite was written
type: project
---

CodeBlock component family tests were written on 2026-04-06. All 362 tests pass at 100% lines and functions for the code-block directory.

Known remaining branch gap (pre-existing V8 quirk, not a genuine test gap):
- `CodeBlock.vue` line 36 — `<span v-else />` inside `v-if="props.language"` inside `v-if="showHeader"`. V8 reports this as a branch miss due to compiled Vue template branch tracking. The actual code path IS exercised (tested by "renders empty placeholder span when code is set but language is absent"). This is not a gap worth addressing further.

Pre-existing gaps unrelated to CodeBlock (carried over from before this work):
- `Form.vue` lines 21-22 — branch gap
- `mountHarness.ts` line 16 — branch gap
- `useFormField.ts` line 39 / functions 85.71% — pre-existing

**How to apply:** When the overall branch coverage appears below 100%, check these known gaps first before assuming new regressions.
