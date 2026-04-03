<script setup lang="ts">
import { toRef } from 'vue'
import { headerVariants, provideHeaderContext, type HeaderProps } from '.'
import { useThemeMode } from '~/composables/useThemeMode'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'teal'
})

const mode = useThemeMode()

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
