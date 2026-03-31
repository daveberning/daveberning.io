<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

/* Page Data
--------------------------------- */
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })

useHead({
  title: page.value.title,
  script: [
    {
      key: `page-schema-${route.path}`,
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: page.value.title,
        description: page.value.description ?? page.value.title,
        url: `${siteUrl}${route.path}`,
      }),
    },
  ],
})

useSeoMeta({
  description: page.value.description ?? page.value.title,
  ogTitle: page.value.title,
  ogDescription: page.value.description ?? page.value.title,
  ogType: 'website',
  twitterTitle: page.value.title,
  twitterDescription: page.value.description ?? page.value.title,
})

/* Page Content
--------------------------------- */
const content = computed(() => page.value!)
</script>

<template>
  <NuxtLayout name="sidebar">
    <article>
      <ContentRenderer :value="content" />
    </article>
  </NuxtLayout>
</template>
