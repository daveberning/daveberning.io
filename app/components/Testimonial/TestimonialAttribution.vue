<script setup lang="ts">
import { testimonialAttributionVariants, type TestimonialAttributionProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TestimonialAttributionProps>()
</script>

<template>
  <div :class="cn(testimonialAttributionVariants(), props.class)">
    <hr class="border-border" />
    <div class="flex items-center gap-4">
      <slot />
    </div>
  </div>
</template>
