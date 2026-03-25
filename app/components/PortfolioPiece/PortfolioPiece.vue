<script setup lang="ts">
import { toRef } from 'vue'
import { portfolioPieceVariants, providePortfolioPieceContext, type PortfolioPieceProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortfolioPieceProps>(), {
  as: 'article',
  accent: 'none',
})

providePortfolioPieceContext({
  variant: toRef(props, 'variant'),
  color: toRef(props, 'color'),
})
</script>

<template>
  <component :is="props.as" :class="cn(portfolioPieceVariants({ variant: props.variant, color: props.color, accent: props.accent }), props.class)">
    <slot />
  </component>
</template>
