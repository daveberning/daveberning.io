---
name: Form Component System Design Decisions
description: CVA structure, context shape, accessibility attribute wiring, and visual design for the Form component system (Form, FormLabel, FormInput, FormTextArea, FormMessage)
type: project
---

The Form component system uses a shared context (provided by `Form`, injected by subcomponents) keyed on a `name` string per field. VeeValidate `useField()` is called in each leaf component using the injected `name`.

**Context shape provided by `Form`:**
- `name: Ref<string>` — the VeeValidate field name; ties label, input/textarea, and message together
- `inputId: ComputedRef<string>` — derived as `\`field-\${name}\``, used for `<label for>` and `<input id>`
- `messageId: ComputedRef<string>` — derived as `\`field-\${name}-message\``, used for `aria-describedby` and the message element's `id`
- `state: Ref<'default' | 'error'>` — drives CVA variant in FormInput, FormTextArea, FormMessage; `Form` computes this from VeeValidate's `errorMessage`

**Accessibility wiring:**
- `FormLabel`: `<label :for="inputId">`
- `FormInput` / `FormTextArea`: `:id="inputId"` + `:aria-describedby="messageId"` (always present, not conditional) + `:aria-invalid="state === 'error'"`
- `FormMessage`: `:id="messageId"` + `role="alert"` + `aria-live="polite"`

**Why aria-describedby is always present (not just on error):**
Pointing at the message element even in default state means screen readers don't lose the association when state flips — no re-announcement lag. The message element renders as empty when no error exists.

**CVA class decisions:**
- Error border uses `border-brand-red` / dark mode `border-brand-red-light` — consistent with button/card's brand token pattern; never Tailwind `border-red-500`
- Error message text uses `text-brand-red` light / `text-brand-red-light` dark — same rationale
- Focus ring on inputs uses `focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]` — mirrors the button's focus pattern exactly
- Input background is `bg-surface` (not `bg-background`) to lift it slightly off the page background, consistent with `surface-raised` layering in the token system
- Inputs use `border-border` in default state; `border-brand-red dark:border-brand-red-light` in error state

**Why:** Established in the initial Form system design (2026-03-25). Keeps error coloring on the brand token system rather than one-off Tailwind palette classes.

**How to apply:** When extending the form system (e.g., adding FormSelect, FormCheckbox), follow the same context injection pattern, same error state token choices, and same aria-describedby-always-present pattern.
