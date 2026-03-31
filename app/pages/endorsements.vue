<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'Endorsements' })
useSeoMeta({
  description: 'What colleagues and clients say about working with Dave Berning, Front-End Software Engineer based in Cincinnati, OH.',
  ogTitle: 'Endorsements',
  ogDescription: 'What colleagues and clients say about working with Dave Berning, Front-End Software Engineer based in Cincinnati, OH.',
  ogType: 'website',
  twitterTitle: 'Endorsements',
  twitterDescription: 'What colleagues and clients say about working with Dave Berning, Front-End Software Engineer based in Cincinnati, OH.',
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
