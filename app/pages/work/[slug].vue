<script setup lang="ts">
const route = useRoute()

/* Page Content
--------------------------------- */
const { data: work } = await useAsyncData(route.path, () =>
  queryCollection('works').path(route.path).first()
)

/* Page Meta Information
--------------------------------- */
if (work.value) {
  useHead({ title: work.value.title })
  useSeoMeta({
    description: work.value.description,
    ogTitle: work.value.title,
    ogDescription: work.value.description,
    ogType: 'website',
    twitterTitle: work.value.title,
    twitterDescription: work.value.description,
  })
}

if (!work.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Work item not found'
  })
}
</script>

<template>
  <NuxtLayout name="sidebar">
    <UiText as="h1" class="mb-8">{{ work!.title }}</UiText>
    <article class="prose max-w-none">
      <ContentRenderer :value="work!" />
    </article>
    <template #aside>
      <UiAside class="py-8">
        <UiAsideTitle>TL;DR</UiAsideTitle>
        <UiAsideSection v-if="work!.role">
          <UiAsideSubtitle>Role</UiAsideSubtitle>
          <UiText color="white">{{ work!.role }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="work!.year">
          <UiAsideSubtitle>Year</UiAsideSubtitle>
          <UiText color="white">{{ work!.year }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="work!.technologies?.length">
          <UiAsideSubtitle>Technologies</UiAsideSubtitle>
          <ul class="flex flex-wrap gap-2 list-none">
            <UiPill v-for="tech in work!.technologies" :key="tech" as="li" color="white" variant="outline" size="small">
              {{ tech }}
            </UiPill>
          </ul>
        </UiAsideSection>
        <UiAsideSection v-if="work!.description">
          <UiAsideSubtitle>About</UiAsideSubtitle>
          <UiText color="white">{{ work!.description }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="work!.url">
          <UiLink :to="work!.url" color="white" variant="outline" size="large" class="w-full align-center justify-center">
            View Project
          </UiLink>
        </UiAsideSection>
      </UiAside>
    </template>
  </NuxtLayout>
</template>
