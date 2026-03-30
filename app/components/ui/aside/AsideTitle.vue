<script setup lang="ts">
import { injectAsideContext, type AsideTitleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideTitleProps>()

const { color: _color } = injectAsideContext()
</script>

<template>
  <UiText as="h2" color="white" :class="cn('text-xl font-semibold', props.class)">
    <slot />
  </UiText>
</template>
