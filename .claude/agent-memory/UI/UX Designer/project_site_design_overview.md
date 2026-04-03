---
name: Site Design Overview
description: High-level design audit of daveberning.io — color system, typography, layout patterns, and polish opportunities identified during initial review
type: project
---

daveberning.io is a Nuxt 4 portfolio site for a senior front-end software engineer. The site uses a runtime-switchable theme system (5 brand colors: teal, red, blue, green, purple) with light/dark mode. Teal is the default.

**Typography:** DM Sans (body) + Space Grotesk (headings). Both are strong choices. Heading scale is defined in UiText CVA variants.

**Layout patterns:**
- Homepage: split-panel layout (portrait left, content right) — full-height `h-dvh` with `flex-col-reverse lg:flex-row`
- Most other pages: sidebar layout with 12-col grid (8 main + 4 aside on md+)
- CtaBar is a full-width themed band at the bottom of every sidebar-layout page

**Key design strengths:**
- Color system is well-architected — oklch relative color shifts for light/dark derivation is sophisticated
- Component structure is clean and consistent (CVA everywhere)
- Semantic tokens respond to light/dark automatically
- motion-safe: used on MobileNav transitions — good accessibility hygiene
- Portrait images are per-theme (dave-teal.png, dave-red.png, etc.) — nice personal touch
- ThemePicker interaction (scale on hover, ring focus) is polished

**Key design weaknesses identified in audit:**
- Header has no backdrop-blur/transparency — a fully saturated theme-colored header can feel heavy
- CtaBar mode variants are identical (light and dark both use `bg-theme`) — dead code
- Footer dark mode uses `bg-theme-dark/5` which is nearly invisible — likely too subtle
- Homepage h1 uses viewport-unit font sizes (lg:text-[4.5vw] xl:text-[6vw] 2xl:text-[7vw]) — these can be jarring at edge breakpoints
- UiText h1/h2 variants have no line-height or letter-spacing — headings feel compressed
- PortfolioPiece has no hover state — cards feel static
- Writing page article cards have hover (`hover:border-theme`) but PortfolioPiece cards do not — inconsistency
- Endorsement cards use `endorsementAttributionVariants` with `flex-col` but should be `flex-row` for photo + name side by side
- No page transitions or route animations exist
- No scroll-reveal or entrance animations anywhere
- The site has no subtle texture or background pattern — surfaces feel flat (though the plaid portrait is a nice thematic hook)
- SocialLinks component hardcodes `text-white` and `border-white/40` — only works correctly on dark/themed backgrounds; would be broken on light surface backgrounds

**Why this matters:** The site targets potential employers reviewing a senior engineer's personal brand. Polish signals craft and attention to detail. The architecture is excellent; the visual layer needs a level-up.
