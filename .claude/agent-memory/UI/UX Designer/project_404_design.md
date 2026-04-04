---
name: 404 Error Page Design Decisions
description: Layout, hierarchy, copy, and component choices for the error.vue 404 page — fullscreen centered layout inside the sidebar Nuxt layout
type: project
---

The 404 page uses `NuxtLayout name="sidebar"` with no `#aside` slot — the main column stretches full-width (`col-span-12`). Content is vertically centered within a flex column using `min-h-[60vh]` on the main area.

Visual hierarchy: large themed status code number (error.statusCode) rendered as a decorative display element using a custom class (not UiText h1 — it is too large for the type scale), followed by a UiText h2 heading, a UiText p body, and a UiButton solid CTA.

The "404" number uses `text-[clamp(8rem,20vw,18rem)]` with `text-theme` color, `font-black`, `leading-none`, `font-space-grotesk` — purely decorative/visual weight, not the page's accessible heading.

The accessible h1 ("Page Not Found" or equivalent) is rendered with `UiText as="h2"` visually but is semantically the h1 — use `UiText as="h1"` with the h2 visual class applied as a custom override to avoid oversizing.

Copy direction: brief, personal, slightly self-aware — fits a developer portfolio. Suggested:
- Kicker: "404"
- Heading: "Nothing to see here."
- Body: "That page doesn't exist — or maybe it never did. Either way, let's get you somewhere useful."
- CTA: "Go Home"

The "Go Home" button calls `clearError({ redirect: '/' })` — rendered as a UiButton solid, theme color, large size.

**Why:** The sidebar layout is already the canonical page wrapper across the site. Using it here keeps the header, footer, CTA bar, and mobile nav consistent — the error page feels like part of the site, not a dead end.

**How to apply:** When implementing error.vue, always wrap in `NuxtLayout name="sidebar"` without an aside slot. The large display number is a styling choice, not a semantic heading — keep the actual h1 accessible and appropriately sized.
