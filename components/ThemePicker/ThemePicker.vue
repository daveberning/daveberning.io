<script setup lang="ts">
import { computed, useAttrs } from 'vue'
import { storeToRefs } from 'pinia'
import { mergeClass } from '~/utils/merge-class'
import { themeOptions, useThemeStore } from '~/stores/theme'
import {
  themePickerListVariants,
  themePickerSwatchVariants,
  type ThemePickerProps,
} from '.'

const props = withDefaults(defineProps<ThemePickerProps>(), {
  orientation: 'vertical',
})

const attrs = useAttrs()
const themeStore = useThemeStore()
const { active } = storeToRefs(themeStore)

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
</script>

<template>
  <ul v-bind="forwardedAttrs" :class="listClass">
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
