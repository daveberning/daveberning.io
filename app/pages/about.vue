<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'About — Dave Berning' })
definePageMeta({ layout: false })

/* Page Content
--------------------------------- */
const { data: page } = await useAsyncData('about-content', () =>
  queryCollection('content').path('/about').first()
)

const { data: sidebar } = await useAsyncData('about-sidebar', () =>
  queryCollection('content').path('/about/sidebar').first()
)
</script>

<template>
  <NuxtLayout name="internal">
    <InternalMain>
      <ContentRenderer v-if="page" :value="page" />
    </InternalMain>
    <InternalAside class="text-center flex flex-col items-center">
      <ContentRenderer v-if="sidebar" :value="sidebar" class="w-full" />
    </InternalAside>
  </NuxtLayout>
</template>
