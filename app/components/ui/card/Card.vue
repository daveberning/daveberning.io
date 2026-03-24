<script setup lang="ts">
import { computed, toRef } from 'vue'
import { cardVariants, provideCardContext, type CardProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
  variant: 'default',
})

const { isDark } = useTheme()
const resolvedMode = computed(() => props.mode ?? (isDark.value ? 'dark' : 'light'))

provideCardContext({
  variant: toRef(props, 'variant'),
  mode: resolvedMode
})
</script>

<template>
  <component :is="props.as" :class="cn(cardVariants({ variant: props.variant, mode: resolvedMode }), props.class)">
    <slot />
  </component>
</template>
