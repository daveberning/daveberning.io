<script setup lang="ts">
import { tableFooterVariants, type TableFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TableFooterProps>()
</script>

<template>
  <tfoot :class="cn(tableFooterVariants(), props.class)">
    <slot />
  </tfoot>
</template>
