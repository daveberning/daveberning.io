<script setup lang="ts">
import { cn } from '~/utils/twMerge'
import { buttonVariants, type ButtonProps } from './index'

const props = withDefaults(defineProps<ButtonProps>(), {
  tag: 'button',
  color: 'primary',
  type: 'solid',
  rounded: 'none',
  buttonType: 'button',
})
</script>

<template>
  <component :is="props.tag" :type="props.buttonType" :class="cn(buttonVariants({ color: props.color, type: props.type, rounded: props.rounded }))">
    <slot />
  </component>
</template>
