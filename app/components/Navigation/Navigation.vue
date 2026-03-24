<script setup lang="ts">
import { toRef } from 'vue'
import { navigationVariants, provideNavigationContext, type NavigationProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<NavigationProps>(), { darkVariant: 'outline' })

provideNavigationContext({
  darkVariant: toRef(props, 'darkVariant')
})
</script>

<template>
  <nav :class="cn(navigationVariants(), props.class)">
    <slot />
  </nav>
</template>
