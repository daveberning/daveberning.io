<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string

/* Page Content
--------------------------------- */
const { data: work } = await useAsyncData(route.path, () =>
  queryCollection('works').path(route.path).first()
)

/* Page Meta Information
--------------------------------- */
const { color } = useTheme()

if (work.value) {
  const canonicalUrl = (work.value as any).externalUrl || `${siteUrl}${route.path}`
  const workImage = work.value.featuredImage ? `${siteUrl}${work.value.featuredImage}` : `${siteUrl}/bg/plaid-bg-teal.jpg`

  useHead({
    title: work.value.title,
    link: [{ rel: 'canonical', href: canonicalUrl }],
  })
  useSeoMeta({
    description: work.value.description,
    ogTitle: work.value.title,
    ogDescription: work.value.description,
    ogType: 'website',
    ogImage: workImage,
    ogUrl: canonicalUrl,
    twitterTitle: work.value.title,
    twitterDescription: work.value.description,
    twitterImage: workImage,
  })

  useHead({
    script: [
      {
        key: `work-schema-${route.path}`,
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: work.value.title,
          description: work.value.description,
          url: canonicalUrl,
          image: workImage,
          applicationCategory: 'WebApplication',
          developer: {
            '@type': 'Person',
            name: 'Dave Berning',
            url: siteUrl,
          },
          ...(work.value.technologies && {
            keywords: work.value.technologies.join(', '),
          }),
        }),
      },
    ],
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
          <UiLink
            :to="work!.url"
            variant="outline"
            size="large"
            class="w-full align-center justify-center border-white text-white hover:bg-white/10 hover:text-white"
          >
            View Project
          </UiLink>
        </UiAsideSection>
      </UiAside>
    </template>
  </NuxtLayout>
</template>
