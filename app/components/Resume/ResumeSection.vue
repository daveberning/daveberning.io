<script setup lang="ts">
import { resumeSectionVariants, type ResumeSectionProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ResumeSectionProps>(), {
  as: 'section',
})
</script>

<template>
  <component :is="props.as" :class="cn(resumeSectionVariants(), props.class)">
    <div class="flex flex-col gap-4">
      <h2 class="text-[0.72rem] font-bold uppercase tracking-[0.24em] text-theme print:text-zinc-500">
        {{ props.title }}
      </h2>
      <div :class="cn('flex flex-col gap-4', props.contentClass)">
        <slot />
      </div>
    </div>
  </component>
</template>
