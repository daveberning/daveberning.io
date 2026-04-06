import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const testContentPath = fileURLToPath(new URL('./test/fixtures/content', import.meta.url))
const siblingContentRepoPath = fileURLToPath(new URL('../daveberning.io-content', import.meta.url))

/**
 * Determines whether to use local test content based on environment variables.
 * This is useful for testing scenarios where you want to use a local directory instead of fetching from GitHub.
 */
function shouldUseLocalTestContent() {
  return process.env.VITEST === 'true' || process.env.NODE_ENV === 'test'
}

/**
 * Helper function to determine the local content path based on environment variables and testing conditions.
 * It checks for the presence of LOCAL_CONTENT_PATH, whether it's running in a test environment, and if a sibling content repository exists.
 */
function getLocalContentPath() {
  if (process.env.LOCAL_CONTENT_PATH)
    return process.env.LOCAL_CONTENT_PATH

  if (shouldUseLocalTestContent())
    return testContentPath

  if (existsSync(siblingContentRepoPath))
    return siblingContentRepoPath
}

/**
 * Helper function to get authentication details for the content repository.
 * It checks for environment variables CONTENT_REPO_TOKEN and CONTENT_REPO_USERNAME to determine the appropriate credentials.
 */
function getContentRepoAuth() {
  return {
    username: process.env.CONTENT_REPO_USERNAME ?? 'daveberning',
    token: process.env.CONTENT_REPO_TOKEN ?? ''
  }
}

/**
 * Helper function to determine content source based on environment variables.
 * If LOCAL_CONTENT_PATH is set, it will use the local filesystem for content.
 * Otherwise, it will fetch content from the specified GitHub repository.
 */
function githubSource(include: string) {
  const localContentPath = getLocalContentPath()

  if (localContentPath) {
    return { cwd: localContentPath, include }
  }

  return {
    repository: {
      url: 'https://github.com/daveberning/daveberning.io-content',
      branch: 'main',
      auth: getContentRepoAuth(),
    },
    include,
  }
}

const workItemSchema = z.object({
  title:        z.string(),
  description:  z.string(),
  role:         z.string().optional(),
  year:         z.number().optional(),
  technologies: z.array(z.string()).optional(),
  featuredImage: z.string().optional(),
  url:          z.string().optional(),
})

const resumeLinkSchema = z.object({
  label: z.string(),
  href:  z.string(),
})

const resumeEntrySchema = z.object({
  title:       z.string(),
  organization: z.string(),
  period:      z.string(),
  location:    z.string().optional(),
  summary:     z.string().optional(),
  highlights:  z.array(z.string()).optional(),
})

const resumeEducationSchema = z.object({
  school:  z.string(),
  degree:  z.string().optional(),
  details: z.string().optional(),
})

const resumeSkillGroupSchema = z.object({
  title: z.string(),
  items: z.array(z.string()),
})

export default defineContentConfig({
  collections: {
    siteInfo: defineCollection({
      type: 'page',
      source: githubSource('site-information.md'),
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
      source: githubSource('**/*.md'),
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        works: z.array(workItemSchema).optional(),
        order: z.array(z.string()).optional(),
        resume: z.object({
          name:          z.string(),
          role:          z.string(),
          location:      z.string(),
          summary:       z.string(),
          highlights:    z.array(z.string()).optional(),
          focusAreas:    z.array(z.string()).optional(),
          selectedLinks: z.array(resumeLinkSchema).optional(),
          skillGroups:   z.array(resumeSkillGroupSchema).optional(),
          experience:    z.array(resumeEntrySchema).optional(),
          teaching:      z.array(resumeEntrySchema).optional(),
          writing:       z.array(resumeEntrySchema).optional(),
          education:     z.array(resumeEducationSchema).optional(),
        }).optional(),
      }),
    }),
    endorsements: defineCollection({
      type: 'page',
      source: githubSource('endorsements/*.md'),
      schema: z.object({
        name:    z.string().optional(),
        role:    z.string().optional(),
        company: z.string().optional(),
        image:   z.string().optional(),
      }),
    }),
    works: defineCollection({
      type: 'page',
      source: githubSource('work/*.md'),
      schema: workItemSchema,
    }),
    about: defineCollection({
      type: 'page',
      source: githubSource('about/*.md'),
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
      source: githubSource('writing/*.md'),
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
        status:        z.enum(['draft', 'published']).default('published'),
      }),
    }),
  },
})
