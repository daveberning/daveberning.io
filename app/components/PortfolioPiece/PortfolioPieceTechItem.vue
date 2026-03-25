<script setup lang="ts">
import { portfolioPieceTechItemVariants, type PortfolioPieceTechItemProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<PortfolioPieceTechItemProps>()
</script>

<template>
  <li :class="cn(portfolioPieceTechItemVariants(), props.class)">
    <slot />
  </li>
</template>
