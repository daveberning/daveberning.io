<script setup lang="ts">
import { computed, toRef } from 'vue'
import { headerVariants, provideHeaderContext, type HeaderProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'teal'
})

const {
  isDark
} = useTheme()

const mode = computed(() => isDark.value ? 'dark' : 'light')

provideHeaderContext({
  variant: toRef(props, 'variant')
})
</script>

<template>
  <header :class="cn(headerVariants({ variant: props.variant, mode }), props.class)">
    <div class="flex justify-between container">
      <slot />
    </div>
  </header>
</template>
