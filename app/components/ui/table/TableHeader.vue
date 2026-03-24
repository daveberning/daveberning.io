<script setup lang="ts">
import { tableHeaderVariants, type TableHeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TableHeaderProps>()
</script>

<template>
  <thead :class="cn(tableHeaderVariants(), props.class)">
    <slot />
  </thead>
</template>
