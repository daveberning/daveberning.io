<script setup lang="ts">
import type { BlockquoteProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<BlockquoteProps>(), {
  as: 'blockquote',
})
</script>

<template>
  <component
    :is="props.as"
    :class="cn('relative pl-6 pr-5 py-5 my-6 rounded-r-lg bg-surface border-l-4 border-theme italic text-text leading-relaxed', props.class)"
  >
    <slot />
  </component>
</template>
