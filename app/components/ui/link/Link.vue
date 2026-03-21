<script setup lang="ts">
import { computed } from 'vue'
import { linkVariants, type LinkProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<LinkProps>()

const { isDark } = useTheme()
const mode = computed(() => isDark.value ? 'dark' : 'light')
</script>

<template>
  <NuxtLink :is="props.as" :to="props.to" :class="cn(linkVariants({ variant: props.variant, size: props.size, radius: props.radius, mode }), props.class)">
    <slot />
  </NuxtLink>
</template>
