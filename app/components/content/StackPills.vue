<script setup lang="ts">
defineProps<{ description: string; items: string[] }>()
const { color } = useTheme()
</script>

<template>
  <div class="rounded-lg bg-surface p-6 mb-10">
    <UiText class="leading-relaxed mb-4">{{ description }}</UiText>
    <ul role="list" class="flex flex-wrap gap-2 list-none">
      <UiPill v-for="tool in items" :key="tool" as="li" :color="color" variant="outline">
        {{ tool }}
      </UiPill>
    </ul>
  </div>
</template>
