<script setup lang="ts">
import { computed } from 'vue'
import { footerVariants, type FooterProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<FooterProps>(), {
  as: 'footer',
})

const { color, isDark } = useTheme()
const resolvedColor = computed(() => props.color ?? color.value)
const resolvedMode  = computed(() => props.mode  ?? (isDark.value ? 'dark' : 'light'))
</script>

<template>
  <component :is="props.as" :class="cn(footerVariants({ color: resolvedColor, mode: resolvedMode }), props.class)">
    <div class="container text-sm text-center">
      &copy; {{ new Date().getFullYear() }} Dave Berning. All rights reserved.
    </div>
  </component>
</template>
