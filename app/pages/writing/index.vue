<script setup lang="ts">
import { cn } from '~/lib/utils'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Writing' })
useSeoMeta({
  description: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
  ogTitle: 'Writing',
  ogDescription: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
  ogType: 'website',
  twitterTitle: 'Writing',
  twitterDescription: 'Articles and tutorials by Dave Berning on front-end development, JavaScript, TypeScript, Vue, React, and modern web technologies.',
})

const {
  color
} = useTheme()

/* Page Content
--------------------------------- */
const { data: posts } = await useAsyncData('writing', () =>
  queryCollection('writing').order('publishedAt', 'DESC').all()
)

const formatDate = (dateStr: string) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date(dateStr))
</script>

<template>
  <NuxtLayout name="sidebar">
    <UiText as="h1" ref="titleRef" class="mb-8">Writing</UiText>
    <div ref="listRef" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <article v-for="post in posts" :key="post.path" :class="cn('flex flex-col bg-surface border border-border rounded-2xl overflow-hidden transition-colors hover:border-theme')">
        <div v-if="post.featuredImage" class="w-full shrink-0 overflow-hidden">
          <NuxtImg :src="post.featuredImage" :alt="post.title" class="w-full h-48 object-cover" />
        </div>
        <div v-else class="w-full h-48 shrink-0 bg-theme flex items-center justify-center">
          <UiText color="white" class="font-semibold tracking-wide">{{ post.platform }}</UiText>
        </div>
        <div class="flex flex-col gap-3 p-6">
          <div class="flex items-center gap-3">
            <time :datetime="post.publishedAt" class="text-xs text-text-muted">{{ formatDate(post.publishedAt) }}</time>
            <span v-if="post.readingTime" aria-hidden="true" class="text-text-muted text-xs">&middot;</span>
            <span v-if="post.readingTime" class="text-xs text-text-muted">{{ post.readingTime }} min read</span>
          </div>
          <NuxtLink :to="post.path" class="text-text hover:text-theme transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm focus-visible:outline-theme">
            <UiText as="h2" class="text-xl font-semibold leading-snug">{{ post.title }}</UiText>
          </NuxtLink>
          <UiText class="text-sm text-text-muted line-clamp-2 leading-relaxed">{{ post.description }}</UiText>
          <ul v-if="post.tags?.length" class="flex flex-wrap gap-2 mt-auto list-none">
            <UiPill
                v-for="tag in post.tags"
                :key="tag"
                as="li"
                :color="color"
                variant="outline"
                size="small">
              {{ tag }}
            </UiPill>
          </ul>
        </div>
      </article>
    </div>
  </NuxtLayout>
</template>
