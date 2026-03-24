<script setup lang="ts">
import { cardHeaderVariants, injectCardContext, type CardHeaderProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CardHeaderProps>(), { as: 'div' })

const { variant, mode } = injectCardContext()
</script>

<template>
  <component :is="props.as" :class="cn(cardHeaderVariants({ variant, mode }), props.class)">
    <slot />
  </component>
</template>
