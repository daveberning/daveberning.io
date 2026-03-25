<script setup lang="ts">
import Card, { CardContent } from '~/components/ui/card'

useHead({ title: 'Work — Dave Berning' })

definePageMeta({ layout: 'internal' })

const { color, isDark } = useTheme()
const variant = computed(() => isDark.value ? 'solid' : 'outline')

const items = Array.from({ length: 8 })
</script>

<template>
  <UiText as="h1" class="mb-8">
    Work
  </UiText>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <Card v-for="(_, i) in items" :key="i" :color="color" :variant="variant">
      <CardContent>
        <UiText>Project {{ i + 1 }} {{ variant }}</UiText>
        <UiText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</UiText>
      </CardContent>
    </Card>
  </div>
</template>
