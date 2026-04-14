import { afterEach, describe, expect, it } from 'vitest'
import { defineComponent, h } from 'vue'
import { render } from 'vitest-browser-vue'
import { provideTheme } from '~/composables/useTheme'
import { runAxe } from '~/lib/a11y'

// Components under test
import Button from '~/components/ui/button'
import Text from '~/components/ui/text'
import Card, { CardContent } from '~/components/ui/card'
import Blockquote from '~/components/ui/blockquote'
import Aside, { AsideTitle, AsideSubtitle, AsideSection, AsideList } from '~/components/ui/aside'

/* Harness
--------------------------------------------------------------------- */
/**
 * Wraps any child component with the theme provider so that components
 * calling useTheme() / useThemeMode() find their injection context.
 * global.components registers auto-imported Nuxt primitives that are
 * referenced by name (UiText, UiCardContent) inside component templates.
 */
function renderWithTheme(component: ReturnType<typeof defineComponent>, options: Record<string, unknown> = {}) {
  const Harness = defineComponent({
    setup() {
      provideTheme()
      return () => h(component, options)
    },
  })

  return render(Harness, {
    global: {
      components: {
        UiText: Text,
        UiCardContent: CardContent,
      },
    },
  })
}

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('dark')
})

/* Button
--------------------------------------------------------------------- */
describe('Button a11y', () => {
  it('solid variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Button, { variant: 'solid', color: 'teal' }, () => 'Click me')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('outline variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Button, { variant: 'outline', color: 'teal' }, () => 'Click me')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('text variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Button, { variant: 'text', color: 'teal' }, () => 'Click me')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('white solid variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Button, { variant: 'solid', color: 'white' }, () => 'Click me')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })
})

/* Text
--------------------------------------------------------------------- */
describe('Text a11y', () => {
  it('paragraph has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Text, { as: 'p' }, () => 'Body copy text')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('heading h1 has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Text, { as: 'h1' }, () => 'Page heading')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('heading h2 has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Text, { as: 'h2' }, () => 'Section heading')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })
})

/* Card
--------------------------------------------------------------------- */
describe('Card a11y', () => {
  it('solid variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Card, { variant: 'solid' }, () => h(CardContent, {}, () => 'Card body'))
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('outline variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Card, { variant: 'outline' }, () => h(CardContent, {}, () => 'Card body'))
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })

  it('teal color variant has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Card, { color: 'teal' }, () => h(CardContent, {}, () => 'Teal card'))
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })
})

/* Blockquote
--------------------------------------------------------------------- */
describe('Blockquote a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Blockquote, {}, () => 'The best way to predict the future is to invent it.')
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })
})

/* Aside
--------------------------------------------------------------------- */
describe('Aside a11y', () => {
  it('has no WCAG 2.1 AA violations', async () => {
    const view = renderWithTheme(
      defineComponent({
        setup() {
          return () => h(Aside, { color: 'teal' }, () => [
            h(AsideTitle, {}, () => 'Skills'),
            h(AsideSection, {}, () => [
              h(AsideSubtitle, {}, () => 'Languages'),
              h(AsideList, { items: ['TypeScript', 'Vue', 'CSS'] }),
            ]),
          ])
        },
      }),
    )
    const violations = await runAxe(view.baseElement)
    expect(violations, violations.map(v => v.message).join('\n')).toEqual([])
  })
})
