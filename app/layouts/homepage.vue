<script setup lang="ts">
import { cn } from '~/lib/utils'

const {
  isDark
} = useTheme()
</script>

<template>
  <main :class="cn('flex flex-col-reverse lg:flex-row items-center lg:items-stretch h-dvh lg:h-screen lg:overflow-hidden', isDark ? 'bg-theme-black' : 'bg-background')">
    <slot />
  </main>
</template>