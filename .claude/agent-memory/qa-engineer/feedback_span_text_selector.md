---
name: Text span selector ambiguity when Icon is stubbed as <span>
description: When Icon is stubbed as a <span>, wrapper.find('span') finds the icon stub first, not the text label — use wrapper.text() for text content assertions
type: feedback
---

When `<Icon>` is stubbed as `<span :data-icon="name" />`, `wrapper.find('span')` finds the icon stub element (which renders first in the DOM) rather than the text label `<span>`. This causes text assertions like `expect(wrapper.find('span').text()).toBe('Copy')` to fail with empty string.

The fix:
- Use `wrapper.text()` to assert on any text content (e.g., `expect(wrapper.text()).toContain('Copy')`)
- Use `wrapper.find('[data-icon="lucide:copy"]')` to assert on the icon stub specifically

**Why:** The `<Icon>` stub renders as a `<span>` which appears before the text `<span>` in the DOM, so `find('span')` is ambiguous.

**How to apply:** Whenever a component has both an `<Icon>` (stubbed as span) and a text `<span>`, avoid `find('span')` for text assertions. Prefer `wrapper.text()` or a more specific CSS selector.
