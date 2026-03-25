<script setup lang="ts">
import { portfolioPieceFooterVariants, type PortfolioPieceFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortfolioPieceFooterProps>(), {
  as: 'footer',
})
</script>

<template>
  <component :is="props.as" :class="cn(portfolioPieceFooterVariants(), props.class)">
    <span v-if="props.year" class="text-xs text-text-muted">{{ props.year }}</span>
    <UiLink v-if="props.url" :href="props.url" variant="text" size="small" class="ml-auto">
      View Project
    </UiLink>
  </component>
</template>
