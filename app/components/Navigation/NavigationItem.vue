<script setup lang="ts">
import { injectNavigationContext, type NavigationItemProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<NavigationItemProps>()

const {
  isDark
} = useTheme()

const {
  variant,
  darkVariant,
  color,
  darkColor,
} = injectNavigationContext()

const linkVariant = computed(() => {
  if (variant.value) return variant.value
  return isDark.value ? darkVariant.value : 'solid'
})

const linkColor = computed(() => {
  if (color.value) return color.value
  return isDark.value ? (darkColor.value ?? 'theme') : 'theme'
})
</script>

<template>
  <UiLink :variant="linkVariant" :color="linkColor" radius="full" :to="props.to" :class="cn(props.class)">
    <slot />
  </UiLink>
</template>
