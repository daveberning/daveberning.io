<script setup lang="ts">
import { cn } from '~/utils/twMerge'
import { cardVariants, type CardProps } from './index'

const props = withDefaults(defineProps<CardProps>(), {
  tag: 'section',
  color: 'primary'
})

</script>

<template>
  <component :is="props.tag" :class="cn(cardVariants({ color: props.color }))">
    <slot />
  </component>
</template>
