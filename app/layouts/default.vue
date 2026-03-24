<script setup lang="ts">
import ThemePicker from '~/components/ThemePicker'
import { provideTheme } from '~/composables/useTheme'

provideTheme()

// Inline script injected into <head> before first paint — prevents flash of
// wrong theme on hard reload or first visit with a saved preference.
useHead({
  script: [
    {
      key: 'theme-init',
      tagPosition: 'head',
      innerHTML: `(function(){var c=localStorage.getItem('theme:color')||'teal';var d=localStorage.getItem('theme:dark');var dark=d!==null?d==='true':window.matchMedia('(prefers-color-scheme:dark)').matches;document.documentElement.setAttribute('data-theme',c);if(dark)document.documentElement.classList.add('dark');}())`,
    },
  ],
})
</script>

<template>
  <div>
    <slot />
    <ThemePicker class="fixed bottom-4 left-4 z-50" />
  </div>
</template>
