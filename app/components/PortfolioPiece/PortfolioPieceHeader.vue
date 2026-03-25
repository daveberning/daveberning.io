<script setup lang="ts">
import { portfolioPieceHeaderVariants, type PortfolioPieceHeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortfolioPieceHeaderProps>(), {
  as: 'header',
})
</script>

<template>
  <component :is="props.as" :class="cn(portfolioPieceHeaderVariants(), props.class)">
    <p class="text-base font-semibold text-text">{{ props.title }}</p>
    <p v-if="props.role" class="text-sm text-text-muted">{{ props.role }}</p>
  </component>
</template>
