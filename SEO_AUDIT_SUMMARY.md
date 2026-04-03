# SEO Audit Summary — daveberning.io

**Date**: April 2, 2026  
**Site**: Nuxt 4 Portfolio  
**Base URL**: https://daveberning.io  

---

## OVERVIEW

Your portfolio site has a **solid technical SEO foundation** with:
- ✓ Nuxt 4 auto-generated sitemap & robots.txt
- ✓ useSeoMeta() + useHead() pattern for meta tags & structured data
- ✓ JSON-LD schema on most pages (Person, WebSite, Article, etc.)
- ✓ Canonical URL generation in layout
- ✓ OG tags and Twitter Card tags on all pages

**However**, there are **23 issues across 3 priority tiers** that impact:
- SERP click-through rates (CTR)
- Social media sharing preview quality
- Author/E-E-A-T signals
- Content discoverability
- Accessibility compliance

---

## PRIORITY BREAKDOWN

| Tier | Count | Impact | Timeline |
|------|-------|--------|----------|
| **Critical** | 7 | High | 1–2 days |
| **High** | 8 | Medium-High | 3–5 days |
| **Medium** | 8 | Low-Medium | Ongoing |
| **TOTAL** | **23** | — | — |

---

## CRITICAL ISSUES (7)

1. **Homepage H1 mismatch with title** — H1 doesn't include "Front-End Software Engineer" keyword
2. **OG images always fallback to teal** — All pages share same OG image; no visual differentiation
3. **Missing canonical tags on dynamic pages** — work/[slug], writing/[slug], [slug] pages at risk of duplicate indexing
4. **Missing meta descriptions on catch-all pages** — [slug].vue falls back to title instead of unique description
5. **Page titles too generic** — "About | Dave", "Contact | Dave" instead of keyword-rich titles
6. **twitter:creator tag missing** — No author attribution on Twitter
7. **Alt text missing on portrait** — resume.vue portrait image has empty alt

**What to do**: Fix these before launch. They directly impact search visibility and social sharing.

---

## HIGH PRIORITY ISSUES (8)

8. Article schema needs author expansion (email, sameAs)
9. Work project pages need specific schema (SoftwareApplication, not generic CreativeWork)
10. Homepage Person schema missing image & contact point
11. Resume URL not standardized across site
12. Meta keywords missing (Bing signal)
13. og:locale not set (social platform locale detection)
14. Writing index page needs pagination/ItemList schema refinement
15. Endorsements page should use Review schema instead of generic CollectionPage

**What to do**: Complete within 3–5 days. These enhance E-E-A-T signals and rich result potential.

---

## MEDIUM PRIORITY ISSUES (8)

16. OG image file size optimization
17. BreadcrumbList schema (not implemented)
18. FAQ schema (if applicable)
19. Reading time not in blog schema
20. Dynamic OG image generation (nice to have)
21. rel="author" links (minor signal)
22. data-nosnippet control (only if needed)
23. Core Web Vitals monitoring (performance)

**What to do**: These are polish items. Implement as time allows.

---

## CURRENT PAGE AUDIT

### Status by Page

| Page | Title | Meta Desc | Canonical | OG Image | Schema | Score |
|------|-------|-----------|-----------|----------|--------|-------|
| `/` (Home) | ✓ Dynamic | ✓ | ⚠ Layout only | ✗ Fallback | ✓ WebSite | 6/10 |
| `/about` | ⚠ Generic | ✓ | ✓ | ✗ Fallback | ✓ AboutPage | 6/10 |
| `/contact` | ⚠ Generic | ✓ | ✓ | ✗ Fallback | ✓ ContactPage | 6/10 |
| `/resume` | ✓ | ✓ | ✓ | ✗ Fallback | ✓ ProfilePage | 7/10 |
| `/endorsements` | ⚠ Generic | ✓ | ✓ | ✗ Fallback | ⚠ CollectionPage (needs Review) | 5/10 |
| `/work` | ⚠ Generic | ✓ | ✓ | ✗ Fallback | ✓ CollectionPage | 6/10 |
| `/work/[slug]` | ✓ Dynamic | ✓ | ✗ | ✗ Fallback | ⚠ CreativeWork (should be specific) | 5/10 |
| `/writing` | ⚠ Generic | ✓ | ✓ | ✗ Fallback | ⚠ CollectionPage (ItemList structure) | 5/10 |
| `/writing/[slug]` | ✓ Dynamic | ✓ | ✓ | ✗ Fallback | ✓ Article | 7/10 |
| `/[slug]` (catch-all) | ✓ Dynamic | ⚠ Fallback | ✗ | ✗ Fallback | ✓ WebPage | 4/10 |

**Average Score**: 5.7/10 ✗ (Target: 8+/10)

---

## QUICK WINS (Top 5)

**Do these first for immediate SERP/social impact:**

1. **Add twitter:creator tag** (5 min)
   - File: `app/layouts/default.vue`
   - Impact: Twitter attribution, analytics
   
2. **Update page titles with keywords** (15 min)
   - Files: All `app/pages/*.vue`
   - Impact: SERP CTR, relevance signals
   
3. **Fix homepage H1** (10 min)
   - File: `app/pages/index.vue`
   - Impact: Title/content alignment
   
4. **Add canonical URLs to dynamic pages** (10 min)
   - Files: `work/[slug].vue`, `[slug].vue`
   - Impact: Duplicate content prevention
   
5. **Fix alt text on resume portrait** (2 min)
   - File: `app/pages/resume.vue`
   - Impact: Accessibility, image SEO

**Total time: ~40 minutes for 5 critical fixes**

---

## STRATEGIC RECOMMENDATIONS

### For SEO/Organic Search
1. **Implement unique OG images** — Portfolio projects need visual differentiation on social
2. **Enhance Article schema** — Build author credibility E-E-A-T signals
3. **Standardize resume URL** — Centralize hiring/CV path
4. **Add meta keywords** — Bing support, completeness

### For Social/Discovery
1. **Create project-specific OG images** — LinkedIn/Twitter/Slack previews critical for portfolio promotion
2. **Add twitter:creator** — Own your content on Twitter
3. **Optimize og:locale** — Platform locale detection

### For User Experience
1. **Add BreadcrumbList** — Improves SERP appearance + site navigation clarity
2. **Implement pagination on Writing** — Very long page; crawlers see all content as equal
3. **Consider FAQ schema** — If hiring inquiries are repetitive

### For Authority (E-E-A-T)
1. **Expand author schema** — Links to LinkedIn, GitHub, social profiles
2. **Add endorsement Review schema** — Testimonials as trust signals
3. **Standardize Person markup** — Consistent across all pages

---

## IMPLEMENTATION PATH

### Phase 1: Critical Fixes (Do First)
- [ ] Add twitter:creator
- [ ] Update page titles
- [ ] Fix H1 on homepage
- [ ] Add canonical URLs
- [ ] Fix alt text
- **Effort**: ~1 day  
- **Impact**: High (SERP + social)

### Phase 2: High Priority (Next Sprint)
- [ ] Create unique OG images
- [ ] Expand article schema
- [ ] Upgrade work schema
- [ ] Enhance homepage schema
- [ ] Add meta keywords
- [ ] Set og:locale
- [ ] Fix writing/endorsements schema
- **Effort**: ~3–5 days  
- **Impact**: Medium-High (rich results, E-E-A-T)

### Phase 3: Medium Priority (Ongoing)
- [ ] Optimize OG images (WebP, compression)
- [ ] Add breadcrumbs
- [ ] Dynamic OG generation
- [ ] FAQ schema
- [ ] Core Web Vitals monitoring
- **Effort**: ~1–2 weeks  
- **Impact**: Low-Medium (polish)

---

## KEY METRICS TO TRACK

After implementation, monitor:

1. **Google Search Console**
   - Pages indexed (target: all pages)
   - Rich result coverage (goal: 100% where applicable)
   - Click-through rate on SERP (should increase with title/meta fixes)

2. **Social Sharing**
   - LinkedIn, Twitter, Slack preview rendering
   - CTR from social platforms (track via UTM params)

3. **Lighthouse SEO**
   - Target: 90+ after fixes
   - Currently: Unknown (run audit)

4. **Structured Data**
   - Google Rich Results Test — 0 errors
   - Schema.org validator — all schemas valid

---

## REFERENCE

### Files Referenced
- Audit Details: `SEO_AUDIT_ACTIONABLE_CHECKLIST.md` (this repo)
- Memory/Reference: `.claude/agent-memory/seo-copywriter/`
- Config: `nuxt.config.ts`
- Layouts: `app/layouts/default.vue`, `sidebar.vue`
- Pages: `app/pages/*.vue`

### External Tools
- [Google Search Console](https://search.google.com/search-console)
- [Google Structured Data Tester](https://search.google.com/test/rich-results)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## NEXT STEPS

1. **Review this audit** with team/stakeholders
2. **Prioritize**: Which critical fixes to tackle first?
3. **Assign**: Frontend engineer to implement Phases 1 & 2
4. **QA**: Validate fixes with tools above
5. **Monitor**: Track metrics in GSC and analytics

---

*SEO Audit conducted by: SEO Copywriter Agent*  
*Report generated: 2026-04-02*  
*Next review: After Phase 2 implementation*
