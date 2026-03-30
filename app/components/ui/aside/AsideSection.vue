<script setup lang="ts">
import { injectAsideContext, type AsideSectionProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideSectionProps>()

const { color: _color } = injectAsideContext()
</script>

<template>
  <div :class="cn('flex flex-col gap-2', props.class)">
    <slot />
  </div>
</template>
