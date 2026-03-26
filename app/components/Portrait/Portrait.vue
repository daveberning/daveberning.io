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
    ? `/portraits/dave-${color.value}-sm.jpg`
    : `/portraits/dave-${color.value}.png`,
)
</script>

<template>
  <NuxtImg
    :src="src"
    :alt="`Dave Berning — ${color} theme`"
    :class="cn(portraitVariants({ size: props.size }), props.class)"
  />
</template>
