import AxeBuilder from '@axe-core/playwright'
import { test, expect } from '@playwright/test'

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] as const

const pages = [
  { name: 'home', path: '/' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
  { name: 'endorsements', path: '/endorsements' },
  { name: 'resume', path: '/resume' },
  { name: 'work index', path: '/work' },
  { name: 'work article — cti', path: '/work/cti' },
  { name: 'writing index', path: '/writing' },
  { name: 'writing article — i-rebuilt-my-portfolio-with-claude-code-in-two-weeks', path: '/writing/i-rebuilt-my-portfolio-with-claude-code-in-two-weeks' },
] as const

for (const { name, path } of pages) {
  test(`${name} (${path}) has no WCAG 2.1 AA violations`, async ({ page }) => {
    await page.goto(path)

    const results = await new AxeBuilder({ page })
      .withTags([...wcagTags])
      .analyze()

    if (results.violations.length > 0) {
      console.log(`\n  ${results.violations.length} violation(s) on ${path}:`)
      for (const v of results.violations) {
        console.log(`\n  [${v.impact}] ${v.id}`)
        console.log(`  ${v.description}`)
        console.log(`  ${v.helpUrl}`)
        for (const node of v.nodes) {
          console.log(`\n    element: ${node.target.join(', ')}`)
          console.log(`    html:    ${node.html.slice(0, 120)}`)
          if (node.failureSummary) {
            console.log(`    reason:  ${node.failureSummary.replace(/\n/g, '\n             ')}`)
          }
        }
      }
    }

    expect(results.violations).toEqual([])
  })
}
