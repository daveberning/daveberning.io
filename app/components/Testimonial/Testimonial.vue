<script setup lang="ts">
import { toRef } from 'vue'
import { testimonialVariants, provideTestimonialContext, type TestimonialProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<TestimonialProps>(), {
  as: 'article',
})

provideTestimonialContext({
  name: toRef(props, 'name')
})

</script>

<template>
  <component :is="props.as" :class="cn(testimonialVariants(), props.class)">
    <slot />
  </component>
</template>
