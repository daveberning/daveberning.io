<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { mergeClass } from '~/utils/merge-class'
import { cardVariants, type CardProps } from '.'
import { useThemeStore } from '~/stores/theme'

const props = withDefaults(defineProps<CardProps>(), {
  tag: 'section',
})

const themeStore = useThemeStore()
const attrs = useAttrs()

const resolvedColor = computed(() => props.color ?? themeStore.active)

const mergedClass = computed(() =>
  mergeClass(cardVariants({ color: resolvedColor.value }), attrs.class as Parameters<typeof mergeClass>[number]),
)

const forwardedAttrs = computed(() => Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class')))
</script>

<template>
  <component :is="props.tag" v-bind="forwardedAttrs" :class="mergedClass">
    <slot />
  </component>
</template>
