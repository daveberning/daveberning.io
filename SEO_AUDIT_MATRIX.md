# SEO Audit Matrix — Quick Reference

**daveberning.io** | April 2, 2026

---

## ISSUE MATRIX (By File + Priority)

### app/pages/index.vue (Homepage)

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| H1 doesn't include "Engineer" keyword | CRITICAL | High | Add H2 after name with role | Title/H1 alignment | 10 min |
| OG image fallback (teal) | CRITICAL | High | Use theme-aware image path | Social sharing | 5 min |
| Page title mismatch | HIGH | Medium | Title is dynamic, good—verify | — | 0 min |
| Missing twitter:creator | CRITICAL | Medium | Add to layout (global) | Twitter attribution | 5 min |

---

### app/pages/about.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Title too generic ("About") | CRITICAL | High | "About Dave Berning, Senior FE Engineer" | SERP CTR | 5 min |
| OG image fallback | CRITICAL | High | Use theme image or custom | Social | 5 min |
| Meta description OK | ✓ | — | No change | — | — |

---

### app/pages/contact.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Title too generic ("Contact") | CRITICAL | High | "Contact Dave Berning for FE Projects" | SERP CTR | 5 min |
| OG image fallback | CRITICAL | High | Use theme image | Social | 5 min |
| Meta keywords missing | HIGH | Medium | Add 3–5 keywords | Bing | 2 min |

---

### app/pages/resume.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Portrait alt text empty | CRITICAL | High | Add "Dave Berning, Senior FE Engineer" | Accessibility | 2 min |
| OG image fallback | CRITICAL | High | Use theme image | Social | 5 min |
| Resume URL fragmented | HIGH | Medium | Standardize path (/resume vs PDF) | URL canonicalization | 10 min |
| Meta keywords missing | HIGH | Medium | Add 3–5 keywords | Bing | 2 min |

---

### app/pages/endorsements.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Title too generic | CRITICAL | High | "Endorsements – Client Testimonials" | SERP CTR | 5 min |
| OG image fallback | CRITICAL | High | Use theme image | Social | 5 min |
| Schema too generic (needs Review) | HIGH | High | Wrap endorsements in Review schema | Rich results | 20 min |
| og:type should be "profile" | MEDIUM | Low | Change ogType to "profile" | Social | 2 min |
| Meta keywords missing | HIGH | Medium | Add 3–5 keywords | Bing | 2 min |

---

### app/pages/work/index.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Title too generic ("Work") | CRITICAL | High | "Portfolio – Vue, Nuxt & TypeScript" | SERP CTR | 5 min |
| OG image fallback | CRITICAL | High | Use theme image | Social | 5 min |
| Meta keywords missing | HIGH | Medium | Add 3–5 keywords | Bing | 2 min |
| Schema ItemList needs numberOfItems | HIGH | Low | Add count to schema | Completeness | 2 min |

---

### app/pages/work/[slug].vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Missing canonical | CRITICAL | High | Add canonical to useSeoMeta() | Duplicate prevention | 5 min |
| OG image fallback | CRITICAL | High | Use theme or project image | Social | 5 min |
| Schema too generic (CreativeWork) | HIGH | High | Use SoftwareApplication or Thing | Rich results | 20 min |
| Meta keywords missing | HIGH | Medium | Extract from work.technologies | Bing | 2 min |

---

### app/pages/writing/index.vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Title too generic ("Writing") | CRITICAL | High | "Articles on Vue, Nuxt, TypeScript" | SERP CTR | 5 min |
| OG image fallback | CRITICAL | High | Use theme image | Social | 5 min |
| Schema missing ItemList structure | HIGH | Medium | Add itemListElement array to schema | Crawl efficiency | 10 min |
| Schema missing reading time | MEDIUM | Low | Add duration property to ListItem | Completeness | 5 min |
| Meta keywords missing | HIGH | Medium | Add 3–5 keywords | Bing | 2 min |
| Pagination needed (very long page) | HIGH | Medium | Implement pagination (10 items/page) | Crawl efficiency | 30 min |

---

### app/pages/writing/[slug].vue

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Article author schema minimal | HIGH | Medium | Add email, sameAs array | E-E-A-T | 10 min |
| Author name hardcoded | MEDIUM | Low | Pull from useSiteInfo() | Maintainability | 5 min |
| Meta keywords missing | HIGH | Medium | Extract from post.tags | Bing | 2 min |

---

### app/pages/[slug].vue (Catch-all)

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| Missing canonical | CRITICAL | High | Add canonical to useSeoMeta() | Duplicate prevention | 5 min |
| Meta description fallback to title | CRITICAL | High | Ensure content frontmatter has description | SERP preview | 10 min |
| OG image fallback | CRITICAL | High | Use theme image or content image | Social | 5 min |
| Meta keywords missing | HIGH | Medium | Derive from frontmatter or content | Bing | 2 min |

---

### app/layouts/default.vue (Global)

| Issue | Type | Severity | Fix | Impact | Time |
|-------|------|----------|-----|--------|------|
| twitter:creator missing | CRITICAL | High | Add to useSeoMeta() | Twitter attribution | 5 min |
| og:locale missing | HIGH | Medium | Add ogLocale: 'en_US' | Platform locale detection | 2 min |
| Person schema missing image | HIGH | Medium | Add image URL to schema | Knowledge panel | 5 min |
| Person schema missing contactPoint | HIGH | Low | Add contact info to schema | Contact signal | 5 min |
| Canonical generation good | ✓ | — | No change (auto via route.path) | — | — |

---

## PRIORITY MATRIX (By Impact + Effort)

```
IMPACT
  ▲
  │  QUICK WINS                    │  STRATEGIC
  │  (Do Now)                      │  (Plan Sprint)
  │  ├─ twitter:creator           │  ├─ OG images
  │  ├─ Page titles               │  ├─ Schema upgrades
  │  ├─ H1 fix                     │  ├─ Author/E-E-A-T
  │  ├─ Canonicals                │  └─ Content meta
  │  └─ Alt text                  │
  │                                │
  ├────────────────────────────────┼─────────► EFFORT
  │  POLISHING                     │  MAJOR
  │  (Later)                       │  REFACTORS
  │  ├─ OG optimization            │  ├─ Pagination
  │  ├─ Breadcrumbs                │  ├─ Dynamic OG gen
  │  ├─ Reading time schema        │  └─ Resume restructure
  │  └─ FAQ schema                 │
  └────────────────────────────────┘
```

---

## PAGE HEALTH SCORECARD

| Page | Current Score | Target Score | Gap | Primary Issues |
|------|---------------|--------------|-----|-----------------|
| `/` | 6/10 | 8/10 | –2 | H1, OG image, twitter:creator |
| `/about` | 6/10 | 8/10 | –2 | Title, OG image, keywords |
| `/contact` | 6/10 | 8/10 | –2 | Title, OG image, keywords |
| `/resume` | 7/10 | 9/10 | –2 | Alt text, OG image, URL standardization |
| `/endorsements` | 5/10 | 8/10 | –3 | Title, schema (Review), keywords |
| `/work` | 6/10 | 8/10 | –2 | Title, OG image, keywords |
| `/work/[slug]` | 5/10 | 8/10 | –3 | Canonical, schema, OG image |
| `/writing` | 5/10 | 8/10 | –3 | Title, schema (ItemList), pagination |
| `/writing/[slug]` | 7/10 | 9/10 | –2 | Author schema, keywords |
| `/[slug]` | 4/10 | 8/10 | –4 | Canonical, description, OG image |
| **AVERAGE** | **5.7/10** | **8/10** | **–2.3** | Multi-page issues |

---

## CRITICAL PATH (Fastest to 8/10 Average)

**Order by effort vs. impact:**

1. **twitter:creator** — 5 min, affects all pages
2. **Page titles** — 15 min, affects 6+ pages
3. **Homepage H1** — 10 min, flagship page
4. **Canonicals** — 10 min, prevents duplicates
5. **Alt text** — 2 min, 1 image
6. **Meta keywords** — 15 min, Bing signal across all pages
7. **og:locale** — 2 min, all pages
8. **OG images** — 30–60 min, social impact

**Subtotal: ~90 minutes → ~1.5 hour boost to average score +1.5–2 points**

Then tackle High Priority items (schema upgrades, etc.) in parallel.

---

## VERIFICATION CHECKLIST

After each fix, validate with:

- [ ] **Google Rich Results Test** — https://search.google.com/test/rich-results
- [ ] **Facebook Debugger** — https://developers.facebook.com/tools/debug/
- [ ] **Twitter Card Validator** — https://cards-dev.twitter.com/validator
- [ ] **Lighthouse SEO Audit** — `npm run build && npm run preview` (then audit)
- [ ] **Google Search Console** — Submit updated sitemap

---

## FILE MODIFICATION SUMMARY

```
app/layouts/
├─ default.vue              (Add twitter:creator, og:locale, image to Person schema)
└─ sidebar.vue              (Optional: add breadcrumbs)

app/pages/
├─ index.vue               (Add H2 with role, use theme OG image)
├─ about.vue               (Update title, add keywords)
├─ contact.vue             (Update title, add keywords)
├─ resume.vue              (Fix alt text, add keywords, standardize URL)
├─ endorsements.vue        (Update title, add keywords, upgrade schema)
├─ work/
│  ├─ index.vue            (Update title, add keywords)
│  └─ [slug].vue           (Add canonical, upgrade schema, add keywords)
├─ writing/
│  ├─ index.vue            (Update title, add keywords, fix schema + pagination)
│  └─ [slug].vue           (Expand author schema, add keywords)
└─ [slug].vue              (Add canonical, ensure meta desc in content, add keywords)

content/
└─ *.md files              (Ensure all have description frontmatter)
```

---

## EFFORT ESTIMATE

| Phase | Tasks | Days | Owner |
|-------|-------|------|-------|
| **Phase 1** | Critical fixes (7 items) | 1 day | Front-End Eng |
| **Phase 2** | High priority (8 items) | 3–5 days | Front-End Eng + SEO |
| **Phase 3** | Medium priority (8 items) | 1–2 weeks | SEO + Design (OG images) |
| **Validation** | Testing + GSC monitoring | 1 week | QA + SEO |
| **TOTAL** | 23 issues → 8/10 avg | 2–3 weeks | Cross-functional |

---

*Matrix generated: 2026-04-02*  
*For detailed fixes, see: SEO_AUDIT_ACTIONABLE_CHECKLIST.md*
