<script setup lang="ts">
import type { AgentSlug } from '~/components/ui/code-block'

interface Props {
  agent?: AgentSlug
}

const props = withDefaults(defineProps<Props>(), {
  agent: 'none',
})
</script>

<template>
  <UiCodeBlock variant="inline" :agent="props.agent">
    <slot />
  </UiCodeBlock>
</template>
