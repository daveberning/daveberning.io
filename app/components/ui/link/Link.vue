<script setup lang="ts">
import { linkVariants, type LinkProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<LinkProps>(), {
  as: 'NuxtLink',
})
</script>

<template>
  <component :is="props.as" :to="props.to" :href="props.href" :class="cn(linkVariants({ variant: props.variant, size: props.size, radius: props.radius }), props.class)">
    <slot />
  </component>
</template>
