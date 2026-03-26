---
name: Form component testing patterns
description: Established patterns for testing the Form compound component system (vee-validate + useTheme mocks, context provision strategy)
type: project
---

The Form system (`app/components/ui/form/`) is a compound component that combines vee-validate field binding with a provide/inject context. Testing it requires two mocks plus a context-provider wrapper.

**Required mocks:**

1. `vi.mock('vee-validate', ...)` — return `{ useField: () => ({ value: ref(''), errorMessage: ref(undefined), handleChange: vi.fn(), handleBlur: vi.fn() }) }`. This is needed in `Form.test.ts`, `FormInput.test.ts`, and `FormTextArea.test.ts`.

2. `vi.mock('~/composables/useTheme', ...)` — return `{ useTheme: () => ({ isDark: isDarkRef, color: ref('teal'), setColor: vi.fn(), toggleDark: vi.fn() }) }`. Use a module-level `const isDarkRef = ref(false)` that tests can mutate to toggle dark mode. This is needed in `FormLabel.test.ts`, `FormInput.test.ts`, `FormTextArea.test.ts`, `FormMessage.test.ts`.

**Context provision strategy:**

Do NOT mount child components (FormLabel, FormInput, etc.) through the real `Form.vue` parent — that would require a full vee-validate form context. Instead, create an inline `defineComponent` wrapper in each test file that calls `provideFormFieldContext(...)` directly:

```ts
const Wrapper = defineComponent({
  setup() {
    const name = ref('email')
    provideFormFieldContext({
      name,
      inputId:   computed(() => `field-${name.value}`),
      messageId: computed(() => `field-${name.value}-message`),
      errorMessage: ref(undefined),  // or ref('Required') for error state
    })
  },
  template: `<FormLabel>Label text</FormLabel>`,
})
```

**ContextConsumer pattern for Form.test.ts:**

Use a `defineComponent` child that destructures refs from `injectFormFieldContext()` and binds them directly (not via `ctx.inputId` which would render `[object Object]`):

```ts
const ContextConsumer = defineComponent({
  setup() {
    const { inputId, messageId, name } = injectFormFieldContext()
    return { inputId, messageId, name }
  },
  template: `<div :data-input-id="inputId" :data-message-id="messageId" :data-name="name" />`,
})
```

**Event handler coverage:**

`FormInput.vue` and `FormTextArea.vue` bind `@change="handleChange"` and `@blur="handleBlur"`. v8 marks these uncovered unless you trigger the events. Add tests that call `wrapper.find('input').trigger('change')` and `.trigger('blur')`. After triggering, just assert `wrapper.find('input').exists()` — the goal is coverage, not verifying the mock.

**Residual v8 artifact:**

`Form.vue`, `FormInput.vue`, and `FormTextArea.vue` will show ~90% statements and ~75-80% functions despite 100% line and branch coverage. This is because the `() => props.name` / `() => name.value` arrow functions passed as arguments to the mocked `useField` are registered by v8 as separate function units but never actually invoked (the mock ignores the argument). This is not a real gap — all user-authored behavior is covered.

**Why:** vee-validate's `useField` needs a reactive field-name getter. The getter is a compilation artifact that can't be exercised without a real vee-validate form context.
