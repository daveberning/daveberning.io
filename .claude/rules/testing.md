# Testing Rules

## Framework & Setup

- Use **Vitest** + `@vue/test-utils` — no Jest globals
- Test files are co-located next to the file under test: `Button.test.ts` lives in `app/components/ui/button/`
- Coverage must reach 100% — run `npm run test:coverage` to verify before marking work complete

## What to Test

- Every component: renders correctly, applies variant classes, passes through `class` prop, renders slots
- Every composable: all return values, state transitions, and edge cases
- Utility functions: all branches and edge cases

## What Not to Do

- Do not mock internal composables when testing a component that uses them — test the integrated behavior
- Do not mock `cn()` or CVA variants — test real class output
- Do not write tests that only assert a component "exists" or "mounts" without verifying behavior

## Test Structure

```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  it('renders default variant', () => {
    const wrapper = mount(Button)
    expect(wrapper.classes()).toContain('...')
  })
})
```

- Group with `describe` matching the component/composable name
- One behavior per `it` block — keep assertions focused
- Use `wrapper.classes()`, `wrapper.text()`, `wrapper.find()` for DOM assertions
