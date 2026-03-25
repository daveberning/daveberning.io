# Accessibility Rules

## Standards

Target **WCAG 2.1 AA** compliance on all components and pages.

## Color & Contrast

- Text contrast ratio: minimum **4.5:1** (normal text), **3:1** (large text / UI components)
- Never convey information with color alone — pair with text, icons, or patterns
- Verify contrast for all interactive states: default, hover, focus, disabled

## Keyboard & Focus

- All interactive elements must be reachable and operable via keyboard
- Do not use `tabindex` values greater than `0`
- Visible focus styles are required — never `outline: none` without a custom replacement
- Logical tab order must match visual reading order

## Semantics & ARIA

- Use semantic HTML before reaching for ARIA: `<button>` not `<div role="button">`
- Every `<img>` needs a meaningful `alt` attribute — empty `alt=""` only for decorative images
- Form inputs need associated `<label>` elements or `aria-label`
- Icon-only buttons need `aria-label` describing the action
- Do not use ARIA to override native semantics when the native element already communicates the role

## Motion

- Respect `prefers-reduced-motion` — wrap animations/transitions in a media query or use Tailwind's `motion-safe:` / `motion-reduce:` variants
