<script setup lang="ts">
const route = useRoute()

/* Page Content
--------------------------------- */
const { data: work } = await useAsyncData(route.path, () =>
  queryCollection('works').path(route.path).first()
)

/* Page Meta Information
--------------------------------- */
if (work.value)
  useHead({ title: `${work.value.title} — Dave Berning` })
definePageMeta({ layout: 'internal' })

if (!work.value)
  throw createError({ statusCode: 404, statusMessage: 'Work item not found' })
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
      <UiText as="h2" class="text-xl font-semibold">TL;DR</UiText>
    </CardHeader>
    <CardContent class="flex flex-col gap-6 mt-4">
      <div v-if="work!.role" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Role</UiText>
        <UiText color="white">{{ work!.role }}</UiText>
      </div>
      <div v-if="work!.year" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Year</UiText>
        <UiText color="white">{{ work!.year }}</UiText>
      </div>
      <div v-if="work!.technologies?.length" class="flex flex-col gap-2">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Technologies</UiText>
        <ul class="flex flex-wrap gap-2 list-none">
          <UiText as="li" v-for="tech in work!.technologies" :key="tech" class="text-xs px-2.5 py-0.5 rounded-full border border-white">
            {{ tech }}
          </UiText>
        </ul>
      </div>
      <div v-if="work!.description" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">About</UiText>
        <UiText color="white">{{ work!.description }}</UiText>
      </div>
      <div v-if="work!.url">
        <UiLink :to="work!.url" color="white" variant="outline" size="large" class="w-full align-center justify-center">
          View Project
        </UiLink>
      </div>
    </CardContent>
  </InternalAside>
</template>
