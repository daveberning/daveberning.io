<script setup lang="ts">
/* Page Meta Information
--------------------------------- */
useHead({ title: 'Testimonials — Dave Berning' })
definePageMeta({ layout: 'internal' })

/* Page Content
--------------------------------- */
const [
  { data: index },
  { data: allTestimonials },
] = await Promise.all([
  useAsyncData('testimonials-index', () =>
    queryCollection('content').path('/testimonials').first()
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
    .map(slug => items.find(t => t.path === `/testimonials/${slug}`))
    .filter(t => t != null)
})
</script>

<template>
  <UiText as="h1" class="mb-8">Testimonials</UiText>
  <div class="columns-1 lg:columns-2 xl:columns-3 gap-6">
    <Testimonial v-for="testimonal in testimonials" :key="testimonal.path" :name="testimonal.name ?? ''" class="break-inside-avoid mb-6">
      <TestimonialContent>
        <ContentRenderer :value="testimonal" />
      </TestimonialContent>
      <TestimonialAttribution>
        <TestimonialPhoto :src="testimonal.image" />
        <div class="flex flex-col gap-0.5">
          <TestimonialName>{{ testimonal.name }}</TestimonialName>
          <TestimonialRole>{{ testimonal.role }} &middot; {{ testimonal.company }}</TestimonialRole>
        </div>
      </TestimonialAttribution>
    </Testimonial>
  </div>
</template>
