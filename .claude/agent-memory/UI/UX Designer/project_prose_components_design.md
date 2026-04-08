---
name: ProseBlockquote and ProseImg Design Decisions
description: CVA structure, token choices, alignment variants, and caption treatment for ProseBlockquote and ProseImg components on blog post pages
type: project
---

## ProseBlockquote

- Outer wrapper: `relative pl-6 pr-5 py-5 my-6 rounded-r-lg bg-surface border-l-4 border-theme italic text-text`
- Left border is `border-l-4` using `border-theme` (maps to `--theme-color`, switches with active brand)
- Background is `bg-surface` (not `bg-surface-raised`) — keeps it subtle, not boxed-in
- No CVA variants needed — blockquote has no user-configurable variants, all styling is static via semantic tokens
- Attribution footer: `not-italic text-sm text-text-muted mt-3 block` — pulls out of italic, downsized, muted
- Cite inside footer: rendered inline, no additional styling beyond footer

## ProseImg

- CVA variant key: `align` with values `center` (default), `full`, `left`, `right`
- Image element always gets: `rounded-lg border border-border` for lift treatment (no shadow — consistent with card/surface treatment in this codebase)
- Caption (`alt` text) rendered as `<figcaption>`: `text-xs text-text-muted text-center mt-2`
- Outer wrapper is `<figure>` element for semantic correctness and caption association

### Alignment variant classes

- `center`: `mx-auto block max-w-2xl w-full` on figure, `w-full` on img
- `full`: `w-full` on figure, `w-full` on img
- `left`: `float-left mr-6 mb-4 max-w-xs` on figure, `w-full` on img — clear on mobile (sm: prefix kept)
- `right`: `float-right ml-6 mb-4 max-w-xs` on figure, `w-full` on img

### Float clearing
- Float variants (`left`, `right`) require a clearfix on the parent prose container — `prose` class from Tailwind Typography handles this, but if prose is stripped, add `overflow-hidden` or `flow-root` to parent

**Why:** Consistent with how `ReadOriginal` uses `border-theme` for accent color; avoids hardcoded brand colors. Semantic tokens ensure light/dark compatibility without per-mode variants.

**How to apply:** When reviewing or extending these components, keep the accent stripe pattern consistent with `ReadOriginal` (`w-1 bg-theme` absolute stripe vs `border-l-4 border-theme` on blockquote — blockquote uses border-l because it interacts with padding-left and text flow more naturally).
