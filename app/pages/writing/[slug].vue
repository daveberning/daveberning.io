<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = config.public.siteUrl as string

const {
  color
} = useTheme()

/* Page Content
--------------------------------- */
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection('writing').path(route.path).first()
)

if (post.value) {
  const canonicalUrl = `${siteUrl}${route.path}`
  const ogImage = post.value.featuredImage
    ? post.value.featuredImage.startsWith('http')
      ? post.value.featuredImage
      : `${siteUrl}${post.value.featuredImage}`
    : `${siteUrl}/portraits/dave-teal.png`

  useHead({
    title: post.value.title,
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: post.value.title,
          description: post.value.description,
          url: canonicalUrl,
          image: ogImage,
          datePublished: post.value.publishedAt,
          dateModified: post.value.updatedAt ?? post.value.publishedAt,
          author: {
            '@type': 'Person',
            name: 'Dave Berning',
            url: siteUrl,
          },
        }),
      },
    ],
  })

  useSeoMeta({
    description: post.value.description,
    ogTitle: post.value.title,
    ogDescription: post.value.description,
    ogType: 'article',
    ogImage,
    ogUrl: canonicalUrl,
    twitterTitle: post.value.title,
    twitterDescription: post.value.description,
    twitterImage: ogImage,
    articlePublishedTime: post.value.publishedAt,
    articleModifiedTime: post.value.updatedAt ?? post.value.publishedAt,
    articleTag: post.value.tags,
  })
}

if (!post.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })

const formatDate = (dateStr: string) => new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(new Date(dateStr))

const formattedPublishedAt = computed(() => post.value ? formatDate(post.value.publishedAt) : '')
const formattedUpdatedAt   = computed(() => post.value?.updatedAt ? formatDate(post.value.updatedAt) : '')
const pageUrl = computed(() => !import.meta.server ? window.location.href : '')

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
  <NuxtLayout name="sidebar">
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
    <ReadOriginal v-if="post!.externalUrl" :href="post!.externalUrl" :platform="post!.platform" class="mt-8" />
    <template #aside>
      <UiAside class="py-8">
        <UiAsideTitle>Details</UiAsideTitle>
        <UiAsideSection v-if="post!.category">
          <UiAsideSubtitle>Category</UiAsideSubtitle>
          <UiText color="white">{{ post!.category }}</UiText>
        </UiAsideSection>
        <UiAsideSection>
          <UiAsideSubtitle>Published</UiAsideSubtitle>
          <UiText color="white">
            <time :datetime="post!.publishedAt">{{ formattedPublishedAt }}</time>
          </UiText>
        </UiAsideSection>
        <UiAsideSection v-if="post!.updatedAt && post!.updatedAt !== post!.publishedAt">
          <UiAsideSubtitle>Updated</UiAsideSubtitle>
          <UiText color="white">
            <time :datetime="post!.updatedAt">{{ formattedUpdatedAt }}</time>
          </UiText>
        </UiAsideSection>
        <UiAsideSection v-if="post!.readingTime">
          <UiAsideSubtitle>Reading Time</UiAsideSubtitle>
          <UiText color="white">{{ post!.readingTime }} min read</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="post!.tags?.length">
          <UiAsideSubtitle>Tags</UiAsideSubtitle>
          <ul class="flex flex-wrap gap-2 list-none">
            <UiPill v-for="tag in post!.tags" :key="tag" as="li" color="white" variant="outline" size="small">
              {{ tag }}
            </UiPill>
          </ul>
        </UiAsideSection>
        <UiAsideSection>
          <UiAsideSubtitle>Share</UiAsideSubtitle>
          <div class="flex flex-col gap-2">
            <a :href="shareLinks.x" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Icon name="simple-icons:x" class="size-4 shrink-0" />
              Share on X
            </a>
            <a :href="shareLinks.linkedin" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors">
              <Icon name="simple-icons:linkedin" class="size-4 shrink-0" />
              Share on LinkedIn
            </a>
            <button type="button" class="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors text-left" @click="copyLink">
              <Icon :name="copied ? 'lucide:check' : 'lucide:link'" class="size-4 shrink-0" />
              {{ copied ? 'Copied!' : 'Copy link' }}
            </button>
          </div>
        </UiAsideSection>
      </UiAside>
    </template>
  </NuxtLayout>
</template>
