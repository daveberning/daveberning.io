---
name: Icon stubbing for @nuxt/icon in Vitest
description: How to properly stub the Icon component from @nuxt/icon in happy-dom Vitest tests — must stub both "Icon" and "NuxtIcon"
type: feedback
---

When a component uses `<Icon name="..." />` from `@nuxt/icon`, happy-dom tests will fail with "[nuxt] instance unavailable" unless the component is stubbed by both its auto-import alias AND its real runtime name.

The correct stub pattern is:

```ts
const IconStub = { props: ['name', 'size'], template: '<span :data-icon="name" />' }
const globalStubs = { Icon: IconStub, NuxtIcon: IconStub }
```

Then pass `global: { stubs: globalStubs }` to every `mount()` call.

**Why:** `@nuxt/icon` registers the component as `NuxtIcon` at runtime. Nuxt's auto-import resolves `<Icon>` to `NuxtIcon`, but the JSDOM/happy-dom environment has no Nuxt runtime. Stubbing only `Icon` leaves `NuxtIcon` unresolved, which triggers the "instance unavailable" error.

**How to apply:** Any test that mounts a component (directly or transitively) that uses `<Icon>` from `@nuxt/icon` must include `NuxtIcon` in the stubs alongside `Icon`.
