<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const aboutDescription = 'Learn about Dave Berning, a Senior Front-End Software Engineer specializing in Vue, Nuxt, design systems, mentoring, and front-end architecture.'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'About' })
useSeoMeta({
  description: aboutDescription,
  ogTitle: 'About',
  ogDescription: aboutDescription,
  ogType: 'website',
  ogImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
  twitterTitle: 'About',
  twitterDescription: aboutDescription,
  twitterImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
})

/* Page Content
--------------------------------- */
const [{ data: page }, { data: sidebar }] = await Promise.all([
  useAsyncData('about', () => queryCollection('about').path('/about').first()),
  useAsyncData('about-sidebar', () => queryCollection('about').path('/about/sidebar').first()),
])

useHead({
  script: [
    {
      key: 'about-page-schema',
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About',
        description: aboutDescription,
        url: `${siteUrl}/about`,
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="sidebar">
    <ContentRenderer v-if="page" :value="page" />
    <template #aside>
      <Portrait size="small" class="rounded-lg mb-6" />
      <UiAside class="mt-4 pb-8">
        <UiAsideSection v-if="sidebar?.specializations?.length">
          <UiAsideSubtitle>Specializations</UiAsideSubtitle>
          <ul role="list" class="flex flex-wrap gap-2 list-none">
            <UiPill v-for="spec in sidebar.specializations" :key="spec" as="li" color="white" variant="outline" size="small">
              {{ spec }}
            </UiPill>
          </ul>
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.location">
          <UiAsideSubtitle>Location</UiAsideSubtitle>
          <UiText color="white">{{ sidebar.location }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.currentlyAt">
          <UiAsideSubtitle>Currently At</UiAsideSubtitle>
          <UiText color="white">{{ sidebar.currentlyAt }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.previouslyAt">
          <UiAsideSubtitle>Previously At</UiAsideSubtitle>
          <UiAsideList :items="sidebar.previouslyAt" />
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.favoriteGenres?.length">
          <UiAsideSubtitle>
          <span class="inline-flex items-center gap-1.5">
            <Icon name="lucide:book-open" class="size-3" aria-hidden="true" />
            Favorite Book Genres
          </span>
          </UiAsideSubtitle>
          <UiAsideList :items="sidebar.favoriteGenres" />
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.education">
          <UiAsideSubtitle>Education</UiAsideSubtitle>
          <UiText color="white">{{ sidebar.education }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.favoriteSeries">
          <UiAsideSubtitle>
          <span class="inline-flex items-center gap-1.5">
            <Icon name="lucide:gamepad-2" class="size-3" aria-hidden="true" />
            Favorite Game Series
          </span>
          </UiAsideSubtitle>
          <UiText color="white">{{ sidebar.favoriteSeries }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="sidebar?.favoriteBands?.length">
          <UiAsideSubtitle>
          <span class="inline-flex items-center gap-1.5">
            <Icon name="lucide:music" class="size-3" aria-hidden="true" />
            Favorite Bands
          </span>
          </UiAsideSubtitle>
          <UiAsideList :items="sidebar.favoriteBands" />
        </UiAsideSection>
      </UiAside>
    </template>
  </NuxtLayout>
</template>
