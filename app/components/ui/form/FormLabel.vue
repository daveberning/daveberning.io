<script setup lang="ts">
import { computed } from 'vue'
import { type FormLabelProps } from '.'

const props = defineProps<FormLabelProps>()
const inputId = computed(() => `field-${props.name}`)
</script>

<template>
  <UiText as="label" :for="inputId" class="mb-1 block">
    <slot />
  </UiText>
</template>
