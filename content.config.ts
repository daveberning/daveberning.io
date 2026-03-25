import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const workItemSchema = z.object({
  title:        z.string(),
  description:  z.string(),
  role:         z.string().optional(),
  year:         z.number().optional(),
  technologies: z.array(z.string()).optional(),
  url:          z.string().optional(),
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        works: z.array(workItemSchema).optional(),
        order: z.array(z.string()).optional(),
      }),
    }),
    testimonials: defineCollection({
      type: 'page',
      source: 'references/*.md',
      schema: z.object({
        name:    z.string().optional(),
        role:    z.string().optional(),
        company: z.string().optional(),
        image:   z.string().optional(),
      }),
    }),
    works: defineCollection({
      type: 'page',
      source: 'work/*.md',
      schema: workItemSchema,
    }),
  },
})
