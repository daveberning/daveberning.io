<script setup lang="ts">
import { tableRowVariants, type TableRowProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TableRowProps>()
</script>

<template>
  <tr :class="cn(tableRowVariants(), props.class)">
    <slot />
  </tr>
</template>
