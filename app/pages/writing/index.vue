<script setup lang="ts">
import { cn } from '~/lib/utils'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Writing — Dave Berning' })
definePageMeta({ layout: 'internal' })

const { color } = useTheme()

/* Page Content
--------------------------------- */
const { data: posts } = await useAsyncData('writing', () =>
  queryCollection('writing').order('publishedAt', 'DESC').all()
)

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))
</script>

<template>
  <InternalMain>
    <UiText as="h1" class="mb-8">Writing</UiText>
    <ul class="flex flex-col gap-4 list-none">
      <li v-for="post in posts" :key="post.path">
        <article :class="cn('flex flex-col md:flex-row bg-surface border border-border rounded-2xl overflow-hidden transition-colors hover:border-theme')">
          <div v-if="post.featuredImage" class="w-full md:w-56 lg:w-64 shrink-0 overflow-hidden">
            <NuxtImg
              :src="post.featuredImage"
              :alt="post.title"
              class="w-full h-48 md:h-full object-cover"
            />
          </div>
          <div class="flex flex-col gap-3 p-6">
            <div class="flex items-center gap-3">
              <time
                :datetime="post.publishedAt"
                class="text-xs text-text-muted"
              >{{ formatDate(post.publishedAt) }}</time>
              <span v-if="post.readingTime" aria-hidden="true" class="text-text-muted text-xs">&middot;</span>
              <span v-if="post.readingTime" class="text-xs text-text-muted">{{ post.readingTime }} min read</span>
            </div>
            <NuxtLink
              :to="post.path"
              class="text-text hover:text-theme transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:rounded-sm focus-visible:outline-theme"
            >
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
                size="small"
              >
                {{ tag }}
              </UiPill>
            </ul>
          </div>
        </article>
      </li>
    </ul>
  </InternalMain>
</template>
