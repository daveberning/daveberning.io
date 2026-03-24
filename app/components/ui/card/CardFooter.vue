<script setup lang="ts">
import { cardFooterVariants, injectCardContext, type CardFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardFooterProps>(), { as: 'div' })

const { variant, mode } = injectCardContext()
</script>

<template>
  <component :is="props.as" :class="cn(cardFooterVariants({ variant, mode }), props.class)">
    <slot />
  </component>
</template>
