<script setup lang="ts">
import { testimonialNameVariants, type TestimonialNameProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TestimonialNameProps>()
</script>

<template>
  <p :class="cn(testimonialNameVariants(), props.class)">
    <slot />
  </p>
</template>
