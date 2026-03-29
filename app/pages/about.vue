<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'About — Dave Berning' })
definePageMeta({ layout: 'internal' })

/* Page Content
--------------------------------- */
const [{ data: page }, { data: sidebar }] = await Promise.all([
  useAsyncData('about', () => queryCollection('about').path('/about').first()),
  useAsyncData('about-sidebar', () => queryCollection('about').path('/about/sidebar').first()),
])
</script>

<template>
  <InternalMain>
    <ContentRenderer v-if="page" :value="page" />
  </InternalMain>

  <InternalAside class="sticky top-[105px]">
    <Portrait size="small" class="rounded-lg mb-6" />
    <CardContent class="flex flex-col gap-6 mt-4 p-8">
      <dl class="flex flex-col gap-6">
        <div v-if="sidebar?.specializations?.length" class="flex flex-col gap-1">
          <dt><UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Specializations</UiText></dt>
          <dd>
            <ul role="list" class="flex flex-wrap gap-2 list-none">
              <UiPill v-for="spec in sidebar.specializations" :key="spec" as="li" color="white" variant="outline" size="small">
                {{ spec }}
              </UiPill>
            </ul>
          </dd>
        </div>
        <div v-if="sidebar?.location" class="flex flex-col gap-1">
          <dt><UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Location</UiText></dt>
          <dd><UiText color="white">{{ sidebar.location }}</UiText></dd>
        </div>
        <div v-if="sidebar?.currentlyAt" class="flex flex-col gap-1">
          <dt><UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Currently At</UiText></dt>
          <dd>
            <UiText color="white">{{ sidebar.currentlyAt }}</UiText>
          </dd>
        </div>
        <div v-if="sidebar?.previouslyAt" class="flex flex-col gap-1">
          <dt><UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Previously At</UiText></dt>
          <dd>
            <UiText color="white">{{ sidebar.previouslyAt.join(' · ') }}</UiText>
          </dd>
          <div v-if="sidebar?.favoriteGenres?.length" class="flex flex-col gap-1">
            <dt>
              <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">
              <span class="inline-flex items-center gap-1.5">
                <Icon name="lucide:book-open" class="size-3" aria-hidden="true" />
                Favorite Book Genres
              </span>
              </UiText>
            </dt>
            <dd><UiText color="white">{{ sidebar.favoriteGenres.join(' · ') }}</UiText></dd>
          </div>
        </div>
        <div v-if="sidebar?.education" class="flex flex-col gap-1">
          <dt><UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Education</UiText></dt>
          <dd>
            <UiText color="white">{{ sidebar.education }}</UiText>
          </dd>
        </div>
        <div v-if="sidebar?.favoriteSeries" class="flex flex-col gap-1">
          <dt>
            <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">
              <span class="inline-flex items-center gap-1.5">
                <Icon name="lucide:gamepad-2" class="size-3" aria-hidden="true" />
                Favorite Game Series
              </span>
            </UiText>
          </dt>
          <dd><UiText color="white">{{ sidebar.favoriteSeries }}</UiText></dd>
        </div>
        <div v-if="sidebar?.favoriteGenres?.length" class="flex flex-col gap-1">
          <dt>
            <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">
              <span class="inline-flex items-center gap-1.5">
                <Icon name="lucide:book-open" class="size-3" aria-hidden="true" />
                Favorite Book Genres
              </span>
            </UiText>
          </dt>
          <dd><UiText color="white">{{ sidebar.favoriteGenres.join(' · ') }}</UiText></dd>
        </div>
        <div v-if="sidebar?.favoriteBands?.length" class="flex flex-col gap-1">
          <dt>
            <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">
              <span class="inline-flex items-center gap-1.5">
                <Icon name="lucide:music" class="size-3" aria-hidden="true" />
                Favorite Bands
              </span>
            </UiText>
          </dt>
          <dd><UiText color="white">{{ sidebar.favoriteBands.join(' · ') }}</UiText></dd>
        </div>
      </dl>
    </CardContent>
  </InternalAside>
</template>
