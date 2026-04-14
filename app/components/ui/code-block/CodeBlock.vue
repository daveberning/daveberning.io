<script setup lang="ts">
import { codeBlockBlockAgentBorderVariants, codeBlockVariants, type CodeBlockProps } from '.'
import CodeBlockLabel from './CodeBlockLabel.vue'
import CodeBlockCopyButton from './CodeBlockCopyButton.vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<CodeBlockProps>(), {
  variant: 'inline',
  agent: 'none',
  preClass: '',
  preStyle: undefined,
})

const showLabel = computed(() => props.agent !== 'none')
const showHeader = computed(() => props.variant === 'block' && (!!props.language || !!props.code))
</script>

<template>
  <code v-if="props.variant === 'inline'" :class="cn(codeBlockVariants({ variant: 'inline', agent: props.agent }), props.class)">
    <slot />
  </code>

  <div v-else :class="cn(codeBlockVariants({ variant: 'block', agent: props.agent }), codeBlockBlockAgentBorderVariants({ agent: props.agent }), props.class)">
    <CodeBlockLabel v-if="showLabel" :agent="props.agent" />

    <div
      v-if="showHeader"
      :class="cn('flex items-center justify-between px-4 py-2 border-b border-border text-xs text-text-muted')"
    >
      <span v-if="props.language" class="font-mono">{{ props.language }}</span>
      <span v-else />
      <CodeBlockCopyButton v-if="props.code" :code="props.code" />
    </div>

    <pre tabindex="0" :class="cn('overflow-x-auto p-4 text-sm leading-relaxed font-mono m-0', props.preClass)" :style="props.preStyle"><slot /></pre>
  </div>
</template>
