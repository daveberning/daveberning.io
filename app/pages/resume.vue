<script setup lang="ts">
definePageMeta({
  layout: false
})

const { data: page } = await useAsyncData('resume', () =>
  queryCollection('content').path('/resume').first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useHead({
  title: `Résumé — Dave Berning`
})

const content = computed(() => page.value!)
</script>

<template>
  <NuxtLayout name="internal">
    <InternalAside class="text-center flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-4">Résumé</h1>
      <p class="mb-2">
        I'm currently a software engineer at
        <a href="https://www.loom.com/" class="text-teal-500 hover:underline" target="_blank" rel="noopener">Loom</a>.
      </p>
      <p class="mb-2">
        I previously worked at
        <a href="https://www.nordtheme.com/" class="text-teal-500 hover:underline" target="_blank" rel="noopener">Nord Theme</a>
        and
        <a href="https://www.nordtheme.com/ports/kitty" class="text-teal-500 hover:underline" target="_blank" rel="noopener">Nord Kitty</a>.
      </p>
    </InternalAside>
    <InternalMain>
      <ContentRenderer :value="content" />
    </InternalMain>
  </NuxtLayout>
</template>
