<script setup lang="ts">
import { textVariants, type TextProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<TextProps>(), { as: 'p' })
const attrs = useAttrs()
</script>

<template>
  <component :is="props.as" :class="cn(textVariants({ as: props.as }), attrs.class)">
    <slot />
  </component>
</template>
