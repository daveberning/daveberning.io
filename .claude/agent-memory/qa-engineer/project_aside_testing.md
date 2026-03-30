---
name: Aside compound component testing patterns
description: How to test the Aside compound component family — UiText stub, provide/inject context strategy, AsideList item rendering
type: project
---

The `app/components/ui/aside/` component family (Aside, AsideTitle, AsideSubtitle, AsideSection, AsideList) is fully tested at 100% coverage in `Aside.test.ts`.

**UiText stub pattern:** All subcomponents render via `<UiText>`, which is a Nuxt auto-import not available in the test environment. Stub it as:

```ts
const UiTextStub = {
  inheritAttrs: false,
  props: ['as', 'color'],
  template: '<component :is="as || \'p\'" v-bind="$attrs"><slot /></component>',
}
```

Pass via `global: { stubs: { UiText: UiTextStub } }`. The `inheritAttrs: false` + `v-bind="$attrs"` pairing is essential so `class` props applied to UiText reach the rendered element and can be asserted with `wrapper.classes()`.

**Provide/inject context strategy:** All four subcomponents call `injectAsideContext()` on setup and throw if mounted without a provider. Never mount them standalone — always wrap in `Aside` root via a `mountInsideAside()` helper:

```ts
function mountInsideAside(childNode, asideProps = {}) {
  return mount(Aside, {
    props: asideProps,
    slots: { default: () => childNode },
    global: globalStubs,
  })
}
```

Then use `wrapper.findComponent(AsideTitle)` etc. to reach the subcomponent for assertions.

**AsideList item rendering:** Items are joined with ` · ` (space, middle-dot, space) via a computed `formattedItems`. Test the empty array case (renders `''`), single item (no separator), and multi-item (joined string). Class assertions for AsideList require finding the `<p>` element inside the stub.

**Why:** Context injection throws if no provider is present. The `mountInsideAside` helper prevents setup errors and mirrors real usage — always valid since subcomponents are only meaningful inside Aside.

**How to apply:** Use this same pattern for any future compound component whose subcomponents call inject on setup.
