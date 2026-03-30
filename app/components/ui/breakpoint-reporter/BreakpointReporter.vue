<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { type BreakpointReporterProps, getBreakpointLabel } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<BreakpointReporterProps>(), {
  dev: import.meta.dev,
})

const currentLabel = ref<ReturnType<typeof getBreakpointLabel>>('XS')

function onResize() {
  currentLabel.value = getBreakpointLabel(window.innerWidth)
}

onMounted(() => {
  currentLabel.value = getBreakpointLabel(window.innerWidth)
  window.addEventListener('resize', onResize)
})

onUnmounted(() => window.removeEventListener('resize', onResize))
</script>

<template>
  <div v-if="props.dev" :class="cn('fixed right-0 top-1/4 -translate-y-1/2 z-50 bg-theme-dark/80 text-white text-xs font-black p-3 rounded-l-md select-none pointer-events-none', props.class)" aria-hidden="true">
    {{ currentLabel }}
  </div>
</template>
