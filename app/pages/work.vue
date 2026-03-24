<script setup lang="ts">
import Card, { CardContent } from '~/components/ui/card'

useHead({ title: 'Work — Dave Berning' })

definePageMeta({ layout: 'internal' })

const items = Array.from({ length: 8 })
</script>

<template>
  <UiText as="h1" class="mb-8">
    Work
  </UiText>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <Card v-for="(_, i) in items" :key="i">
      <CardContent>
        <UiText>Project {{ i + 1 }}</UiText>
        <UiText>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</UiText>
      </CardContent>
    </Card>
  </div>
</template>
