<script setup lang="ts">
import { injectPortfolioPieceContext, type PortfolioPieceTechItemProps } from '.'
import Pill from '~/components/ui/pill/Pill.vue'

const props = defineProps<PortfolioPieceTechItemProps>()

const {
  color
} = injectPortfolioPieceContext()
</script>

<template>
  <UiPill as="li" variant="outline" size="small" :color="color" :class="props.class">
    <slot />
  </UiPill>
</template>
