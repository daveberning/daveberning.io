<script setup lang="ts">
import { provideTheme } from '~/composables/useTheme'

const {
  data: siteInfo
} = await useSiteInfo()

provideTheme()

// Inline script injected into <head> before first paint — prevents flash of
// wrong theme on hard reload or first visit with a saved preference.
useHead({
  titleTemplate: (title) => {
    const fullName = `${siteInfo.value?.firstName ?? ''} ${siteInfo.value?.lastName ?? ''}`.trim()
    const base = siteInfo.value?.baseTitle ?? ''
    return title ? `${title} | ${fullName} ${base}`.trim() : `${fullName} ${base}`.trim()
  },
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
  <slot />
</template>