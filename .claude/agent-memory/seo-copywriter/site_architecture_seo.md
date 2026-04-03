---
name: Site Architecture & SEO Setup
description: Nuxt 4 portfolio site architecture, meta tag implementation patterns, and schema org usage
type: reference
---

## Overview
- **Framework**: Nuxt 4 with `compatibilityVersion: 4`
- **Source**: Files under `app/` directory
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite`, no tailwind.config.js
- **Meta Tag Implementation**: `useSeoMeta()` + `useHead()` for structured data
- **Sitemap**: @nuxtjs/sitemap module (excludes /storybook/**)
- **robots.txt**: Located at `public/robots.txt`, allows all except /storybook/

## Pages (13 total)
1. `/` (index.vue) — Homepage with dynamic title/description from useSiteInfo
2. `/about` (about.vue) — About page
3. `/contact` (contact.vue) — Contact form page
4. `/resume` (resume.vue) — Resume/CV page
5. `/endorsements` (endorsements.vue) — Testimonials/endorsements collection
6. `/work` (work/index.vue) — Portfolio projects list
7. `/work/[slug]` (work/[slug].vue) — Individual project detail page
8. `/writing` (writing/index.vue) — Blog/articles list
9. `/writing/[slug]` (writing/[slug].vue) — Individual article page
10. `/[slug]` (catch-all [slug].vue) — Generic content pages from nuxt/content

## Meta Tag Implementation Patterns

### Layout System (default.vue)
- **titleTemplate**: Dynamically builds titles as `{Page Title} | {Full Name} {baseTitle}`
- **canonical**: Auto-generated per route via `useHead()` link element
- **Global Person schema**: Injected in default layout
- **Global OG meta**: `ogSiteName`, `ogUrl`, `ogImage`, `twitterCard`, `twitterImage`

### Page-level Implementation
- **useSeoMeta()**: Used for page-specific title, description, OG tags, Twitter cards
- **useHead()**: Used for JSON-LD schema + script injection
- **Dynamic metadata**: Sourced from nuxt/content frontmatter or runtime data

## OG/Twitter Card Pattern
- All pages use: `twitterCard: 'summary_large_image'`
- All pages use same fallback image: `/bg/plaid-bg-teal.jpg` (actual theme-aware images exist: plaid-bg-{blue,green,purple,red,teal}.jpg)
- `ogType`: varies by page (`website`, `profile`, `article`)

## Schema.org Types in Use
- Person (global + resume page)
- WebSite (homepage)
- AboutPage (about page)
- ContactPage (contact page)
- ProfilePage (resume page)
- Article (blog posts)
- CreativeWork (work projects)
- CollectionPage (work/index, endorsements/index, writing/index)
- ItemList (work/index, endorsements/index)

## Runtime Config
- `siteUrl`: Defaults to `https://daveberning.netlify.app` via NUXT_PUBLIC_SITE_URL env var (should be https://daveberning.io in production)
