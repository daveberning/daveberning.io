<script setup lang="ts">
import { tableVariants, type TableProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<TableProps>(), {
  as: 'table',
})
</script>

<template>
  <component :is="props.as" :class="cn(tableVariants(), props.class)">
    <slot />
  </component>
</template>
