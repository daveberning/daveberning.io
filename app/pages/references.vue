<script setup lang="ts">
import Testimonial, {
  TestimonialContent,
  TestimonialAttribution,
  TestimonialPhoto,
  TestimonialName,
  TestimonialRole,
} from '~/components/Testimonial'

useHead({ title: 'References — Dave Berning' })

definePageMeta({ layout: 'internal' })

const { data: page } = await useAsyncData('references', () =>
  queryCollection('content').path('/references').first()
)

const testimonials = computed(() => page.value?.testimonials ?? [])
</script>

<template>
  <UiText as="h1" class="mb-8">References</UiText>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <Testimonial
      v-for="t in testimonials"
      :key="t.name"
      :name="t.name"
      :role="t.role"
      :company="t.company"
    >
      <TestimonialContent>{{ t.content }}</TestimonialContent>
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
