<script setup lang="ts">
import { cardContentVariants, type CardContentProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardContentProps>(), {
  as: 'div'
})
</script>

<template>
  <component :is="props.as" :class="cn(cardContentVariants(), props.class)">
    <slot />
  </component>
</template>
