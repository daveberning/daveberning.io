<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
definePageMeta({ layout: 'internal' })

const route = useRoute()

const { color } = useTheme()

/* Page Content
--------------------------------- */
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('writing').path(route.path).first()
)

if (post.value)
  useHead({ title: `${post.value.title} — Dave Berning` })

if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })

const formatDate = (dateStr: string) =>
  new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(dateStr))

const formattedPublishedAt = computed(() => post.value ? formatDate(post.value.publishedAt) : '')
const formattedUpdatedAt   = computed(() => post.value?.updatedAt ? formatDate(post.value.updatedAt) : '')

const pageUrl = computed(() => {
  if (import.meta.server) return ''
  return window.location.href
})

const shareLinks = computed(() => ({
  x:        `https://x.com/intent/tweet?url=${encodeURIComponent(pageUrl.value)}&text=${encodeURIComponent(post.value?.title ?? '')}`,
  linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl.value)}`,
}))

const copied = ref(false)
async function copyLink() {
  await navigator.clipboard.writeText(pageUrl.value)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}
</script>

<template>
  <InternalMain>
    <NuxtImg v-if="post!.featuredImage" :src="post!.featuredImage" :alt="post!.title" class="w-full rounded-xl object-cover aspect-[16/9] mb-8"/>
    <UiText as="h1" class="mb-3">{{ post!.title }}</UiText>
    <div class="flex items-center gap-2 text-sm text-text-muted mb-6">
      <time :datetime="post!.publishedAt">{{ formattedPublishedAt }}</time>
      <template v-if="post!.updatedAt && post!.updatedAt !== post!.publishedAt">
        <span aria-hidden="true">&middot;</span>
        <span>Updated <time :datetime="post!.updatedAt">{{ formattedUpdatedAt }}</time></span>
      </template>
    </div>
    <ul v-if="post!.tags?.length" class="flex flex-wrap gap-2 mb-8 list-none">
      <UiPill v-for="tag in post!.tags" :key="tag" as="li" :color="color" variant="outline" size="small">
        {{ tag }}
      </UiPill>
    </ul>
    <article class="prose max-w-none">
      <ContentRenderer :value="post!" />
    </article>
  </InternalMain>
  <InternalAside class="sticky top-[105px] p-8">
    <CardHeader>
      <UiText as="h2" class="text-xl font-semibold" color="white">Details</UiText>
    </CardHeader>
    <CardContent class="flex flex-col gap-6 mt-4">
      <div v-if="post!.category" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Category</UiText>
        <UiText color="white">{{ post!.category }}</UiText>
      </div>
      <div class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">About</UiText>
        <UiText color="white">{{ post!.description }}</UiText>
      </div>
      <div class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Published</UiText>
        <UiText color="white">
          <time :datetime="post!.publishedAt">{{ formattedPublishedAt }}</time>
        </UiText>
      </div>
      <div v-if="post!.updatedAt && post!.updatedAt !== post!.publishedAt" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Updated</UiText>
        <UiText color="white">
          <time :datetime="post!.updatedAt">{{ formattedUpdatedAt }}</time>
        </UiText>
      </div>
      <div v-if="post!.readingTime" class="flex flex-col gap-1">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Reading Time</UiText>
        <UiText color="white">{{ post!.readingTime }} min read</UiText>
      </div>
      <div v-if="post!.tags?.length" class="flex flex-col gap-2">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Tags</UiText>
        <ul class="flex flex-wrap gap-2 list-none">
          <UiPill v-for="tag in post!.tags" :key="tag" as="li" color="white" variant="outline" size="small">
            {{ tag }}
          </UiPill>
        </ul>
      </div>
      <div class="flex flex-col gap-2">
        <UiText color="white" class="text-xs font-semibold uppercase tracking-widest">Share</UiText>
        <div class="flex flex-col gap-2">
          <a
            :href="shareLinks.x"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Icon name="simple-icons:x" class="size-4 shrink-0" />
            Share on X
          </a>
          <a
            :href="shareLinks.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
          >
            <Icon name="simple-icons:linkedin" class="size-4 shrink-0" />
            Share on LinkedIn
          </a>
          <button
            type="button"
            class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors text-left"
            @click="copyLink"
          >
            <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4 shrink-0" />
            {{ copied ? 'Copied!' : 'Copy link' }}
          </button>
        </div>
      </div>
    </CardContent>
  </InternalAside>
</template>
