---
name: SEO Audit Findings
description: Comprehensive audit of daveberning.io portfolio with critical, high, medium priority items
type: project
---

# SEO Audit Report — daveberning.io

**Audit Date**: 2026-04-02  
**Site**: Nuxt 4 portfolio (https://daveberning.io)  
**Current Branch**: develop

## CRITICAL ISSUES (Must fix before launch)

### 1. **Missing Page Titles (H1 mismatch with Title tags)**
- **Pages affected**: index.vue (homepage)
- **Issue**: Homepage sets page meta title dynamically but does NOT render an H1 tag matching the title. The UiText h1 displays `{firstName} {lastName}` while the page title is `{firstName} {lastName} | Front-End Software Engineer`
- **Impact**: Heading hierarchy broken; H1 doesn't match primary keyword in title. Crawlers see disconnect between title and content.
- **Fix**: Add an H1 to homepage that reads "Front-End Software Engineer" or update the page title to match the rendered h1

### 2. **OG Images Always Use Fallback (plaid-bg-teal.jpg)**
- **Pages affected**: ALL pages
- **Issue**: All pages hardcode `ogImage: \`${siteUrl}/bg/plaid-bg-teal.jpg\`` regardless of content or theme. No custom OG images per page.
- **Impact**: Social shares (LinkedIn, Twitter, etc.) show identical preview image for all pages. Portfolio projects have no visual representation when shared.
- **Fix**: Create unique OG images for key pages (homepage, work projects, articles). Use theme color to select the right plaid-bg variant.

### 3. **Missing Canonical Tags on Dynamic Pages**
- **Pages affected**: work/[slug].vue, writing/[slug].vue, [slug].vue (catch-all)
- **Issue**: These pages do NOT set explicit canonical URLs via useSeoMeta(). Default layout's generic `useHead()` canonical may not fire correctly for dynamic routes with parameters.
- **Impact**: Risk of duplicate content indexing if URL parameters vary.
- **Fix**: Add `canonicalUrl` to useSeoMeta() on all dynamic pages

### 4. **Missing Meta Descriptions on Dynamic Pages**
- **Pages affected**: work/[slug].vue, [slug].vue (catch-all)
- **Issue**: work/[slug].vue uses `work.value.description` which is good, but [slug].vue uses `page.value.description ?? page.value.title` — if description is missing from frontmatter, fallback to title (not ideal for SERP display).
- **Impact**: Weak meta descriptions for catch-all pages; limited control over SERP click-through rate.
- **Fix**: Ensure all content frontmatter includes a unique, 150–160 character description

### 5. **Title Tags Missing Brand Name/Context**
- **Pages affected**: All non-homepage pages (about, contact, work, writing, endorsements, etc.)
- **Issue**: Page titles are set to single words ("About", "Contact", "Work", etc.) via `useHead({ title: '...' })`. Dynamic title template in layout appends full name + base title, BUT this happens AFTER the page composable runs, so if there's any SSR/timing issue, pages could render without full context.
- **Impact**: SERP titles look generic ("About | Dave Berning") instead of compelling. No primary keyword.
- **Fix**: Ensure all page titles are 50–60 characters with brand name and keyword (e.g., "About Dave Berning, Senior Front-End Engineer")

### 6. **twitter:creator Tag Missing**
- **Pages affected**: All pages
- **Issue**: No `twitter:creator` tag set. Only `twitterCard`, `twitterImage`, `twitterTitle`, `twitterDescription` are set.
- **Impact**: Twitter doesn't know who to credit. Reduces likelihood of engagement metrics being tied to creator account.
- **Fix**: Add `twitterCreator: '@daveberning'` (or actual handle) to useSeoMeta() in default layout

### 7. **Alt Text Missing on Images**
- **Pages affected**: resume.vue (portrait img tag), writing/index.vue (featured images), writing/[slug].vue (featured image)
- **Issue**: 
  - resume.vue: `<img :src="portraitSrc" alt="" ...>` has empty alt (decorative use OK, but this is a portrait photo that's not decorative)
  - writing/[slug].vue: `<NuxtImg :src="post!.featuredImage" :alt="post!.title" ...>` HAS alt text (good)
  - writing/index.vue: `<NuxtImg :src="post.featuredImage" :alt="post.title" ...>` HAS alt text (good)
- **Impact**: Resume portrait photo not accessible; missing SEO signal.
- **Fix**: Set resume portrait alt to a descriptive phrase like "Dave Berning, Senior Front-End Engineer"

---

## HIGH PRIORITY (Should fix)

### 8. **Article Schema Missing Author URL on Blog Posts**
- **Pages affected**: writing/[slug].vue
- **Issue**: Article schema includes `author.name` and `author.url`, but does NOT include author email or sameAs array. Author object is minimal.
- **Impact**: Search engines have less context about author credibility (E-E-A-T signal).
- **Fix**: Extend author schema to include email, sameAs array (LinkedIn, GitHub, etc.)

### 9. **Work Project Pages Have No Project-Specific Schema**
- **Pages affected**: work/[slug].vue
- **Issue**: Uses generic `CreativeWork` schema. Could be more specific: `SoftwareSourceCode` (if repo is public) or `Thing` with more detailed properties.
- **Impact**: Search engines can't distinguish between different types of portfolio work (design, engineering, writing, etc.).
- **Fix**: Use more specific schema types (SoftwareApplication, ImageObject, etc.) based on project type. Include client name, start/end date, awards if applicable.

### 10. **Homepage Schema Missing Image & Offers**
- **Pages affected**: index.vue
- **Issue**: WebSite schema only includes name, url, description. No image, sameAs, or contact point.
- **Impact**: Weak entity signal. Google can't show rich results (e.g., knowledge panel info).
- **Fix**: Add image, sameAs (social links), and potentialAction schema for "Hire" or "Contact"

### 11. **Resume Page URL Hardcoded in Multiple Places**
- **Pages affected**: Contact page, Footer, Header (sidebar layout)
- **Issue**: `siteInfo?.resumeUrl` is referenced but not always present. No canonical resume path.
- **Impact**: Potential for multiple URLs pointing to resume (e.g., /resume, /resume.pdf, external link).
- **Fix**: Define a single canonical resume URL in site config

### 12. **Meta Keywords Missing**
- **All pages**
- **Issue**: No `<meta name="keywords">` tags
- **Impact**: Bing still reads keywords meta; missing SEO signal for Bing search. Google ignores, but best practice.
- **Fix**: Add keywords meta to all pages (3–5 relevant terms per page)

### 13. **og:locale Not Set**
- **All pages**
- **Issue**: No `ogLocale` meta tag
- **Impact**: Social platforms default to en_US; may not correctly detect if content is in multiple languages.
- **Fix**: Add `ogLocale: 'en_US'` to default layout useSeoMeta()

### 14. **Writing Index Page Missing Pagination/Load More Schema**
- **Pages affected**: writing/index.vue
- **Issue**: Displays all blog posts in one grid. No pagination or load-more mechanism. Schema doesn't reflect itemListElement structure.
- **Impact**: Very long page; crawlers see all content as "equally important". No SEO signal for navigation.
- **Fix**: Implement pagination or next/previous links with PaginationElement schema

### 15. **Endorsements Page Missing Structured Review Schema**
- **Pages affected**: endorsements/index.vue
- **Issue**: Uses generic CollectionPage + ItemList. Individual endorsements could use Review or AggregateRating schema.
- **Impact**: Search engines can't display endorsements as testimonials/reviews in SERP.
- **Fix**: Wrap endorsements in Review schema (`@type: Review`, `reviewRating`, `reviewBody`, `author`)

---

## MEDIUM PRIORITY (Nice to have)

### 16. **Inconsistent Meta Description Length**
- **Pages affected**: All pages
- **Issue**: Some descriptions are too long (> 160 chars), some too short (< 120 chars). Examples:
  - Homepage: "Senior Front-End Software Engineer in Cincinnati, OH specializing in Vue, Nuxt, TypeScript, design systems, and front-end architecture." (139 chars — OK)
  - About: "Learn about Dave Berning, a Senior Front-End Software Engineer specializing in Vue, Nuxt, design systems, mentoring, and front-end architecture." (149 chars — OK)
  - Contact: "Contact Dave Berning about senior front-end engineering roles, front-end architecture, design systems, or collaboration opportunities." (140 chars — OK)
  - Work: "Explore front-end engineering case studies from Dave Berning, including Vue, Nuxt, TypeScript, design systems, and enterprise architecture work." (149 chars — OK)
- **Impact**: Some SERP previews truncated; CTR impact minimal but should be consistent.
- **Fix**: Review all meta descriptions; ensure 150–160 character sweet spot

### 17. **No Robots Meta Directive in Pages**
- **Pages affected**: All pages
- **Issue**: No `robots` meta tag (noindex, nofollow, etc.). Assumes all content is indexable.
- **Impact**: If private content exists, it could be indexed. Not a risk for public portfolio.
- **Fix**: Optional — only needed if some pages should be noindex

### 18. **Writing Platform Name Not In Page Title**
- **Pages affected**: writing/index.vue, writing/[slug].vue
- **Issue**: Blog platform (if republished content) is shown in card but not in page title or schema.
- **Impact**: If sourcing from external platforms (Medium, Dev.to, etc.), credit is unclear.
- **Fix**: If applicable, add platform info to schema author or title

### 19. **No BreadcrumbList Schema**
- **Pages affected**: All pages
- **Issue**: No breadcrumb navigation or BreadcrumbList schema
- **Impact**: Rich breadcrumbs won't display in SERP
- **Fix**: Implement breadcrumbs in sidebar layout; add BreadcrumbList schema

### 20. **No Image Optimization for OG Images**
- **Pages affected**: All pages
- **Issue**: OG images are static JPGs. No WebP alternatives or responsive sizes.
- **Impact**: OG images may load slowly on mobile/social platforms
- **Fix**: Optimize with NuxtImage; consider generating OG images at build time

### 21. **No FAQSchema on Relevant Pages**
- **Pages affected**: About page, Contact page could benefit
- **Issue**: No FAQ schema even though these pages answer common questions
- **Impact**: FAQ rich results won't display
- **Fix**: Add FAQ schema if relevant (e.g., "How do I hire Dave?" "What technologies do you use?")

### 22. **Writing List Page Not Using Reading Time for Schema**
- **Pages affected**: writing/index.vue
- **Issue**: Reading time is displayed in UI but not included in ListItem schema
- **Impact**: Search engines don't know estimated read duration
- **Fix**: Add `duration` property to ListItem schema

### 23. **No Open Graph Type Specificity for Some Pages**
- **Pages affected**: endorsements.vue
- **Issue**: Uses `ogType: 'website'` which is generic. Could be `profile` since it's about a person.
- **Impact**: Social platforms default to generic preview template
- **Fix**: Consider `ogType: 'profile'` for endorsements/testimonial page

### 24. **Author Name Hardcoded in Schema**
- **Pages affected**: writing/[slug].vue
- **Issue**: Author name hardcoded as "Dave Berning" in Article schema. If site owner changes, must update manually.
- **Impact**: Maintenance burden
- **Fix**: Pull author name from useSiteInfo() or config

---

## COMPLIANCE & TECHNICAL SEO

### 25. **Viewport Meta Tag** ✓ (GOOD)
- Set correctly in Nuxt config: `htmlAttrs: { lang: 'en' }`
- Viewport is auto-generated by Nuxt

### 26. **Hreflang Tags** ✓ (N/A)
- Not needed (English-only site, single language)

### 27. **Sitemap** ✓ (GOOD)
- Generated via @nuxtjs/sitemap module
- Correct URL in robots.txt: `https://daveberning.io/sitemap.xml`
- Excludes /storybook/** correctly

### 28. **robots.txt** ✓ (GOOD)
- Allows all content except /storybook/
- Correct Sitemap directive

---

## SUMMARY CHECKLIST

**Critical (Block Launch)**: 7 items
- Missing H1 on homepage
- OG images always fallback to teal
- Missing canonical tags on dynamic pages
- Missing meta descriptions on catch-all pages
- Title tags too generic (single words)
- Missing twitter:creator
- Alt text missing on portraits

**High Priority (Fix Soon)**: 8 items
- Article schema author needs expansion
- Work pages need specific schema
- Homepage schema needs image + sameAs
- Resume URL standardization
- Meta keywords missing (Bing signal)
- og:locale not set
- Writing page pagination/schema
- Endorsements review schema

**Medium Priority (Nice to Have)**: 8 items
- Meta description consistency
- Robots meta directive
- Platform info in writing schema
- BreadcrumbList schema
- OG image optimization
- FAQ schema
- Reading time in ListItem schema
- OG type specificity for endorsements

**GOOD/COMPLIANT**: 3 items
- Viewport meta tag
- Hreflang tags (N/A)
- Sitemap + robots.txt
