<script setup lang="ts">
import Card, { CardHeader, CardContent, CardFooter } from '~/components/ui/card'

useHead({ title: 'Work — Dave Berning' })

definePageMeta({ layout: 'internal' })

const { color, isDark } = useTheme()
const variant = computed(() => isDark.value ? 'solid' : 'outline')

const { data: page } = await useAsyncData('work', () =>
  queryCollection('content').path('/work').first()
)

const works = computed(() => page.value?.works ?? [])
</script>

<template>
  <UiText as="h1" class="mb-8">
    Work
  </UiText>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    <Card v-for="work in works" :key="work.title" :color="color" :variant="variant">
      <CardHeader>
        <UiText as="h2" class="text-base font-semibold">{{ work.title }}</UiText>
        <UiText v-if="work.role" class="text-xs text-text-muted mt-0.5">{{ work.role }}</UiText>
      </CardHeader>
      <CardContent>
        <UiText class="text-sm">{{ work.description }}</UiText>
        <div v-if="work.technologies?.length" class="flex flex-wrap gap-1 mt-3">
          <span v-for="tech in work.technologies" :key="tech" class="text-xs px-2 py-0.5 rounded-full border border-border">
            {{ tech }}
          </span>
        </div>
      </CardContent>
      <CardFooter v-if="work.year || work.url" class="flex items-center justify-between">
        <UiText v-if="work.year" class="text-xs text-text-muted">{{ work.year }}</UiText>
        <UiLink v-if="work.url" :href="work.url" variant="text" size="small" class="ml-auto">
          View Project
        </UiLink>
      </CardFooter>
    </Card>
  </div>
</template>
