# SEO Audit: Actionable Checklist
**daveberning.io Portfolio Site**  
**Audit Date**: April 2, 2026  
**Status**: Ready for Implementation  

---

## CRITICAL (Block Launch) — Fix First

### ✗ 1. Fix Homepage Title and H1 Mismatch
- **Current State**: 
  - Page title: `{firstName} {lastName} | Front-End Software Engineer`
  - H1 rendered: `{firstName} {lastName}` (missing the professional context)
- **File**: `app/pages/index.vue`
- **What to Do**:
  - Option A: Add H1 to template that reads "Front-End Software Engineer" beneath the name
  - Option B: Update page title to match rendered content (less SEO-friendly)
  - **Recommended**: Option A — add semantic H2 after name with professional role
- **Why**: Search engines expect H1 to match/summarize page title. Crawler sees title says "engineer" but content H1 doesn't confirm. Weak E-E-A-T signal.
- **Impact**: High — first page impression; homepage CTR in SERP affected

### ✗ 2. Create Unique OG Images for Each Page
- **Current State**: All pages hardcode `ogImage: ${siteUrl}/bg/plaid-bg-teal.jpg`
- **Files**: 
  - `app/pages/index.vue`, `about.vue`, `contact.vue`, `resume.vue`, `endorsements.vue`, `work/index.vue`, `work/[slug].vue`, `writing/index.vue`, `writing/[slug].vue`, `[slug].vue`
  - Also in `app/layouts/default.vue` (global fallback)
- **What to Do**:
  1. Create OG images for key pages (homepage, /about, /work, /writing, /resume)
  2. For work projects, generate OG images with project title + tech stack (consider dynamic generation at build time)
  3. For blog articles, use featured image if available, fallback to theme color plaid
  4. Update each page's `useSeoMeta()` to reference theme-specific image:
     ```ts
     ogImage: `${siteUrl}/bg/plaid-bg-${color.value}.jpg`
     ```
  5. For dynamic pages (work/[slug], writing/[slug]), derive image from content + color
- **Why**: Social shares (LinkedIn, Twitter, Slack unfurls) show identical image regardless of content. Portfolio items look identical when shared — reduces click-through and discovery.
- **Impact**: Very High — LinkedIn/Twitter traffic potential; brand differentiation

### ✗ 3. Add Canonical URLs to All Dynamic Pages
- **Current State**: 
  - work/[slug].vue: No explicit canonical in useSeoMeta()
  - writing/[slug].vue: HAS canonicalUrl set properly (good example)
  - [slug].vue: No explicit canonical
- **Files**:
  - `app/pages/work/[slug].vue` (line 17–27)
  - `app/pages/[slug].vue` (line 33–40)
- **What to Do**:
  ```ts
  const canonicalUrl = `${siteUrl}${route.path}`
  useSeoMeta({
    canonical: canonicalUrl,  // Add this line
    description: work.value.description,
    ogUrl: canonicalUrl,
    // ... rest of meta
  })
  ```
- **Why**: Duplicate URL prevention; Google respects canonical tags. Without them, crawlers may index multiple versions of the same page.
- **Impact**: High — SEO health; duplicate content risk

### ✗ 4. Ensure All Page Titles Include Brand Name + Primary Keyword
- **Current State**: 
  - `/about`: Title becomes "About | Dave Berning" (generic)
  - `/contact`: Title becomes "Contact | Dave Berning" (generic)
  - `/work`: Title becomes "Work | Dave Berning" (generic)
  - These are set by `useHead({ title: 'About' })` then appended by layout template
- **Files**:
  - `app/pages/about.vue` (line 8)
  - `app/pages/contact.vue` (line 12)
  - `app/pages/resume.vue` (line 64)
  - `app/pages/endorsements.vue` (line 10)
  - `app/pages/work/index.vue` (line 8)
  - `app/pages/writing/index.vue` (line 13)
- **What to Do**: 
  Update all page titles to be 50–60 characters with primary keyword:
  ```ts
  // About
  useHead({ title: 'About Dave Berning, Senior Front-End Engineer' })
  
  // Contact
  useHead({ title: 'Contact Dave Berning for Front-End Projects' })
  
  // Resume
  useHead({ title: 'Resume – Senior Front-End Software Engineer' })
  
  // Work
  useHead({ title: 'Portfolio – Vue, Nuxt & TypeScript Projects' })
  
  // Writing
  useHead({ title: 'Articles on Vue, Nuxt, TypeScript & Web Dev' })
  
  // Endorsements
  useHead({ title: 'Endorsements – Client & Colleague Testimonials' })
  ```
  Then verify `titleTemplate` in default layout appends correctly (it should NOT double-append).
- **Why**: SERP titles should be compelling, keyword-rich, and brand-aware. Single-word titles don't convey value or SEO intent.
- **Impact**: High — SERP CTR; keyword relevance

### ✗ 5. Add twitter:creator Meta Tag
- **Current State**: No twitter:creator tag
- **File**: `app/layouts/default.vue` (lines 56–62)
- **What to Do**:
  ```ts
  useSeoMeta({
    // ... existing meta
    twitterCreator: '@daveberning',  // Add this
  })
  ```
  (Replace @daveberning with your actual Twitter handle)
- **Why**: Attributes content to your Twitter account; builds follower engagement; signals authority.
- **Impact**: Medium — Twitter/X engagement and analytics

### ✗ 6. Fix Alt Text on Resume Portrait Image
- **Current State**: `<img :src="portraitSrc" alt="" class="...">`
- **File**: `app/pages/resume.vue` (line 125)
- **What to Do**:
  ```vue
  <img :src="portraitSrc" alt="Dave Berning, Senior Front-End Software Engineer" class="h-28 w-28 rounded-full border-4 border-theme object-cover shadow-lg" />
  ```
- **Why**: Accessibility (screen readers); SEO image signal (Google Images can rank this photo).
- **Impact**: Medium — Accessibility compliance; image SEO

### ✗ 7. Add Meta Descriptions to Content Frontmatter
- **Current State**: Catch-all page (`[slug].vue`) falls back to title if description missing
- **File**: Content markdown files (wherever they live in nuxt/content collection)
- **What to Do**:
  - Ensure every markdown file in the content collection has a `description` frontmatter field (150–160 chars)
  - Example:
    ```markdown
    ---
    title: "Page Title"
    description: "This is a compelling 150-160 character description that explains the page content and includes a keyword or two for search relevance."
    ---
    ```
- **Why**: Meta descriptions directly affect SERP CTR. Fallback to title is weak.
- **Impact**: High — SERP CTR; click-through rate

---

## HIGH PRIORITY (Do Next) — Major SEO Improvements

### ✗ 8. Expand Article Schema with Author Details
- **Current State** (writing/[slug].vue lines 26–40):
  ```json
  {
    "@type": "Article",
    "author": {
      "@type": "Person",
      "name": "Dave Berning",
      "url": "https://daveberning.io"
    }
  }
  ```
- **File**: `app/pages/writing/[slug].vue`
- **What to Do**:
  ```ts
  author: {
    '@type': 'Person',
    name: 'Dave Berning',
    url: siteUrl,
    email: 'contact@daveberning.io',  // Add if you want to expose it
    sameAs: [
      'https://www.linkedin.com/in/davidberning/',
      'https://github.com/daveberning',
      'https://x.com/daveberning',  // If applicable
    ],
  }
  ```
- **Why**: E-E-A-T signal. Search engines use author credentials to assess article credibility.
- **Impact**: Medium — E-A-T signal for articles; author authority

### ✗ 9. Upgrade Work Project Schema to SoftwareApplication or More Specific Type
- **Current State** (work/[slug].vue): Uses generic `CreativeWork`
- **File**: `app/pages/work/[slug].vue` (lines 30–44)
- **What to Do**:
  ```ts
  // If the project is a published app or tool:
  {
    '@type': 'SoftwareApplication',
    name: work.value.title,
    description: work.value.description,
    applicationCategory: 'DeveloperApplication',  // or 'BusinessApplication'
    url: `${siteUrl}${route.path}`,
    image: work.value.image || `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
    developer: {
      '@type': 'Person',
      name: 'Dave Berning',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      price: '0',  // If free/portfolio piece
    },
  }
  
  // OR if it's a case study / custom work:
  {
    '@type': 'Thing',
    name: work.value.title,
    description: work.value.description,
    url: `${siteUrl}${route.path}`,
    image: work.value.image || `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,
    workExample: {
      '@type': 'CreativeWork',
      name: work.value.title,
      creator: {
        '@type': 'Person',
        name: 'Dave Berning',
      },
    },
    technologies: work.value.technologies,  // Array of tech used
    startDate: work.value.startDate,
    endDate: work.value.endDate,
  }
  ```
- **Why**: More specific schema helps Google understand project type and display richer results.
- **Impact**: High — Rich results potential; project discovery

### ✗ 10. Enhance Homepage Person Schema
- **Current State** (default.vue lines 33–51): Includes name, jobTitle, url, address, sameAs
- **File**: `app/layouts/default.vue`
- **What to Do**: Add image and contact point:
  ```ts
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: fullName.value,
    jobTitle: siteInfo.value?.role ?? 'Front-End Software Engineer',
    url: siteUrl,
    image: `${siteUrl}/bg/plaid-bg-${color.value}.jpg`,  // Portrait image
    address: { ... },
    sameAs: [ ... ],
    email: 'dave@example.com',  // Optional
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      url: `${siteUrl}/contact`,
    },
  }
  ```
- **Why**: Complete Person schema helps Google build knowledge panel and display contact info.
- **Impact**: Medium — Knowledge panel potential; direct contact visibility

### ✗ 11. Add Meta Keywords to All Pages
- **Current State**: No meta keywords tag
- **File**: Each page's useSeoMeta() call
- **What to Do**:
  ```ts
  // Pages should include:
  useSeoMeta({
    keywords: 'keyword1, keyword2, keyword3',  // 3–5 keywords per page
    // ... rest of meta
  })
  ```
  **Examples by page**:
  - Homepage: `'front-end engineer, Vue, Nuxt, TypeScript, design systems'`
  - About: `'senior engineer, front-end architecture, Vue specialist, Cincinnati'`
  - Contact: `'hire developer, freelance front-end, collaboration'`
  - Work: `'portfolio projects, Vue applications, TypeScript, case studies'`
  - Writing: `'front-end articles, Vue tutorials, JavaScript, web development'`
  - Resume: `'CV, resume, front-end engineer, professional experience'`
- **Why**: Google ignores keywords, but Bing still reads them. Best practice; low effort.
- **Impact**: Low-Medium — Bing SEO; completeness

### ✗ 12. Add og:locale Meta Tag
- **Current State**: Not set
- **File**: `app/layouts/default.vue` (lines 56–62)
- **What to Do**:
  ```ts
  useSeoMeta({
    // ... existing
    ogLocale: 'en_US',
  })
  ```
- **Why**: Tells social platforms and crawlers the page language/region.
- **Impact**: Low — Correct locale detection on social

### ✗ 13. Implement Pagination or Schema for Writing Index
- **Current State**: All blog posts displayed in one grid; no pagination
- **File**: `app/pages/writing/index.vue`
- **What to Do**: Either:
  - **Option A (Recommended)**: Add pagination (e.g., 10 posts per page) and PaginationElement schema
  - **Option B**: Keep all posts but add hasPart/isPartOf schema to indicate this is a collection
  
  For Option B (simpler):
  ```ts
  useHead({
    script: [{
      key: 'writing-collection-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Writing',
        description: '...',
        url: `${siteUrl}/writing`,
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: posts.value.length,
          itemListElement: posts.value.map((post, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: post.title,
            url: `${siteUrl}${post.path}`,
            image: post.featuredImage || `${siteUrl}/bg/plaid-bg-teal.jpg`,
          })),
        },
      }),
    }],
  })
  ```
  (Currently missing itemListElement structure)
- **Why**: Helps Google understand pagination and discover individual posts faster. Improves crawl efficiency.
- **Impact**: Medium — Crawl efficiency; article indexing

### ✗ 14. Add Review/Testimonial Schema to Endorsements
- **Current State** (endorsements/index.vue): Uses generic CollectionPage + ItemList
- **File**: `app/pages/endorsements/index.vue` (lines 42–65)
- **What to Do**: Update mainEntity to include Review schema for each endorsement:
  ```ts
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: endorsements.value.map((endorsement, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Review',
        reviewBody: endorsement.body || 'Endorsement',  // Pull from content
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',  // All endorsements are positive
          bestRating: '5',
        },
        author: {
          '@type': 'Person',
          name: endorsement.name,
          jobTitle: endorsement.role,
          company: endorsement.company,
        },
        reviewSubject: 'Dave Berning',  // The person being reviewed
      },
    })),
  }
  ```
- **Why**: Enables Google to display endorsements/reviews in rich results. Boosts credibility (E-A-T).
- **Impact**: High — Rich review results; trust signals

### ✗ 15. Standardize Resume URL and Add Structured Resume Data
- **Current State**: /resume is rendered page; /dave-berning-resume.pdf is downloadable
- **Files**: 
  - `app/pages/resume.vue` (line 115: `href="/dave-berning-resume.pdf"`)
  - Sidebar layout (line 57: `href="siteInfo?.resumeUrl"`)
- **What to Do**:
  1. Define a single canonical resume URL in site config (default.vue or nuxt.config):
     ```ts
     // In composable or config
     const resumeUrl = '/resume'  // Or '/dave-berning-resume.pdf'?
     ```
  2. Ensure all links point to same URL
  3. Add Resume-specific structured data (if using a JSON resume format):
     ```ts
     {
       '@type': 'Resume',  // Non-standard but useful
       // OR use ProfilePage (already done) with more detail
     }
     ```
- **Why**: Prevents link fragmentation; Google knows which is canonical.
- **Impact**: Low-Medium — URL consistency

---

## MEDIUM PRIORITY (Nice to Have) — Polish & Optimization

### ◇ 16. Optimize OG Image File Sizes & Formats
- **Current State**: JPG files only; no WebP alternative
- **What to Do**: 
  - Compress existing JPGs (target: 100–150KB each)
  - Generate WebP versions for faster social platform loads
  - Consider responsive sizing (different sizes for different platforms)
- **Why**: Faster social media unfurl; better UX
- **Impact**: Low — Performance; social media UX

### ◇ 17. Add BreadcrumbList Schema
- **Current State**: No breadcrumb navigation
- **What to Do**: 
  1. Implement breadcrumb nav in sidebar layout or default layout
  2. Add schema:
     ```ts
     {
       '@type': 'BreadcrumbList',
       itemListElement: breadcrumbs.map((item, idx) => ({
         '@type': 'ListItem',
         position: idx + 1,
         name: item.label,
         item: `${siteUrl}${item.url}`,
       })),
     }
     ```
- **Why**: Rich breadcrumbs in SERP; improved navigation signaling
- **Impact**: Low-Medium — UX + SERP appearance

### ◇ 18. Add FAQ Schema (Optional)
- **Current State**: No FAQ section
- **What to Do**: If appropriate, add FAQ section to About or Contact page:
  ```json
  {
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How can I hire you?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Visit my contact page..."
        }
      },
      ...
    ]
  }
  ```
- **Why**: FAQ rich results in SERP
- **Impact**: Low — SEO enhancement if applicable

### ◇ 19. Add Reading Time to Blog List Schema
- **Current State**: Reading time displayed in UI but not in schema
- **File**: `app/pages/writing/index.vue`
- **What to Do**: Add `duration` to ListItem schema:
  ```ts
  itemListElement: posts.value.map((post, idx) => ({
    '@type': 'ListItem',
    position: idx + 1,
    name: post.title,
    url: `${siteUrl}${post.path}`,
    description: post.description,
    image: post.featuredImage,
    duration: `PT${post.readingTime}M`,  // ISO 8601 format
  }))
  ```
- **Why**: SEO signal; helps Google snippet/rich result display
- **Impact**: Low — Completeness

### ◇ 20. Consider Dynamic OG Image Generation
- **Current State**: Static images
- **What to Do**: Use a service like Satori or Playwright to generate OG images at build time with dynamic content:
  - Work title + tech stack
  - Article title + date
  - Author name + role
- **Why**: Unique visual preview for every page; improved social sharing
- **Impact**: Medium — Brand differentiation; social CTR

### ◇ 21. Add Rel="author" to Author Bio
- **Current State**: Author name in Article schema but no rel=author link
- **What to Do**: In article footer or author section:
  ```html
  <a rel="author" href="https://daveberning.io">Dave Berning</a>
  ```
- **Why**: SEO best practice; helps Google associate article with author profile
- **Impact**: Low — Author authority signaling

### ◇ 22. Add Data-nosnippet to Non-Indexable Content (Optional)
- **Current State**: All content indexable
- **What to Do**: If any content should NOT appear in SERP snippets, add:
  ```html
  <div data-nosnippet>Non-snippet content</div>
  ```
- **Why**: Fine-grained SERP snippet control
- **Impact**: Low — Only if needed

### ◇ 23. Monitor Core Web Vitals
- **Current State**: Not explicitly tracked
- **What to Do**: 
  - Install Google Analytics or similar
  - Monitor LCP (Largest Contentful Paint), FID (First Input Delay), CLS (Cumulative Layout Shift)
- **Why**: Core Web Vitals are a Google ranking factor
- **Impact**: Medium — Site speed SEO

### ◇ 24. Add JSON Resume Format (Optional)
- **Current State**: Resume rendered as HTML
- **What to Do**: Generate JSON Resume format and link:
  ```html
  <link rel="alternate" type="application/json" href="/dave-berning-resume.json">
  ```
- **Why**: Makes resume machine-readable; supports resume databases/ATS
- **Impact**: Low — Extra channel for discoverability

---

## VERIFICATION & TESTING

After implementing fixes, verify with these tools:

1. **Google Search Console**
   - Submit sitemaps
   - Check coverage (indexed vs. excluded pages)
   - View Core Web Vitals
   - Check mobile usability

2. **Google Structured Data Testing**
   - Validate all JSON-LD schemas
   - Check for schema errors/warnings

3. **Facebook Sharing Debugger**
   - Test OG meta tags and image rendering

4. **Twitter Card Validator**
   - Verify twitter:card tags and image display

5. **Lighthouse**
   - Run SEO audit (target: 90+)
   - Check accessibility (target: 90+)
   - Check performance (target: 80+)

6. **Bing Webmaster Tools**
   - Submit site + sitemap
   - Monitor indexing
   - Check keywords meta tags

---

## QUICK WIN SUMMARY

**Highest ROI fixes (do first)**:
1. Add twitter:creator tag (5 min)
2. Update page titles with keywords (15 min)
3. Fix homepage H1 (10 min)
4. Add canonical URLs to dynamic pages (10 min)
5. Add alt text to resume portrait (2 min)
6. Create unique OG images (varies, but high impact)

**Target Timeline**: 
- Critical fixes: 1–2 days
- High priority: 3–5 days
- Medium priority: Ongoing optimization

---

## RELATED FILES

- Audit findings: `.claude/agent-memory/seo-copywriter/seo_audit_findings.md`
- Site architecture: `.claude/agent-memory/seo-copywriter/site_architecture_seo.md`
- Config reference: `nuxt.config.ts` (siteUrl, modules)
- Layout: `app/layouts/default.vue` (global meta + schema)
- Pages: `app/pages/*.vue` (page-specific meta)

---

*Generated by SEO Copywriter agent on 2026-04-02*
