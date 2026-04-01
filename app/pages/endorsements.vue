<script setup lang="ts">
const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const endorsementsDescription = 'Read endorsements from colleagues, clients, and collaborators who have worked with Dave Berning on front-end engineering and cross-functional teams.'

/* Page Meta Information
--------------------------------- */
const { color } = useTheme()

useHead({ title: 'Endorsements' })
useSeoMeta({
  description: endorsementsDescription,
  ogTitle: 'Endorsements',
  ogDescription: endorsementsDescription,
  ogType: 'website',
  ogImage: () => `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
  twitterTitle: 'Endorsements',
  twitterDescription: endorsementsDescription,
  twitterImage: () => `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
})

/* Page Content
--------------------------------- */
const [ { data: index }, { data: allEndorsements } ] = await Promise.all([
  useAsyncData('endorsements-index', () => queryCollection('content').path('/endorsements').first()),
  useAsyncData('endorsements', () => queryCollection('endorsements').all()),
])

const endorsements = computed(() => {
  const order = index.value?.order ?? []
  const items = (allEndorsements.value ?? []).filter(t => t.name)

  if (!order.length)
    return items

  return order
    .map(slug => items.find(t => t.path === `/endorsements/${slug}`))
    .filter(t => t != null)
})

useHead({
  script: [
    {
      key: 'endorsements-page-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Endorsements',
        description: endorsementsDescription,
        url: `${siteUrl}/endorsements`,
        mainEntity: {
          '@type': 'ItemList',
          itemListElement: endorsements.value.map((endorsement, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: endorsement.name,
            url: `${siteUrl}${endorsement.path}`,
          })),
        },
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="sidebar">
    <UiText as="h1" class="mb-8">Endorsements</UiText>
    <article v-if="index" class="prose max-w-none mb-8">
      <ContentRenderer :value="index" />
    </article>
    <div class="columns-1 lg:columns-2 xl:columns-3 gap-6">
      <Endorsement v-for="endorsement in endorsements" :key="endorsement.path" :name="endorsement.name ?? ''" class="break-inside-avoid mb-6">
        <EndorsementContent>
          <ContentRenderer :value="endorsement" />
        </EndorsementContent>
        <EndorsementAttribution>
          <EndorsementPhoto :src="endorsement.image" />
          <div class="flex flex-col gap-0.5">
            <EndorsementName>{{ endorsement.name }}</EndorsementName>
            <EndorsementRole>{{ endorsement.role }} &middot; {{ endorsement.company }}</EndorsementRole>
          </div>
        </EndorsementAttribution>
      </Endorsement>
    </div>
  </NuxtLayout>
</template>
