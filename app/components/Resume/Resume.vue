<script setup lang="ts">
import { resumeVariants, type ResumeProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<ResumeProps>(), {
  as: 'article',
})
</script>

<template>
  <component :is="props.as" :class="cn(resumeVariants(), props.class)">
    <slot />
  </component>
</template>
