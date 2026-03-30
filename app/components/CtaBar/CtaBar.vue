<script setup lang="ts">
import { computed } from 'vue'
import { ctaBarVariants, type CtaBarProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CtaBarProps>(), {
  as: 'section',
})

const {
  color,
  isDark
} = useTheme()

const resolvedColor = computed(() => props.color ?? color.value)
const resolvedMode  = computed(() => props.mode  ?? (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <component :is="props.as" :class="cn(ctaBarVariants({ color: resolvedColor, mode: resolvedMode }), props.class)">
    <div class="container">
      <slot />
    </div>
  </component>
</template>
