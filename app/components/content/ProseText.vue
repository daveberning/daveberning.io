<script setup lang="ts">
import { textVariants, type TextAs, type TextVariants } from '~/components/ui/text'
import { cn } from '~/lib/utils'

const props = defineProps({
  as:    { type: String, default: 'p' },
  color: { type: String, default: 'inherit' },
})
</script>

<template>
  <component
    :is="props.as"
    :class="cn(textVariants({ as: props.as as TextAs, color: props.color as TextVariants['color'] }))"
  >
    <slot />
  </component>
</template>
