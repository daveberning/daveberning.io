<script setup lang="ts">
import { toRef } from 'vue'
import { cardVariants, provideCardContext, type CardProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardProps>(), {
  as: 'div',
  variant: 'solid',
})

provideCardContext({
  variant: toRef(props, 'variant'),
  color:   toRef(props, 'color'),
})
</script>

<template>
  <component :is="props.as" :class="cn(cardVariants({ variant: props.variant, color: props.color }), props.class)">
    <slot />
  </component>
</template>
