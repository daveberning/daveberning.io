import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const workItemSchema = z.object({
  title:        z.string(),
  description:  z.string(),
  role:         z.string().optional(),
  year:         z.number().optional(),
  technologies: z.array(z.string()).optional(),
  url:          z.string().optional(),
})

const testimonialSchema = z.object({
  name:    z.string(),
  role:    z.string(),
  company: z.string(),
  image:   z.string().optional(),
  content: z.string(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        works:        z.array(workItemSchema).optional(),
        testimonials: z.array(testimonialSchema).optional(),
      }),
    }),
  },
})
