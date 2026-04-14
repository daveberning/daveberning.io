---
name: Playwright e2e a11y setup
description: Page-level WCAG 2.1 AA axe-core scans via @playwright/test — config location, spec pattern, writing slug used, webServer setup
type: project
---

Page-level WCAG 2.1 AA accessibility tests are implemented as a Playwright e2e suite, separate from the vitest-browser component-level a11y tests.

**Why:** Component-level axe scans (`test:a11y`) only cover mounted components in isolation. The Playwright suite hits real rendered pages served by `nuxt preview` and catches document-level violations (landmark structure, heading hierarchy, page `<title>`, etc.) that component tests cannot.

**How to apply:** When a new page is added to `app/pages/`, add a corresponding entry to the `pages` array in `test/a11y.spec.ts`. When a writing or work slug is removed or renamed, update the spec accordingly.

## Key details

- Config: `/playwright.config.ts` — uses `@playwright/test`, Chromium only, `baseURL: http://localhost:3000`
- Spec: `test/a11y.spec.ts` — matches pattern `**/*.a11y.spec.ts`
- Runner: `npm run test:e2e` (calls `playwright test`)
- Requires: `npm run generate` must have been run first; tests serve `.output/public` via `npm run preview`
- `reuseExistingServer: !process.env.CI` — local runs reuse a running preview server; CI always starts fresh
- Tags scanned: `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`
- Violation format: `[impact] id: description` via `fmt()` helper passed as the `expect` message
- Writing slug in use: `i-rebuilt-my-portfolio-with-claude-code-in-two-weeks` (verified present in `.output/public/writing/`)
- Work slug in use: `cti` (verified present in `.output/public/work/`)
- `precommit:check` now includes `npm run test:e2e` at the end

## Pages covered (9 total)

- `/` — home
- `/about`
- `/contact`
- `/endorsements`
- `/resume`
- `/work`
- `/work/cti`
- `/writing`
- `/writing/i-rebuilt-my-portfolio-with-claude-code-in-two-weeks`

## Packages added

- `@axe-core/playwright` ^4.11.1
- `@playwright/test` ^1.59.1
