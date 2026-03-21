<script setup lang="ts">
import { ref } from 'vue'
import { themePickerVariants, THEMES, type ThemePickerProps } from '.'
import ThemePickerItem from './ThemePickerItem.vue'
import { cn } from '~/lib/utils'
import { useTheme } from '~/composables/useTheme'

const props = withDefaults(defineProps<ThemePickerProps>(), {
  orientation: 'vertical',
})

const { color, isDark, setColor, toggleDark } = useTheme()
const containerRef = ref<HTMLElement | null>(null)

function getButtons(): HTMLButtonElement[] {
  return Array.from(containerRef.value?.querySelectorAll('button') ?? [])
}

function onKeyDown(event: KeyboardEvent) {
  const isVertical = props.orientation === 'vertical'
  const isPrev = (isVertical && event.key === 'ArrowUp') || (!isVertical && event.key === 'ArrowLeft')
  const isNext = (isVertical && event.key === 'ArrowDown') || (!isVertical && event.key === 'ArrowRight')

  if (!isPrev && !isNext) return

  event.preventDefault()
  const buttons = getButtons()
  const idx = buttons.indexOf(event.target as HTMLButtonElement)
  if (idx === -1) return

  const next = isPrev
    ? (idx - 1 + buttons.length) % buttons.length
    : (idx + 1) % buttons.length

  buttons[next]?.focus()
}
</script>

<template>
  <div
    ref="containerRef"
    role="toolbar"
    aria-label="Theme and appearance settings"
    :class="cn(themePickerVariants({ orientation: props.orientation }), props.class)"
    @keydown="onKeyDown"
  >
    <!-- Dark mode toggle — always first -->
    <button
      type="button"
      :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      :aria-pressed="isDark"
      :class="cn(
        'size-4 rounded-full cursor-pointer overflow-hidden transition-all duration-200',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        isDark ? 'focus-visible:ring-white' : 'focus-visible:ring-black',
        isDark ? 'border border-white hover:scale-150' : 'border border-black hover:scale-150',
      )"
      style="background: linear-gradient(135deg, #18181b 50%, #f4f4f5 50%)"
      @click="toggleDark"
    />

    <!-- Theme color circles -->
    <ThemePickerItem
      v-for="t in THEMES"
      :key="t.name"
      :name="t.name"
      :color="t.color"
      :selected="color === t.name"
      @select="setColor(t.name)"
    />
  </div>
</template>
