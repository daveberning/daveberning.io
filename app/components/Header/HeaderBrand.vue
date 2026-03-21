<script setup lang="ts">
import { headerBrandVariants, injectHeaderContext, type HeaderBrandProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<HeaderBrandProps>(), {
  to: '/'
})

const { variant } = injectHeaderContext()
</script>

<template>
  <NuxtLink :to="props.to" :class="cn(headerBrandVariants({ variant }), props.class, 'font-black')">
    <slot />
  </NuxtLink>
</template>
