<script setup lang="ts">
import { type AsideSectionProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideSectionProps>()
</script>

<template>
  <div :class="cn('flex flex-col gap-2', props.class)">
    <slot />
  </div>
</template>
