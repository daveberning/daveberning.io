<script setup lang="ts">
defineProps<{ href: string; target?: string }>()
</script>

<template>
  <UiLink :href="href" :target="target" as="a" variant="text" size="regular" radius="none" class="inline underline">
    <slot />
  </UiLink>
</template>
