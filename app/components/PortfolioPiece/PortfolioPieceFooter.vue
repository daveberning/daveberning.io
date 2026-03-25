<script setup lang="ts">
import { portfolioPieceFooterVariants, type PortfolioPieceFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortfolioPieceFooterProps>(), {
  as: 'footer',
})
</script>

<template>
  <component :is="props.as" :class="cn(portfolioPieceFooterVariants(), props.class)">
    <slot />
  </component>
</template>
