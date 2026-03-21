<script setup lang="ts">
import { computed } from 'vue'
import { buttonVariants, type ButtonProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ButtonProps>(), {
  as: 'button',
})

const { isDark } = useTheme()
const mode = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <component :is="props.as" :class="cn(buttonVariants({ color: props.color, variant: props.variant, size: props.size, radius: props.radius, mode }), props.class)">
    <slot />
  </component>
</template>
