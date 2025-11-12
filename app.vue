<script setup lang="ts">
import { useDarkMode } from '~/composables/useDarkMode'

const { classes, style } = useDarkMode()

useHead(() => ({
  bodyAttrs: {
    class: classes.value,
    style: style.value,
  },
}))
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
