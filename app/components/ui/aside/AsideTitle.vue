<script setup lang="ts">
import { type AsideTitleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideTitleProps>()
</script>

<template>
  <UiText as="h2" color="white" :class="cn('text-xl font-semibold', props.class)">
    <slot />
  </UiText>
</template>
