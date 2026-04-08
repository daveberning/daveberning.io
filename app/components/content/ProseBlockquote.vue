<script setup lang="ts">
import type { BlockquoteProps } from '~/components/ui/blockquote'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<BlockquoteProps>(), {
  as: 'blockquote',
})
</script>

<template>
  <UiBlockquote :as="props.as" :class="cn(props.class)">
    <slot />
  </UiBlockquote>
</template>
