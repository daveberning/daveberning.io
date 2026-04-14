import axe from 'axe-core'

/* Types
--------------------------------------------------------------------- */
export interface A11yViolation {
  id:          string
  impact:      string | undefined
  description: string
  nodes:       number
  message:     string
}

/* Helpers
--------------------------------------------------------------------- */
/**
 * Format an axe violation into a human-readable string for Vitest failure output.
 */
function formatViolation(violation: axe.Result): string {
  return `[${violation.impact ?? 'unknown'}] ${violation.id}: ${violation.description} (${violation.nodes.length} node${violation.nodes.length === 1 ? '' : 's'})`
}

/* Public API
--------------------------------------------------------------------- */
/**
 * Run axe-core against the given DOM container and return a list of WCAG violations.
 *
 * Intended for use in browser tests only (vitest-browser-vue / Playwright Chromium).
 * axe requires a real browser environment with layout — do not call from happy-dom unit tests.
 *
 * @example
 * const { container } = render(MyComponent)
 * const violations = await runAxe(container)
 * expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
 *
 * @param container - The root DOM element to scan. Typically the element returned by vitest-browser-vue's `render`.
 */
export async function runAxe(container: Element): Promise<A11yViolation[]> {
  const results = await axe.run(container, {
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  })

  if (results.violations.length === 0) return []

  return results.violations.map(violation => ({
    id:          violation.id,
    impact:      violation.impact ?? undefined,
    description: violation.description,
    nodes:       violation.nodes.length,
    message:     formatViolation(violation),
  }))
}
