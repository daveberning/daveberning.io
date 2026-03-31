# daveberning.io

I've hand-built every version of this site from scratch — writing components, styles, and logic manually from the ground up. This version is different. The goal here is to **rebuild the site entirely using [Claude Code](https://claude.ai/code)**, leveraging AI agents, reusable skills, and a proper design system to see how far autonomous tooling can take a real production project.

The experiment covers the full stack: component design, variant systems, content modeling, testing, CI/CD, and deployment. Nothing is off-limits. Instead of writing everything by hand, I'm defining the constraints — architecture rules, design tokens, accessibility standards, commit conventions — and letting agents do the heavy lifting within those guardrails.

## Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Framework | [Nuxt 4](https://nuxt.com) | Full-stack Vue with file-based routing, auto-imports, and static generation. `compatibilityVersion: 4` keeps the source under `app/` for a cleaner project root. |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) | CSS-first configuration via `@theme` directives — no `tailwind.config.js` needed. Design tokens live directly in the stylesheet, which makes the system easier to audit and reason about. |
| Content | [@nuxt/content](https://content.nuxt.com) | Markdown-driven pages with typed collection schemas. Portfolio pieces, blog posts, and endorsements are all content files, not hardcoded data. |
| Components | CVA + `cn()` | [class-variance-authority](https://cva.style) for variant management, `clsx` + `tailwind-merge` for class merging. Follows a shadcn-style directory structure so every component is self-contained and independently testable. |
| Forms | [vee-validate](https://vee-validate.logaretm.com) + [Yup](https://github.com/jquense/yup) | Declarative validation with schema-based rules. Keeps form logic out of components. |
| Icons | [@nuxt/icon](https://github.com/nuxt/icon) | Access to the full Iconify catalog without bundling unused icons. |
| Images | [@nuxt/image](https://image.nuxt.com) | Automatic optimization, lazy loading, and format conversion at build time. |
| Fonts | [@nuxt/fonts](https://fonts.nuxt.com) | Self-hosted Google Fonts with zero config. Space Grotesk for headings, DM Sans for body. |
| Linting | [oxlint](https://oxc.rs/docs/guide/usage/linter.html) | Significantly faster than ESLint with no config file required for sane defaults. |
| Type Checking | [vue-tsc](https://github.com/vuejs/language-tools) | Full TypeScript checking across `.vue` files. |
| Component Explorer | [Storybook](https://storybook.js.org) | Visual development and documentation for UI primitives. Stories live alongside component files. |
| Deployment | [Netlify](https://netlify.com) | Static site hosting with preview deploys per branch. |

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:3000`.

> Requires Node 22+.

## Commands

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run generate` | Static site generation |
| `npm run preview` | Preview production build |
| `npm run lint` | Lint with oxlint |
| `npm run lint:fix` | Lint and auto-fix |
| `npm run typecheck` | TypeScript check via vue-tsc |
| `npm run test` | Vitest in watch mode |
| `npm run test:coverage` | Vitest with v8 coverage (must reach 100%) |
| `npm run test:browser` | Browser tests across all three engines |
| `npm run test:browser:chromium` | Browser tests on Chromium only |
| `npm run test:browser:firefox` | Browser tests on Firefox only |
| `npm run test:browser:webkit` | Browser tests on WebKit only |
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run build-storybook` | Build Storybook to `public/storybook/` |

## Architecture

Source files live under `app/` (Nuxt 4 convention). Nuxt auto-imports components, composables, and utils — no manual import statements needed for local code.

### Why this structure?

The goal is to make the codebase legible to both humans and AI agents. Every component is self-contained: its variants, types, context, and exports all live in a single `index.ts` beside the `.vue` file. There is no hunting across the project to understand how a component works. An agent can read one directory and have the full picture.

This also makes testing straightforward. Each component directory is an independent unit that can be mounted, tested, and iterated on without touching anything else.

### Component structure

Every component — simple or compound — lives in its own directory with an `index.ts` barrel file:

```
app/components/ui/button/
├── Button.vue     # SFC — imports variants and types from index.ts
└── index.ts       # CVA variants, TypeScript types, component export

app/components/Header/
├── Header.vue            # Root — calls provideHeaderContext()
├── HeaderNavigation.vue  # Subcomponent — calls injectHeaderContext()
└── index.ts              # provide/inject context, variants, types, exports
```

**Primitives** live under `app/components/ui/<name>/`. **Compound components** (those with subcomponents that share state) live under `app/components/<Name>/`.

Variants are defined with [class-variance-authority](https://cva.style) in `index.ts` and driven by the `useTheme()` composable. Class merging uses `cn()` from `app/lib/utils.ts` (`clsx` + `tailwind-merge`). Compound components share state via `useCreateContext`, a thin wrapper around Vue's `provide`/`inject`.

### Design System & Theming

The design system is CSS-first. All tokens are defined with `@theme` directives in `app/assets/css/main.css`. There is no `tailwind.config.js`.

**Why?** Tailwind v4's CSS-first config keeps the token definitions close to where they are used, eliminates a separate config file, and lets the design system be read and modified without touching JavaScript.

Five switchable theme colors are supported: `teal` (default), `red`, `blue`, `green`, `purple`. Dark mode is toggled by adding the `.dark` class to `<html>`. Both are controlled by the `useTheme()` composable.

**Semantic tokens** — respond to light/dark mode automatically:

```
bg-background     bg-surface     bg-surface-raised
border-border     text-text      text-text-muted
bg-theme          bg-theme-dark  bg-theme-light  bg-theme-black
text-theme-fg
```

**Brand tokens** — static color values tied to each theme:

```
bg-brand-teal        bg-brand-teal-dark
bg-brand-red         bg-brand-red-dark
bg-brand-blue        bg-brand-blue-dark
bg-brand-green       bg-brand-green-dark
bg-brand-purple      bg-brand-purple-dark
text-brand-*-text
```

Components always use these tokens — never raw Tailwind color utilities like `bg-teal-500`. This keeps the color system consistent and makes theme switching work automatically.

### Content

Pages and data are driven by Markdown files in `content/`. Collection schemas are defined and typed in `content.config.ts`:

| Collection | Description |
|---|---|
| `siteInfo` | Global metadata, navigation links, social links |
| `content` | General pages |
| `works` | Portfolio pieces — title, role, year, technologies, URL |
| `writing` | Blog articles — title, tags, publishedAt, externalUrl, platform |
| `endorsements` | Endorsements — name, role, company |
| `about` | About page data — skills, education, favorites |

Keeping content in Markdown rather than hardcoded in components means the data can be updated without touching Vue files, and agents can add or modify content entries without risking regressions in component logic.

## Testing

Testing is strict by design. The 100% coverage requirement is not aspirational — it is enforced by the CI pipeline and will block deploys if not met. The reasoning: if an agent writes code, the tests are the primary mechanism for catching mistakes. Gaps in coverage mean gaps in confidence.

### Unit tests (Vitest + happy-dom)

Tests are co-located next to the file under test — `Button.test.ts` lives beside `Button.vue`. This keeps context local and makes it obvious when a file is missing tests.

```bash
npm run test           # watch mode during development
npm run test:coverage  # full coverage report (must reach 100%)
```

Coverage is enforced at **100%** across lines, functions, branches, and statements for `app/lib/` and `app/components/`.

### Browser tests (Vitest Browser Mode + Playwright)

Files matching `*.browser.test.ts` run in actual browser engines via Playwright — not a DOM simulation. This catches rendering bugs, layout issues, and browser-specific behavior that happy-dom cannot surface.

Tests run against three engines:

- Chromium
- Firefox
- WebKit (Safari)

```bash
npm run test:browser
```

Running against all three engines in CI catches cross-browser regressions early, before they reach production.

### Pre-commit hook

Husky runs a full check before every commit:

```
lint → typecheck → test
```

The commit is blocked if any step fails. This prevents broken code from entering the branch history and keeps CI green by catching issues locally first.

## CI/CD

GitHub Actions (`.github/workflows/ci.yml`) runs six jobs on every push. The build and deploy jobs only run after all quality gates pass — there is no way to deploy code that has failed linting, type checking, or tests.

| Job | What it does |
|---|---|
| `lint` | oxlint across the entire project |
| `typecheck` | vue-tsc full TypeScript validation |
| `test-coverage` | Vitest with v8 — enforces 100% coverage thresholds |
| `browser-tests` | Playwright matrix: chromium, firefox, webkit (parallel) |
| `build` | `nuxt generate` — runs only after all four jobs above pass |
| `deploy` | Netlify publish — runs only after a successful build |

The deploy job targets **staging** when pushing to `develop` and **production** when pushing to `main`. This means every branch gets validated the same way, and only fully-verified builds reach production.

## Deployment

The site generates as a static site and deploys to [Netlify](https://netlify.com).

```toml
# netlify.toml
[build]
  command   = "npm run build"
  publish   = ".output/public"
```

Static generation means no server runtime, no cold starts, and fast global delivery via Netlify's CDN. Deploys are triggered automatically via GitHub Actions — Netlify is only responsible for hosting, not the build pipeline.

## Claude Code & Agents

This project is built using [Claude Code](https://claude.ai/code) and a set of specialized agents defined in `.claude/CLAUDE.md`. Each agent has a specific role and is invoked at the appropriate stage of development:

| Agent | Role |
|---|---|
| `Plan` | Designs implementation strategy before non-trivial features or refactors |
| `Front-End Engineer` | Builds Vue components, composables, and utilities in `app/` |
| `QA Engineer` | Writes and runs Vitest unit, component, and browser tests |
| `UI/UX Designer` | Reviews accessibility, layout, and design system consistency |
| `SEO Copywriter` | Writes keyword-optimized copy, meta tags, Open Graph, and structured data (JSON-LD) |
| `Explore` | Fast codebase exploration — finds files and answers structural questions |

**Standard workflow for new features:**

```
Plan → Front-End Engineer → QA Engineer
```

**Standard workflow for new UI components:**

```
UI/UX Designer → Front-End Engineer → QA Engineer
```

Architecture rules, code style, accessibility standards, and git conventions are all codified in `.claude/rules/` and enforced as agent instructions. This makes the agent-generated output consistent and reviewable, regardless of which agent produced it.

## Git Conventions

Conventional commits with a scope:

```
<type>(<scope>): <short description>
```

**Types:** `feat`, `fix`, `refactor`, `style`, `test`, `docs`, `chore`

**Examples:**

```
feat(button): add ghost variant
fix(header): correct mobile nav z-index
test(button): add coverage for disabled state
```

Branch from `develop`. PRs target `develop`. `main` is production only.
