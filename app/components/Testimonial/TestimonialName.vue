<script setup lang="ts">
import { testimonialNameVariants, injectTestimonialContext, type TestimonialNameProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TestimonialNameProps>()

const { name } = injectTestimonialContext()
</script>

<template>
  <p :class="cn(testimonialNameVariants(), props.class)">{{ name }}</p>
</template>
