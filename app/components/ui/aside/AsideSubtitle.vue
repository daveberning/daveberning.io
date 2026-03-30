<script setup lang="ts">
import { type AsideSubtitleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideSubtitleProps>()
</script>

<template>
  <UiText color="white" :class="cn('text-xs uppercase tracking-widest font-bold', props.class)">
    <slot />
  </UiText>
</template>
