# Component Patterns

## Directory Layout
```
components/Header/
├── Header.vue
├── HeaderNavigation.vue
└── index.ts
```

## Parent Component Template (script setup)
```vue
<script setup lang="ts">
import { computed } from "vue";
import { headerVariants, provideHeaderContext, type HeaderProps } from ".";
import { cn } from '~/utils/twMerge';

const props = defineProps<HeaderProps>()

provideHeaderContext({
  variant: computed(() => props.variant),
  navigation: computed(() => props.navigation),
})
</script>

<template>
  <component :is="props.tag ?? 'section'" :class="cn(headerVariants({ variant: props.variant, navigation: props.navigation }))">
    <slot />
  </component>
</template>
```

## Subcomponent Template
```vue
<script setup lang="ts">
import { injectHeaderContext } from ".";

const {
  navigation
} = injectHeaderContext();
</script>

<template>
  <div>
    <slot />
  </div>
</template>
```

## `index.ts` Example (context + variants + exports)
```ts
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { useCreateContext } from "~/composables/useCreateContext";

/* Context
--------------------------------------------------------------------- */
const [
  injectHeaderContext,
  provideHeaderContext
] = useCreateContext<HeaderContext>("Header");

export {
  injectHeaderContext,
  provideHeaderContext,
}

/* Types
--------------------------------------------------------------------- */
export interface HeaderContext {
  navigation: Record<string, any>[]
  variant: HeaderVariants['variant'],
}

export interface HeaderProps {
  navigation: Record<string, any>[]
  variant: HeaderVariants['variant'],
  tag?: keyof HTMLElementTagNameMap,
}

export type HeaderVariants = VariantProps<typeof headerVariants>;

/* Variants
--------------------------------------------------------------------- */
export const headerVariants = cva(
  "flex flex-col gap-4",
  {
    variants: {
      variant: {
        brand: "bg-brand-600 text-white",
        neutral: "bg-surface text-foreground",
      },
    },
    defaultVariants: {
      variant: "neutral",
    },
  }
);

/* Components
--------------------------------------------------------------------- */
import Header from "./Header.vue";
import HeaderNavigation from "./HeaderNavigation.vue";

export {
  Header as default,
  HeaderNavigation,
}
```
