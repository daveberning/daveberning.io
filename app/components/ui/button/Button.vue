<script setup lang="ts">
import { buttonVariants, type ButtonProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
})
</script>

<template>
  <component :is="props.as" :class="cn(buttonVariants({ color: props.color, variant: props.variant, size: props.size, radius: props.radius }), props.class)">
    <slot />
  </component>
</template>
