# QA Engineer Memory Index

- [Form component testing patterns](./project_form_testing.md) — vee-validate + useTheme mocks, provideFormFieldContext wrapper strategy, ContextConsumer pattern, event coverage, v8 artifact explanation
- [Aside compound component testing patterns](./project_aside_testing.md) — UiText stub, mountInsideAside provide/inject strategy, AsideList item rendering
- [Icon stubbing for @nuxt/icon](./feedback_icon_stubbing.md) — must stub both "Icon" and "NuxtIcon" to avoid "[nuxt] instance unavailable" in happy-dom
- [navigator.clipboard stubbing](./feedback_clipboard_stub.md) — use vi.stubGlobal, not Object.assign; clipboard is getter-only in happy-dom
- [Text span selector ambiguity with Icon stub](./feedback_span_text_selector.md) — use wrapper.text() not find('span') when Icon is stubbed as a span
- [CodeBlock coverage status](./project_code_block_coverage.md) — all 362 tests pass; known V8 branch quirk on CodeBlock.vue line 36; pre-existing gaps in Form.vue and mountHarness.ts
- [Blockquote and ProseImg coverage](./project_blockquote_proseimg_coverage.md) — both at 100%; no mocks needed; ProseImg left/right variants include extra responsive classes beyond spec
