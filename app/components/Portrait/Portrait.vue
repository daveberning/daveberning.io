<script setup lang="ts">
import { computed } from 'vue'
import { portraitVariants, type PortraitProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<PortraitProps>(), {
  size: 'large',
})

const { color } = useTheme()

const src = computed(() =>
  props.size === 'small'
    ? `/portraits/dave-${color.value}-sm.webp`
    : `/portraits/dave-${color.value}.webp`,
)
</script>

<template>
  <NuxtPicture
    :key="src"
    :src="src"
    v-bind="props.size === 'small' ? { width: 500, height: 500 } : { sizes: 'sm:100vw md:100vw lg:560px xl:608px' }"
    :img-attrs="{ class: cn(portraitVariants({ size: props.size }), props.class), alt: 'Portrait of Dave Berning, a Senior Front-End Software Engineer' }" />
</template>
