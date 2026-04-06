---
name: navigator.clipboard stubbing in happy-dom
description: Use vi.stubGlobal to mock navigator.clipboard — Object.assign fails because clipboard is a getter-only property in happy-dom
type: feedback
---

`navigator.clipboard` is a getter-only property in the happy-dom environment. `Object.assign(navigator, { clipboard: ... })` throws "Cannot set property clipboard of [object Object] which has only a getter".

The correct approach is:

```ts
beforeEach(() => {
  vi.stubGlobal('navigator', {
    clipboard: { writeText: vi.fn().mockResolvedValue(undefined) },
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})
```

**Why:** `vi.stubGlobal` replaces the global reference entirely rather than mutating the existing object's properties, bypassing the getter restriction.

**How to apply:** Any test that exercises `navigator.clipboard.writeText` must use `vi.stubGlobal` + `vi.unstubAllGlobals` rather than `Object.assign`.
