<script setup lang="ts">
import { themeOptions, useThemeStore } from '~/stores/theme'
const themeStore = useThemeStore()
</script>

<template>
  <!-- using v-show to preserve image elements in the DOM for smoother transitions -->
  <img
    v-for="option in themeOptions"
    v-show="themeStore.active === option"
    :src="`/images/portraits/dave-${option}.png`"
    class="fixed right-55 top-[20px] max-w-[600px]"
    :alt="`Portrait of Dave Berning in grey shorts and a ${option} plaid shirt`" />
</template>