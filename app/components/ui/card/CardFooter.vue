<script setup lang="ts">
import { cardFooterVariants, injectCardContext, type CardFooterProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<CardFooterProps>()

const { variant } = injectCardContext()
</script>

<template>
  <div :class="cn(cardFooterVariants({ variant }), props.class)">
    <slot />
  </div>
</template>
