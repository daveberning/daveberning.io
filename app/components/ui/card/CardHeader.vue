<script setup lang="ts">
import { cardHeaderVariants, injectCardContext, type CardHeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<CardHeaderProps>()

const { variant, mode } = injectCardContext()
</script>

<template>
  <div :class="cn(cardHeaderVariants({ variant, mode }), props.class)">
    <slot />
  </div>
</template>
