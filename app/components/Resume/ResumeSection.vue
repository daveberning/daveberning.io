<script setup lang="ts">
import { resumeSectionVariants, type ResumeSectionProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ResumeSectionProps>(), {
  as: 'section',
  location: 'main',
})
</script>

<template>
  <component :is="props.as" :class="cn(resumeSectionVariants({ location: props.location }), props.class)">
    <div class="flex flex-col gap-4 print:gap-2">
      <h2 class="text-[0.72rem] font-bold uppercase tracking-widest text-theme print:break-after-avoid print:text-zinc-500">
        {{ props.title }}
      </h2>
      <div :class="cn('flex flex-col gap-4 print:gap-0', props.contentClass)">
        <slot />
      </div>
    </div>
  </component>
</template>
