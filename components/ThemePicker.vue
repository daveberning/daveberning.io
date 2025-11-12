<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { themeOptions, type ThemeVariant, useThemeStore } from '~/stores/theme'

const themeStore = useThemeStore()
const { active } = storeToRefs(themeStore)

const themeCircleClass: Record<ThemeVariant, string> = {
  primary: 'bg-primary border-primary-dark',
  blue: 'bg-blue border-blue-dark',
  green: 'bg-green border-green-dark',
  red: 'bg-red border-red-dark',
  purple: 'bg-purple border-purple-dark',
}
</script>

<template>
  <ul class="fixed bottom-6 left-6 z-50 flex flex-col gap-3">
    <li v-for="theme in themeOptions" :key="theme">
      <button
        type="button"
        class="h-[20px] w-[20px] rounded-full border-2 transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        :class="[
          themeCircleClass[theme],
          active === theme ? 'scale-110 ring-2 ring-white/80 opacity-100' : 'opacity-60 hover:opacity-100'
        ]"
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
