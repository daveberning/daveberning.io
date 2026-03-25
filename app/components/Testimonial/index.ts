import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import type { Ref } from 'vue'
import { useCreateContext } from '~/composables/useCreateContext'
import Testimonial from './Testimonial.vue'
import TestimonialContent from './TestimonialContent.vue'
import TestimonialAttribution from './TestimonialAttribution.vue'
import TestimonialPhoto from './TestimonialPhoto.vue'
import TestimonialName from './TestimonialName.vue'
import TestimonialRole from './TestimonialRole.vue'

/* Context
--------------------------------------------------------------------- */
interface TestimonialContext {
  name:    Ref<string>
  role:    Ref<string>
  company: Ref<string>
}

const [injectTestimonialContext, provideTestimonialContext] = useCreateContext<TestimonialContext>('Testimonial')

export { injectTestimonialContext, provideTestimonialContext }

/* Variants
--------------------------------------------------------------------- */
export const testimonialVariants = cva(
  'rounded-2xl border border-border bg-surface flex flex-col gap-6 p-6 sm:p-8',
)

export const testimonialContentVariants = cva('flex flex-col gap-3')

export const testimonialAttributionVariants = cva('flex flex-col gap-4')

export const testimonialPhotoVariants = cva(
  'size-12 rounded-full shrink-0 ring-2 ring-border overflow-hidden flex items-center justify-center',
)

export const testimonialNameVariants = cva('text-sm font-semibold text-text')

export const testimonialRoleVariants = cva('text-xs text-text-muted')

/* Types
--------------------------------------------------------------------- */
export type TestimonialVariants = VariantProps<typeof testimonialVariants>

export interface TestimonialProps {
  name:    string
  role:    string
  company: string
  class?:  string
  as?:     string
}

export interface TestimonialContentProps {
  class?: string
}

export interface TestimonialAttributionProps {
  class?: string
}

export interface TestimonialPhotoProps {
  src?:   string
  class?: string
}

export interface TestimonialNameProps {
  class?: string
}

export interface TestimonialRoleProps {
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Testimonial as default,
  TestimonialContent,
  TestimonialAttribution,
  TestimonialPhoto,
  TestimonialName,
  TestimonialRole,
}
