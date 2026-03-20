<script setup lang="ts">
import { navigationVariants, type NavigationProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<NavigationProps>()
</script>

<template>
  <nav :class="cn(navigationVariants(), props.class)">
    <slot />
  </nav>
</template>
