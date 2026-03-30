<script setup lang="ts">
const props = defineProps<{
  error: {
    statusCode: number
    message: string
  }
}>()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="internal">
    <UiText as="h1">
      {{ props.error.statusCode }}
    </UiText>
    <UiText>{{ props.error.message }}</UiText>
    <UiButton @click="handleError">Go Home</UiButton>
  </NuxtLayout>
</template>
