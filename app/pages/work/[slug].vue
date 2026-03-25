<script setup lang="ts">
import { InternalMain, InternalAside } from '~/components/Internal'

definePageMeta({ layout: 'internal' })

const route = useRoute()

const { data: work } = await useAsyncData(route.path, () =>
  queryCollection('works').path(route.path).first()
)

if (!work.value) {
  throw createError({ statusCode: 404, statusMessage: 'Work item not found' })
}

useHead({ title: `${work.value.title} — Dave Berning` })
</script>

<template>
  <InternalMain>
    <UiText as="h1" class="mb-8">{{ work!.title }}</UiText>
    <article class="prose max-w-none">
      <ContentRenderer :value="work!" />
    </article>
  </InternalMain>
  <InternalAside class="sticky top-[105px] p-8">
    <CardHeader>
      <UiText as="h2" class="text-base font-semibold">TL;DR</UiText>
    </CardHeader>
    <CardContent class="flex flex-col gap-6 mt-4">
      <div v-if="work!.role" class="flex flex-col gap-1">
        <UiText class="text-xs font-semibold uppercase tracking-widest text-text-muted">Role</UiText>
        <UiText class="text-sm">{{ work!.role }}</UiText>
      </div>
      <div v-if="work!.year" class="flex flex-col gap-1">
        <UiText class="text-xs font-semibold uppercase tracking-widest text-text-muted">Year</UiText>
        <UiText class="text-sm">{{ work!.year }}</UiText>
      </div>
      <div v-if="work!.technologies?.length" class="flex flex-col gap-2">
        <UiText class="text-xs font-semibold uppercase tracking-widest text-text-muted">Technologies</UiText>
        <ul class="flex flex-wrap gap-2 list-none">
          <li v-for="tech in work!.technologies" :key="tech" class="text-xs px-2.5 py-0.5 rounded-full border border-border text-text-muted">
            {{ tech }}
          </li>
        </ul>
      </div>
      <div v-if="work!.description" class="flex flex-col gap-1">
        <UiText class="text-xs font-semibold uppercase tracking-widest text-text-muted">About</UiText>
        <UiText class="text-sm text-text-muted">{{ work!.description }}</UiText>
      </div>
      <div v-if="work!.url" class="pt-2 border-t border-border">
        <UiLink :to="work!.url" color="white" variant="outline" size="large" class="w-full align-center justify-center">
          View Project
        </UiLink>
      </div>
    </CardContent>
  </InternalAside>
</template>
