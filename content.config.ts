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
    writing: defineCollection({
      type: 'page',
      source: 'writing/*.md',
      schema: z.object({
        title:         z.string(),
        description:   z.string(),
        publishedAt:   z.string(),
        updatedAt:     z.string().optional(),
        featuredImage: z.string().optional(),
        tags:          z.array(z.string()).optional(),
        readingTime:   z.number().optional(),
        category:      z.string().optional(),
        externalUrl:   z.string().url().optional(),
        platform:      z.string().optional(),
      }),
    }),
  },
})
