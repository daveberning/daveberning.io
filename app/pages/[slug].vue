<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
definePageMeta({ layout: 'internal' })

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('content').path(route.path).first()
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

useHead({ title: `${page.value.title} — Dave Berning` })

/* Page Content
--------------------------------- */
const content = computed(() => page.value!)
</script>

<template>
  <article>
    <ContentRenderer :value="content" />
  </article>
</template>
