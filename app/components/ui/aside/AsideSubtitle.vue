<script setup lang="ts">
import { injectAsideContext, type AsideSubtitleProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<AsideSubtitleProps>()

const { color: _color } = injectAsideContext()
</script>

<template>
  <UiText color="white" :class="cn('text-xs font-semibold uppercase tracking-widest', props.class)">
    <slot />
  </UiText>
</template>
