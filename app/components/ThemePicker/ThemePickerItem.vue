<script setup lang="ts">
import { type ThemePickerItemProps } from '.'
import { cn } from '~/lib/utils'

const props = defineProps<ThemePickerItemProps>()
const emit = defineEmits<{ select: [] }>()
</script>

<template>
  <button
    type="button"
    :title="`Change to the ${props.name} theme`"
    :aria-label="`Change to the ${props.name} theme`"
    :aria-pressed="props.selected"
    :class="cn(
      'size-4 rounded-full cursor-pointer transition-all duration-200',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-black dark:focus-visible:ring-white',
      props.selected
        ? 'scale-150 border-2 border-black dark:border-white'
        : 'border border-black dark:border-white hover:scale-150',
      props.class,
    )"
    :style="{ backgroundColor: props.color }"
    @click="emit('select')"
  />
</template>
