<script setup lang="ts">
import ThemePicker from '~/components/ThemePicker'
</script>

<template>
  <div class="flex-1">
    <main class="mx-auto w-full max-w-[1140px] flex-1">
      <slot />
    </main>
    <ThemePicker />
  </div>
</template>
