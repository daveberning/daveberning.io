<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'Work' })
useSeoMeta({
  description: 'Explore Dave Berning\'s portfolio of front-end engineering work, including projects built with Vue, TypeScript, React, and more.',
  ogTitle: 'Work',
  ogDescription: 'Explore Dave Berning\'s portfolio of front-end engineering work, including projects built with Vue, TypeScript, React, and more.',
  ogType: 'website',
  twitterTitle: 'Work',
  twitterDescription: 'Explore Dave Berning\'s portfolio of front-end engineering work, including projects built with Vue, TypeScript, React, and more.',
})

const {
  color,
  isDark,
} = useTheme()

const works = computed(() => page.value?.works ?? [])

/* Page Content
--------------------------------- */
const { data: page } = await useAsyncData('work', () =>
  queryCollection('content').path('/work').first()
)
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
          <UiText>{{ work.description }}</UiText>
        </PortfolioPieceBody>
        <PortfolioPieceTech v-if="work.technologies?.length">
          <PortfolioPieceTechItem v-for="tech in work.technologies" :key="tech">
            {{ tech }}
          </PortfolioPieceTechItem>
        </PortfolioPieceTech>
        <PortfolioPieceFooter v-if="work.year || work.url">
          <span v-if="work.year" class="text-xs text-text-muted">{{ work.year }}</span>
          <UiLink v-if="work.url" :to="work.url" variant="solid" size="small" class="ml-auto">
            View Project
          </UiLink>
        </PortfolioPieceFooter>
      </PortfolioPiece>
    </div>
  </NuxtLayout>
</template>
