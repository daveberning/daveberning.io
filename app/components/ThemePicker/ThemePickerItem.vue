<script setup lang="ts">
import { computed } from 'vue'
import { type ThemePickerItemProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<ThemePickerItemProps>()
const emit = defineEmits<{ select: [] }>()

const {
  isDark
} = useTheme()

const ringColor = computed(() => isDark.value
  ? 'focus-visible:ring-white'
  : 'focus-visible:ring-black'
)

const borderClass = computed(() => isDark.value
  ? 'border-white'
  : 'border-black'
)
</script>

<template>
  <button
    type="button"
    :title="`Change to the ${props.name} theme`"
    :aria-label="`Change to the ${props.name} theme`"
    :aria-pressed="props.selected"
    :class="cn('size-4 rounded-full cursor-pointer transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
      ringColor,
      props.selected
        ? cn('scale-150 border-2', borderClass)
        : cn('border hover:scale-150', borderClass),
      props.class,
    )"
    :style="{ backgroundColor: props.color }"
    @click="emit('select')"
  />
</template>
