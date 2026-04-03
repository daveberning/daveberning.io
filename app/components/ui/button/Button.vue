<script setup lang="ts">
import { buttonVariants, type ButtonProps } from '.'
import { useThemeMode } from '~/composables/useThemeMode'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
})

const mode = useThemeMode()
</script>

<template>
  <component :is="props.as" :class="cn(buttonVariants({ color: props.color, variant: props.variant, size: props.size, radius: props.radius, mode }), props.class)">
    <slot />
  </component>
</template>
