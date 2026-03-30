<script setup lang="ts">
import { testimonialRoleVariants, type TestimonialRoleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<TestimonialRoleProps>()
</script>

<template>
  <UiText :class="cn(testimonialRoleVariants(), props.class)">
    <slot />
  </UiText>
</template>
