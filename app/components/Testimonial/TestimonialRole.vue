<script setup lang="ts">
import { testimonialRoleVariants, injectTestimonialContext, type TestimonialRoleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TestimonialRoleProps>()

const { role, company } = injectTestimonialContext()
</script>

<template>
  <p :class="cn(testimonialRoleVariants(), props.class)">{{ role }} &middot; {{ company }}</p>
</template>
