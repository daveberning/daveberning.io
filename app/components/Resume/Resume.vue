<script setup lang="ts">
import { resumeVariants, type ResumeProps } from '.'

const props = withDefaults(defineProps<ResumeProps>(), {
  as: 'article',
})
</script>

<template>
  <component :is="props.as" :class="[resumeVariants(), props.class]">
    <slot />
  </component>
</template>
