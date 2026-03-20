---
name: vue-cva-component-builder
description: Create slot-based, composable Vue components (with subcomponents) that share context and manage design variants with class-variance-authority. Use whenever Codex must scaffold a component folder (Vue SFCs + index.ts) that exposes parent + subcomponents, colocates variants/types, and avoids prop drilling through provide/inject context utilities.
---

# Vue CVA Component Builder

Follow this workflow to generate reusable Vue components that align with the repository conventions.

## 1. Clarify the Component Contract
- Capture UX intent: required regions/slots, visual variants, supported HTML tags via `as` prop, controlled/uncontrolled state.
- Enumerate subcomponents (e.g., `HeaderNavigation`, `HeaderActions`). Each subcomponent must render children via slots.
- Document shared state: e.g., active item, responsive flags, data attributes. Decide what the context exposes (computed values, refs, callbacks).

## 2. Scaffold the Directory
1. Create `components/<Name>/` with:
   - `Name.vue` (root component)
   - One SFC per subcomponent (`NameSection.vue`, etc.)
   - `index.ts` that houses the shared context setup (via `useCreateContext`), variant helpers, prop types, and component exports
2. Mirror the naming from the request verbatim to keep auto-imports predictable.
3. Use PascalCase filenames; import paths in `index.ts` should be relative (`./Name.vue`).

## 3. Build the Root Component
- Use `<script setup lang="ts">`.
- Define `props` interface in `index.ts`; use `const props = defineProps<NameProps>()` (or `withDefaults(...)`) and reference `props.foo` to preserve reactivity.
- Do not use `defineSlots` for this skill.
- Import styling + context helpers straight from `./index` (`import { nameVariants, provideNameContext } from './index'`).
- Do not create `forwardedAttrs` and do not create a `mergedClass` computed. Use `cn()` directly in the template `:class` binding.
- Initialize context inline via `provideNameContext(...)`; do not create a `createNameContext` helper:
  ```ts
  import { provideMyThingContext } from "./index";

  const props = defineProps<MyThingProps>();

  provideMyThingContext({
    variant: computed(() => props.variant),
    size: computed(() => props.size),
  });
  ```
- When parents must handle DOM refs (e.g., measure height), expose registration functions inside the context rather than passing refs down.

## 4. Implement Subcomponents
- Each subcomponent injects the context via the exported hook and immediately destructures the values it needs:
  ```ts
  import { injectMyThingContext } from "./index";
  const { navClasses, registerItem } = injectMyThingContext();
  ```
  `useCreateContext` already throws if the component is rendered outside the provider, so custom guard strings are rarely needed.
- Slots remain the primary extensibility API; only expose props when they influence layout (e.g., `as`, `variant`).
- Merge subcomponent-specific variants in their own `cva` call when layout differs; colocate them in the same `index.ts` for discoverability.

## 5. Author `index.ts`
- Start the file with imports for `cva`, `VariantProps`, and `useCreateContext` (from `~/composables/useCreateContext`). Keep component imports (`./Name.vue`) near the bottom to avoid circular worries.
- **Context block**:
  1. Define the context interface (computed flags, refs, callbacks).
  2. Instantiate helpers once: `const [injectMyThingContext, provideMyThingContext] = useCreateContext<MyThingContext>('MyThing');`
  3. Export both helpers only. Do not add a `createMyThingContext` factory.
- **Types section**: export the props interfaces plus inferred variant helper types (`VariantProps<typeof headerVariants>`). Keep prop definitions flat; read-only arrays and literal unions keep autocomplete tight.
- **Variants section**: define a `cva` per component/subcomponent. Include `compoundVariants` when context state needs to map to classes.
- **Components section**: import and export the Vue SFCs (parent default, subcomponents named). Because the context helpers live in this file, other modules—including the SFCs themselves—can import `injectMyThingContext` / `provideMyThingContext` straight from `./index`.

## 6. Provide + Inject Context
- Always rely on `useCreateContext` to keep injection keys/type safety consistent; prefer the naming convention `inject<Component>Context` and `provide<Component>Context`.
- When subcomponents only need a subset of the context, destructure during injection for clarity (`const { isSticky } = injectHeaderContext();`).
- If multiple providers share the context (e.g., multiple tabs), pass an array of component names to `useCreateContext` to improve error messaging.

## 7. Compose Slots + Variants
- Favor a `default` slot plus named slots for optional regions. Example: `<slot name="actions" />` for button clusters.
- Accept `as`/`tag` props so callers can switch semantics without rewriting markup.
- Use the exported `cva` helpers to style both parent and children consistently; call `cn()` inline in the template instead of creating `mergedClass` computed state.
- Use `props.foo` for prop reads to preserve reactivity. Destructure injected context values as needed (`const { theme } = injectHeaderContext()`).

## 8. Testing + Validation
- Render the component locally with representative slot content to confirm context wiring.
- Ensure tree-shakable exports by referencing components through `index.ts` only.
- When possible, add Storybook stories or playground files that show each variant + slot combination.

## References
- Use [`references/component-patterns.md`](references/component-patterns.md) for code templates covering directory layout, base Vue SFC scaffolds, context helpers, and the canonical `index.ts` structure.
- Extend or copy the snippets verbatim, then adapt prop names/variants to match the feature request.
