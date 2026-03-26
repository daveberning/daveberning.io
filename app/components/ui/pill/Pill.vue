<script setup lang="ts">
import { pillVariants, type PillProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PillProps>(), {
  as: 'span',
})
</script>

<template>
  <component :is="props.as" :class="cn(pillVariants({ variant: props.variant, color: props.color, size: props.size }), props.class)">
    <slot />
  </component>
</template>
