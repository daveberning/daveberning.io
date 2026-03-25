<script setup lang="ts">
import { linkVariants, type LinkProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<LinkProps>()
</script>

<template>
  <NuxtLink :is="props.as" :to="props.to" :class="cn(linkVariants({ variant: props.variant, size: props.size, radius: props.radius }), props.class)">
    <slot />
  </NuxtLink>
</template>
