<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { storeToRefs } from 'pinia'
import { mergeClass } from '~/utils/merge-class'
import { themeOptions, useThemeStore } from '~/stores/theme'
import {
  themePickerListVariants,
  themePickerSwatchVariants,
  themePickerModeToggleVariants,
  type ThemePickerProps,
} from '.'

const props = withDefaults(defineProps<ThemePickerProps>(), {
  orientation: 'vertical',
})

const attrs = useAttrs()
const themeStore = useThemeStore()
const { active, mode } = storeToRefs(themeStore)

const listClass = computed(() =>
  mergeClass(
    themePickerListVariants({ orientation: props.orientation }),
    attrs.class as Parameters<typeof mergeClass>[number],
  ),
)

const forwardedAttrs = computed(() =>
  Object.fromEntries(
    Object.entries(attrs).filter(([key]) => key !== 'class'),
  ),
)

const swatchClass = (theme: typeof themeOptions[number]) =>
  themePickerSwatchVariants({
    theme,
    state: active.value === theme ? 'active' : 'idle',
  })

const modeToggleClass = computed(() =>
  themePickerModeToggleVariants({
    mode: mode.value,
    state: mode.value === 'dark' ? 'active' : 'idle',
  }),
)

const modeToggleLabel = computed(() =>
  mode.value === 'dark' ? 'Switch to light mode' : 'Switch to dark mode',
)
</script>

<template>
  <ul v-bind="forwardedAttrs" :class="listClass">
    <li>
      <button
        type="button"
        :class="modeToggleClass"
        :aria-label="modeToggleLabel"
        :aria-pressed="mode === 'dark'"
        @click="themeStore.toggleMode()"
      >
        <span class="sr-only">{{ modeToggleLabel }}</span>
        <svg
          v-if="mode === 'light'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12m0-14a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1m9-5a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1m-15 0a1 1 0 0 1-1 1H4a1 1 0 0 1 0-2h1a1 1 0 0 1 1 1m12.657 5.657a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414m-9.9-9.9a1 1 0 0 1-1.414 0l-.707-.707a1 1 0 0 1 1.414-1.414l.707.707a1 1 0 0 1 0 1.414m9.9-1.414a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0m-9.9 9.9a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="h-4 w-4"
          aria-hidden="true"
        >
          <path
            fill="currentColor"
            d="M17.75 15.75A8.75 8.75 0 0 1 8 6a.75.75 0 0 0-.866-.741a9.751 9.751 0 1 0 11.607 11.607a.75.75 0 0 0-.742-.866A8.688 8.688 0 0 1 17.75 15.75"
          />
        </svg>
      </button>
    </li>
    <li v-for="theme in themeOptions" :key="theme">
      <button
        type="button"
        :class="swatchClass(theme)"
        :aria-label="`Switch to ${theme} theme`"
        :aria-pressed="active === theme"
        :title="`Activate ${theme} theme`"
        @click="themeStore.active = theme"
      >
        <span class="sr-only">Activate the {{ theme }} theme</span>
      </button>
    </li>
  </ul>
</template>
