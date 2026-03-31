<script setup lang="ts">
import { resumeEntryVariants, type ResumeEntryProps } from '.'

const props = withDefaults(defineProps<ResumeEntryProps>(), {
  as: 'article',
})
</script>

<template>
  <component :is="props.as" :class="[resumeEntryVariants(), props.class]">
    <div class="flex flex-col gap-3">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div class="min-w-0">
          <h3 class="text-base font-semibold leading-tight text-text print:text-zinc-950">
            {{ props.title }}
          </h3>
          <p class="mt-1 text-sm font-medium leading-6 text-text-muted print:text-zinc-700">
            {{ props.organization }}
            <span v-if="props.location"> · {{ props.location }}</span>
          </p>
        </div>
        <p class="text-[0.76rem] font-semibold uppercase tracking-[0.16em] text-theme sm:pl-6 sm:text-right print:text-zinc-500">
          {{ props.period }}
        </p>
      </div>
      <p v-if="props.summary" class="text-sm leading-6 text-text-muted print:text-zinc-700">
        {{ props.summary }}
      </p>
      <div v-if="$slots.default" class="text-sm leading-6 text-text print:text-zinc-800">
        <slot />
      </div>
    </div>
  </component>
</template>
