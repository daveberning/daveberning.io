---
name: WorkItem Component Design Decisions
description: Design rationale and CVA structure for the WorkItem compound component on the work page
type: project
---

The WorkItem component was designed as a dedicated compound component (not extending the existing Card primitive) because it introduces the `accent` dimension and uses Reference-style padding/gap layout rather than Card's sectioned header/content/footer with dividers.

Key decisions:

- `color` prop does NOT repaint the card background — it only drives the accent stripe. Full-color card backgrounds were rejected because they compromise text contrast for the body and tech badges across all five brand colors.
- `accent` stripe is implemented as an absolutely positioned `<div>` inside the root (not `border-t-4`/`border-l-4`), so the structural border stays clean and `tailwind-merge` conflicts are avoided.
- `left` accent shifts inner padding to `pl-10 sm:pl-12` via a context-driven `workItemInnerVariants` — this is handled inside `WorkItem.vue`, not exposed to consumers.
- Accent stripe uses darker brand token in light mode (`bg-brand-{color}-dark`) and lighter token in dark mode (`bg-brand-{color}`) for consistent perceived contrast against each surface.
- Root defaults `as="article"` — semantically correct for a self-contained portfolio item.
- `WorkItemBody` uses `flex-1` to push the footer to the bottom in equal-height grid rows.
- `WorkItemTech` renders as `<ul>`/`<li>` for screen reader enumeration.
- Tech badges are intentionally neutral (`border-border`, `text-text-muted`, optionally `bg-surface-raised`) — they should not compete with the accent color.
- "View Project" link should receive `aria-label="View project: {title}"` from the page, not hardcoded in the component.

**Why:** Full-color cards (like the Card primitive uses) work for short, high-contrast content. For portfolio items with body text + tech lists, they create WCAG contrast problems. The accent-only approach is more refined and scales across all five brand colors without accessibility trade-offs.

**How to apply:** When designing future card-like components that contain mixed content (headings + body text + tags), prefer accent-stripe color expression over full-background repaints.
