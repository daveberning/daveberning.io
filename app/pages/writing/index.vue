<script setup lang="ts">
import { cn } from '~/lib/utils'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const { color } = useTheme()

useHead({ title: 'Articles on Vue, Nuxt, TypeScript & Web Dev' })

useSeoMeta({
  description: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
  ogTitle: 'Articles on Vue, Nuxt, TypeScript & Web Development',
  ogDescription: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
  ogType: 'website',
  ogImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
  twitterTitle: 'Writing',
  twitterDescription: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
  twitterImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
})

const { data: posts } = await useAsyncData('writing', () => {
  if (import.meta.dev) {
    return queryCollection('writing').order('publishedAt', 'DESC').all()
  }

  return queryCollection('writing').where('status', '=', 'published').order('publishedAt', 'DESC').all()
})

const {
  activeFilterPills,
  activeFilters,
  clearFiltersLocation,
  clearSectionLocation,
  filterSections,
  filteredPosts,
  getFilterLocation,
  hasHiddenTopics,
  hiddenTopicOptions,
  resultsLabel,
  visibleTopicOptions,
} = useWritingFilters(posts)

const formatDate = (dateStr: string) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}).format(new Date(dateStr))

useHead({
  script: [
    {
      key: 'writing-collection-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Writing',
        description: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
        url: `${siteUrl}/writing`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: filteredPosts.value.length,
          itemListElement: filteredPosts.value.map((post, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: post.title,
            description: post.description,
            url: `${siteUrl}${post.path}`,
            image: post.featuredImage ? `${siteUrl}${post.featuredImage}` : undefined,
            datePublished: post.publishedAt,
            ...(post.readingTime && {
              duration: `PT${post.readingTime}M`,
            }),
            author: {
              '@type': 'Person',
              name: 'Dave Berning',
              url: siteUrl,
            },
          })),
        },
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="sidebar">
    <div class="flex flex-col gap-8">
      <header class="flex flex-col gap-4">
        <UiText as="h1">Writing</UiText>
        <UiText class="max-w-2xl text-text-muted leading-relaxed">
          Essays, tutorials, and field notes on front-end engineering, modern JavaScript, and shipping better interfaces.
        </UiText>
      </header>

      <section class="rounded-2xl border border-border bg-surface/80 p-5 sm:p-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div class="space-y-1">
            <UiText class="text-sm font-semibold uppercase tracking-[0.2em] text-text-muted">Browse the archive</UiText>
            <UiText class="text-sm text-text-muted">
              {{ resultsLabel }}
            </UiText>
          </div>
          <NuxtLink
            v-if="activeFilterPills.length"
            :to="clearFiltersLocation"
            class="inline-flex items-center justify-center rounded-full border border-theme px-3 py-1.5 text-xs font-medium text-theme transition-colors hover:bg-theme/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2">
            Clear all filters
          </NuxtLink>
        </div>

        <ul v-if="activeFilterPills.length" class="mt-4 flex flex-wrap gap-2 list-none">
          <li v-for="filter in activeFilterPills" :key="`${filter.key}-${filter.value}`">
            <NuxtLink
              :to="getFilterLocation(filter.key)"
              class="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-text transition-colors hover:border-theme hover:text-theme focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2">
              <span>{{ filter.label }}</span>
              <Icon name="lucide:x" class="size-3.5 shrink-0" />
            </NuxtLink>
          </li>
        </ul>
      </section>

      <div v-if="filteredPosts.length" class="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-3">
        <article v-for="post in filteredPosts" :key="post.path" :class="cn('relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-theme')">
          <div v-if="post.featuredImage" class="w-full shrink-0 overflow-hidden">
            <NuxtImg :src="post.featuredImage" :alt="post.title" class="h-48 w-full object-cover" />
          </div>
          <div v-else class="flex h-48 w-full shrink-0 items-center justify-center bg-theme">
            <UiText color="white" class="font-semibold tracking-wide">{{ post.platform || post.category || 'Writing' }}</UiText>
          </div>
          <div class="flex flex-1 flex-col gap-3 p-6">
            <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span v-if="post.status === 'draft'" class="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 dark:bg-amber-900/40 dark:text-amber-400">Draft</span>
              <time :datetime="post.publishedAt" class="text-xs text-text-muted">{{ formatDate(post.publishedAt) }}</time>
              <span v-if="post.readingTime" aria-hidden="true" class="text-xs text-text-muted">&middot;</span>
              <span v-if="post.readingTime" class="text-xs text-text-muted">{{ post.readingTime }} min read</span>
              <span v-if="post.category" class="rounded-full border border-border px-2 py-0.5 text-xs font-medium text-text-muted">
                {{ post.category }}
              </span>
            </div>
            <NuxtLink :to="post.path" class="text-text transition-colors hover:text-theme focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme after:absolute after:inset-0 after:content-['']">
              <UiText as="p" role="heading" aria-level="2" class="text-xl font-semibold leading-snug">{{ post.title }}</UiText>
            </NuxtLink>
            <UiText class="line-clamp-3 text-sm leading-relaxed text-text-muted">
              {{ post.description }}
            </UiText>
            <ul v-if="post.tags?.length" class="mt-auto flex flex-wrap gap-2 list-none">
              <li v-for="tag in post.tags" :key="tag">
                <NuxtLink :to="getFilterLocation('topic', tag)" class="relative z-10">
                  <UiPill :color="activeFilters.topic.includes(tag) ? 'white' : color" :variant="activeFilters.topic.includes(tag) ? 'solid' : 'outline'" size="small">
                    {{ tag }}
                  </UiPill>
                </NuxtLink>
              </li>
            </ul>
          </div>
        </article>
      </div>

      <section v-else class="rounded-2xl border border-dashed border-border bg-surface/60 p-8 text-center sm:p-10">
        <UiText as="h2" class="mb-3 text-2xl">No articles match those filters</UiText>
        <UiText class="mx-auto mb-6 max-w-xl text-text-muted leading-relaxed">
          Try clearing a filter or broadening the topic to see more posts from the archive.
        </UiText>
        <NuxtLink :to="clearFiltersLocation" class="inline-flex items-center justify-center rounded-full border border-theme px-4 py-2 text-sm font-medium text-theme transition-colors hover:bg-theme/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-theme focus-visible:ring-offset-2">
          Reset filters
        </NuxtLink>
      </section>
    </div>

    <template #aside>
      <WritingFilters
        :active-filters="activeFilters"
        :clear-filters-location="clearFiltersLocation"
        :clear-section-location="clearSectionLocation"
        :filter-sections="filterSections"
        :get-filter-location="getFilterLocation"
        :has-hidden-topics="hasHiddenTopics"
        :hidden-topic-options="hiddenTopicOptions"
        :results-label="resultsLabel"
        :visible-topic-options="visibleTopicOptions" />
    </template>
  </NuxtLayout>
</template>
