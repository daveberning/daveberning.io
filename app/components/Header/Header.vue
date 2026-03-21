<script setup lang="ts">
import { toRef } from 'vue'
import { headerVariants, provideHeaderContext, type HeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<HeaderProps>(), {
  variant: 'teal'
})

provideHeaderContext({
  variant: toRef(props, 'variant')
})
</script>

<template>
  <header :class="cn(headerVariants({ variant: props.variant }), props.class)">
    <div class="flex justify-between container">
      <slot />
    </div>
  </header>
</template>
