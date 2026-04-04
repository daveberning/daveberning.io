<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const error = useError()
const { color } = useTheme()

const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <NuxtLayout name="sidebar">
    <main class="min-h-[60vh] flex flex-col items-center justify-center text-center gap-6 py-16">
      <span v-if="error" aria-hidden="true" class="font-['Space_Grotesk'] font-black leading-none text-theme select-none text-[clamp(7rem,18vw,16rem)]">
        {{ error.statusCode }}
      </span>
      <UiText as="h1">Nothing to see here.</UiText>
      <UiText as="p" color="muted" class="max-w-sm">
        That page doesn't exist — or maybe it never did. Either way, let's get you somewhere useful.
      </UiText>
      <UiButton variant="solid" size="large" :color="color" @click="handleError">
        Go Home
      </UiButton>
      <UiText as="p" color="muted" class="text-sm">
        Or, <UiLink variant="text" color="theme" to="/contact" class="p-0">get in touch</UiLink> if something seems broken.
      </UiText>
    </main>
  </NuxtLayout>
</template>
