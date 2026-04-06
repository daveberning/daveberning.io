<script setup lang="ts">
defineOptions({ inheritAttrs: false })

import type { AgentSlug } from '~/components/ui/code-block'

const attrs = useAttrs()

interface Props {
  code?: string
  language?: string
  filename?: string | null
  highlights?: number[]
  meta?: string | null
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  code: '',
  language: '',
  filename: null,
  highlights: () => [],
  meta: null,
})

const agent = computed<AgentSlug>(() => {
  const match = props.meta?.match(/agent="([^"]+)"/)
  return (match?.[1] as AgentSlug) ?? 'none'
})
</script>

<template>
  <UiCodeBlock
    variant="block"
    :language="props.language"
    :agent="agent"
    :code="props.code"
    :pre-class="props.class"
    :pre-style="attrs.style as string | Record<string, string> | undefined"
  >
    <slot />
  </UiCodeBlock>
</template>
