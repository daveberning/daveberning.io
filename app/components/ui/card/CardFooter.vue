<script setup lang="ts">
import { cardFooterVariants, injectCardContext, type CardFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardFooterProps>(), { as: 'div' })

const {
  variant,
  color
} = injectCardContext()
</script>

<template>
  <component :is="props.as" :class="cn(cardFooterVariants({ variant, color }), props.class)">
    <slot />
  </component>
</template>
