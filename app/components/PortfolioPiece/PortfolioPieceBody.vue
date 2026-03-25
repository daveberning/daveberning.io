<script setup lang="ts">
import { portfolioPieceBodyVariants, type PortfolioPieceBodyProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<PortfolioPieceBodyProps>()
</script>

<template>
  <div :class="cn(portfolioPieceBodyVariants(), props.class)">
    <slot />
  </div>
</template>
