<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'References — Dave Berning' })
definePageMeta({ layout: 'internal' })

/* Page Content
--------------------------------- */
const [
  { data: index },
  { data: allTestimonials },
] = await Promise.all([
  useAsyncData('references-index', () =>
    queryCollection('content').path('/references').first()
  ),
  useAsyncData('testimonials', () =>
    queryCollection('testimonials').all()
  ),
])

const testimonials = computed(() => {
  const order = index.value?.order ?? []
  const items = (allTestimonials.value ?? []).filter(t => t.name)

  if (!order.length) return items

  return order
    .map(slug => items.find(t => t.path === `/references/${slug}`))
    .filter(t => t != null)
})
</script>

<template>
  <UiText as="h1" class="mb-8">References</UiText>
  <div class="columns-1 lg:columns-3 gap-6">
    <Testimonial v-for="t in testimonials" :key="t.path" :name="t.name ?? ''" :role="t.role ?? ''" :company="t.company ?? ''" class="break-inside-avoid mb-6">
      <TestimonialContent>
        <ContentRenderer :value="t" />
      </TestimonialContent>
      <TestimonialAttribution>
        <TestimonialPhoto :src="t.image" />
        <div class="flex flex-col gap-0.5">
          <TestimonialName />
          <TestimonialRole />
        </div>
      </TestimonialAttribution>
    </Testimonial>
  </div>
</template>
