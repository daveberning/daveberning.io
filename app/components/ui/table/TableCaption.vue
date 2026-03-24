<script setup lang="ts">
import { tableCaptionVariants, type TableCaptionProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TableCaptionProps>()
</script>

<template>
  <caption :class="cn(tableCaptionVariants(), props.class)">
    <slot />
  </caption>
</template>
