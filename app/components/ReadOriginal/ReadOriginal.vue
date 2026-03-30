<script setup lang="ts">
import type { ReadOriginalProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ReadOriginalProps>(), {
  label: 'Read the full article',
})

const ariaLabel = computed(() => {
  const base = props.label
  return props.platform ? `${base} on ${props.platform} (opens in new tab)` : `${base} (opens in new tab)`
})
</script>

<template>
  <div :class="cn('relative rounded-lg border border-border bg-surface hover:bg-surface-raised transition-colors overflow-hidden', props.class)">
    <div class="absolute inset-y-0 left-0 w-1 bg-theme" aria-hidden="true" />
    <div class="pl-8 pr-6 py-5">
      <UiText v-if="props.platform" class="mb-1">
        This is a summary of the article published on <strong>{{ props.platform }}</strong>
      </UiText>
      <UiLink
        :to="props.href"
        target="_blank"
        rel="noopener noreferrer"
        :aria-label="ariaLabel"
        variant="text"
        class="group font-semibold text-base gap-1.5 h-auto px-0 hover:no-underline hover:text-theme-dark dark:text-theme">
        {{ props.label }}
        <Icon name="lucide:arrow-up-right" class="size-4 motion-safe:transition-transform group-hover:translate-x-px group-hover:-translate-y-px" aria-hidden="true"/>
      </UiLink>
    </div>
  </div>
</template>
