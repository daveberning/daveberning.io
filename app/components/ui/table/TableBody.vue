<script setup lang="ts">
import { tableBodyVariants, type TableBodyProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TableBodyProps>()
</script>

<template>
  <tbody :class="cn(tableBodyVariants(), props.class)">
    <slot />
  </tbody>
</template>
