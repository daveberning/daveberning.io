<script setup lang="ts">
const props = defineProps<{ id?: string }>()
</script>

<template>
  <UiText color="inherit" as="h1" :id="props.id" class="group relative mb-4 mt-8">
    <slot />
    <a v-if="props.id" :href="`#${props.id}`" :aria-label="`Link to ${props.id} section`" class="ml-2 opacity-0 group-hover:opacity-100 transition-opacity text-text-muted hover:text-theme">#</a>
  </UiText>
</template>
