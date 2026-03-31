<script setup lang="ts">
defineProps<{ href: string; target?: string }>()
</script>

<template>
  <UiLink :to="href" :target="target" variant="text" size="regular" class="inline underline p-0 text-base">
    <slot />
  </UiLink>
</template>
