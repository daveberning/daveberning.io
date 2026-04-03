<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const workDescription = 'Explore front-end engineering case studies from Dave Berning, including Vue, Nuxt, TypeScript, design systems, and enterprise architecture work.'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Work' })
useSeoMeta({
  description: workDescription,
  ogTitle: 'Work',
  ogDescription: workDescription,
  ogType: 'website',
  ogImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
  twitterTitle: 'Work',
  twitterDescription: workDescription,
  twitterImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
})

const {
  color,
} = useTheme()

const works = computed(() => page.value?.works ?? [])

/* Page Content
--------------------------------- */
const { data: page } = await useAsyncData('work', () =>
  queryCollection('content').path('/work').first()
)

useHead({
  script: [
    {
      key: 'work-page-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Work',
        description: workDescription,
        url: `${siteUrl}/work`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: works.value.map((work, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: work.title,
            url: typeof work.url === 'string' && work.url.startsWith('/')
              ? `${siteUrl}${work.url}`
              : work.url,
          })),
        },
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="sidebar">
    <UiText as="h1" class="mb-8">
      Work
    </UiText>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <PortfolioPiece v-for="work in works" :key="work.title" :color="color" variant="solid">
        <PortfolioPieceHeader :title="work.title" :role="work.role" />
        <PortfolioPieceBody>
          <UiText color="muted">{{ work.description }}</UiText>
        </PortfolioPieceBody>
        <PortfolioPieceTech v-if="work.technologies?.length">
          <PortfolioPieceTechItem v-for="tech in work.technologies" :key="tech">
            {{ tech }}
          </PortfolioPieceTechItem>
        </PortfolioPieceTech>
        <PortfolioPieceFooter v-if="work.year || work.url">
          <span v-if="work.year" class="text-xs text-text-muted">{{ work.year }}</span>
          <UiLink v-if="work.url" :to="work.url" variant="solid" class="ml-auto">
            View Project
          </UiLink>
        </PortfolioPieceFooter>
      </PortfolioPiece>
    </div>
  </NuxtLayout>
</template>
