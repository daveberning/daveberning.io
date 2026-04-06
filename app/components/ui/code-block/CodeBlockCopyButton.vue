<script setup lang="ts">
import type { CodeBlockCopyButtonProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<CodeBlockCopyButtonProps>()

const copied = ref(false)
let timeout: ReturnType<typeof setTimeout> | undefined

async function copy() {
  await navigator.clipboard.writeText(props.code)
  copied.value = true
  clearTimeout(timeout)
  timeout = setTimeout(() => {
    copied.value = false
  }, 2000)
}

onUnmounted(() => {
  clearTimeout(timeout)
})
</script>

<template>
  <button
    type="button"
    :aria-label="copied ? 'Copied' : 'Copy code to clipboard'"
    :class="cn('inline-flex items-center gap-1 text-xs text-text-muted hover:text-text transition-colors cursor-pointer', props.class)"
    @click="copy"
  >
    <Icon v-if="copied" name="lucide:check" size="14" />
    <Icon v-else name="lucide:copy" size="14" />
    <span>{{ copied ? 'Copied' : 'Copy' }}</span>
  </button>
</template>
