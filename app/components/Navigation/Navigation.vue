<script setup lang="ts">
import { toRef } from 'vue'
import { navigationVariants, provideNavigationContext, type NavigationProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<NavigationProps>(), {
  darkVariant: 'outline'
})

provideNavigationContext({
  variant: toRef(props, 'variant'),
  darkVariant: toRef(props, 'darkVariant'),
  color: toRef(props, 'color'),
  darkColor: toRef(props, 'darkColor'),
})
</script>

<template>
  <nav :class="cn(navigationVariants(), props.class)">
    <slot />
  </nav>
</template>
