<script setup lang="ts">
/* Page Data
--------------------------------- */
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value)
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })

useHead({
  title: page.value.title
})

/* Page Content
--------------------------------- */
const content = computed(() => page.value!)
</script>

<template>
  <NuxtLayout name="internal">
    <article>
      <ContentRenderer :value="content" />
    </article>
  </NuxtLayout>
</template>
