<script setup lang="ts">
import { injectNavigationContext, type NavigationItemProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<NavigationItemProps>()

const { isDark } = useTheme()
const { darkVariant } = injectNavigationContext()
const linkVariant = computed(() => isDark.value ? darkVariant.value : 'solid')
</script>

<template>
  <UiLink :variant="linkVariant" radius="full" :to="props.to" :class="cn(props.class)">
    <slot />
  </UiLink>
</template>
