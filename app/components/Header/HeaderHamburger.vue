<script setup lang="ts">
import { type HeaderHamburgerProps } from '.'
import { useTheme } from '~/composables/useTheme'
import { cn } from '~/lib/utils'

const props = defineProps<HeaderHamburgerProps>()
const emit = defineEmits<{ toggle: [] }>()

const {
  isDark
} = useTheme()
</script>

<template>
  <button
    type="button"
    :aria-label="props.isOpen ? 'Close navigation menu' : 'Open navigation menu'"
    :aria-expanded="props.isOpen"
    aria-controls="mobile-nav-drawer"
    :class="cn(
      'min-w-11 min-h-11 flex items-center justify-center rounded-md',
      'hover:bg-white/10',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme-fg focus-visible:ring-offset-2 focus-visible:ring-offset-theme',
      isDark ? 'text-text' : 'text-white',
      props.class
    )"
    @click="emit('toggle')"
  >
    <Icon :name="props.isOpen ? 'heroicons:x-mark' : 'heroicons:bars-3'" size="24" />
  </button>
</template>
