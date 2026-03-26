---
name: ReadOriginal Component Design Decisions
description: Design rationale, structure, props, and accessibility notes for the ReadOriginal callout component on blog post pages
type: project
---

The ReadOriginal component is a standalone page-level component (not a UI primitive) placed after article body content on blog post pages where the post is a summary of an external article.

Key decisions:

- Classified as a standalone component at `app/components/ReadOriginal/` rather than a UI primitive because it is semantically specific to the "this is an excerpt" use case and couples `href`, `platform`, and `label` props in a way that is not generically reusable.
- Uses an accent-stripe-left layout (4px absolutely positioned stripe using `bg-theme`) to signal brand identity without repainting the full card background — consistent with the WorkItem accent-stripe pattern.
- Card background uses `bg-surface` (one step up from `bg-background`) plus a `border-border` border so it sits visually distinct from the surrounding prose without introducing a strong color contrast that would fight the article body.
- The CTA link renders as a native `<a>` with `target="_blank" rel="noopener noreferrer"` and uses the themed `text-theme` color with `hover:text-theme-dark` for the interactive state.
- `lucide:arrow-up-right` icon sits inline-right of the CTA label text, sized at 16px (1rem), vertically centered via `inline-flex items-center gap-1`.
- Focus ring uses `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-theme` — consistent with the Card primitive focus pattern.
- `platform` prop (e.g. "DigitalOcean") is optional — when provided it renders as supporting copy above the CTA ("Originally published on {platform}") in `text-text-muted text-sm`.
- `label` prop defaults to "Read the full article" — overridable for custom CTA copy.
- No color CVA variant needed — the accent stripe already uses `bg-theme` which is reactive to `useTheme()`.

**Why:** The component needs to catch the reader's eye after a wall of prose. A full-color card would be visually aggressive; an accent stripe on a neutral surface strikes the right balance between "noticeable" and "not jarring." Keeping it slim (compact vertical padding) ensures it doesn't read as a major content block — it's a signpost, not a feature.

**How to apply:** Future components that serve as "exit prompts" or contextual callouts after content sections should follow this accent-stripe-on-surface pattern rather than introducing new full-background color treatments.
