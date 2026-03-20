<script setup lang="ts">
import { cn } from '~/utils/twMerge'
import { headerVariants, provideHeaderContext, type HeaderProps } from '.'

const props = withDefaults(defineProps<HeaderProps>(), {
  tag: 'header',
  theme: 'primary',
})

provideHeaderContext({
  theme: props.theme,
})
</script>

<template>
  <component :is="props.tag" :class="cn(headerVariants({ theme: props.theme }))">
    <slot />
  </component>
</template>
