import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const workItemSchema = z.object({
  title:        z.string(),
  description:  z.string(),
  role:         z.string().optional(),
  year:         z.number().optional(),
  technologies: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  url:          z.string().optional(),
})

export default defineContentConfig({
  collections: {
    siteInfo: defineCollection({
      type: 'page',
      source: 'site-information.md',
      schema: z.object({
        firstName:  z.string(),
        lastName:   z.string(),
        role:       z.string(),
        city:       z.string(),
        state:      z.string(),
        baseTitle:  z.string(),
        resumeUrl:  z.string(),
        navigation: z.array(z.object({
          name: z.string(),
          to:   z.string(),
        })),
        socialLinks: z.array(z.object({
          label: z.string(),
          href:  z.string(),
          icon:  z.string(),
        })),
      }),
    }),
    content: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        works: z.array(workItemSchema).optional(),
        order: z.array(z.string()).optional(),
      }),
    }),
    endorsements: defineCollection({
      type: 'page',
      source: 'endorsements/*.md',
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
    about: defineCollection({
      type: 'page',
      source: 'about/*.md',
      schema: z.object({
        specializations:  z.array(z.string()).optional(),
        location:         z.string().optional(),
        currentlyAt:      z.string().optional(),
        previouslyAt:     z.array(z.string()).optional(),
        currentlyAtLogo:  z.string().optional(),
        education:        z.string().optional(),
        educationLogo:    z.string().optional(),
        favoriteSeries:   z.string().optional(),
        favoriteGenres:   z.array(z.string()).optional(),
        favoriteBands:    z.array(z.string()).optional(),
      }),
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
