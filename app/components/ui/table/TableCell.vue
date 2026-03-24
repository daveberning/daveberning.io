<script setup lang="ts">
import { tableCellVariants, type TableCellProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<TableCellProps>(), {
  as: 'td',
})
</script>

<template>
  <component :is="props.as" :class="cn(tableCellVariants(), props.class)">
    <slot />
  </component>
</template>
