<script setup lang="ts">
import { tableHeadVariants, type TableHeadProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<TableHeadProps>(), {
  as: 'th',
})
</script>

<template>
  <component :is="props.as" :class="cn(tableHeadVariants(), props.class)">
    <slot />
  </component>
</template>
