<script setup lang="ts">
import { portfolioPieceHeaderVariants, type PortfolioPieceHeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortfolioPieceHeaderProps>(), {
  as: 'header',
})
</script>

<template>
  <component :is="props.as" :class="cn(portfolioPieceHeaderVariants(), props.class)">
    <UiText as="h2" class="text-xl font-semibold line-clamp-2">{{ props.title }}</UiText>
    <UiText v-if="props.role" class="text-sm text-text-muted">{{ props.role }}</UiText>
  </component>
</template>
