<script setup lang="ts">
import { portraitVariants, type PortraitProps } from '.'
import { cn } from '~/lib/utils'

const attrs = useAttrs()
const props = withDefaults(defineProps<PortraitProps>(), {
  alt: 'Portrait',
  size: 'default',
})
</script>

<template>
  <NuxtImg
    :src="props.src"
    :alt="props.alt"
    :class="cn(portraitVariants({ size: props.size }), attrs.class)"
  />
</template>
