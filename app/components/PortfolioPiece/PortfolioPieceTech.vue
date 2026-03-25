<script setup lang="ts">
import { portfolioPieceTechVariants, type PortfolioPieceTechProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<PortfolioPieceTechProps>()
</script>

<template>
  <ul :class="cn(portfolioPieceTechVariants(), props.class)">
    <slot />
  </ul>
</template>
