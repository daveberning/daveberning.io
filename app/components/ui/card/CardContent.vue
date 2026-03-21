<script setup lang="ts">
import { cardContentVariants, type CardContentProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<CardContentProps>()
</script>

<template>
  <div :class="cn(cardContentVariants(), props.class)">
    <slot />
  </div>
</template>
