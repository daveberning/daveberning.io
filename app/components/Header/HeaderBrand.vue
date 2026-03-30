<script setup lang="ts">
import { computed } from 'vue'
import { headerBrandVariants, injectHeaderContext, type HeaderBrandProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<HeaderBrandProps>(), {
  to: '/'
})

const {
  variant
} = injectHeaderContext()

const {
  isDark
} = useTheme()

const mode = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <NuxtLink :to="props.to" :class="cn(headerBrandVariants({ variant, mode }), props.class, 'font-black')">
    <slot />
  </NuxtLink>
</template>
