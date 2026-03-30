<script setup lang="ts">
import { toRef } from 'vue'
import { asideVariants, provideAsideContext, type AsideProps } from '.'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<AsideProps>(), {
  color: 'teal',
})

provideAsideContext({
  color: toRef(props, 'color')
})
</script>

<template>
  <UiCardContent :class="cn(asideVariants({ color: props.color }), props.class)">
    <slot />
  </UiCardContent>
</template>
