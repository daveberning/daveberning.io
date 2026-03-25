import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Card from './Card.vue'
import CardHeader from './CardHeader.vue'
import CardContent from './CardContent.vue'
import CardFooter from './CardFooter.vue'

vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    isDark:     ref(false),
    color:      ref('teal'),
    setColor:   vi.fn(),
    toggleDark: vi.fn(),
  }),
}))

describe('Card', () => {
  describe('default rendering', () => {
    it('renders a <div> element by default', () => {
      const wrapper = mount(Card)
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('renders slot content', () => {
      const wrapper = mount(Card, { slots: { default: 'Hello' } })
      expect(wrapper.text()).toBe('Hello')
    })

    it('applies base classes', () => {
      const wrapper = mount(Card)
      expect(wrapper.classes()).toContain('rounded-lg')
      expect(wrapper.classes()).toContain('overflow-hidden')
    })
  })

  describe('variant prop', () => {
    it('solid variant applies bg-background and border-border', () => {
      const wrapper = mount(Card, { props: { variant: 'solid' } })
      expect(wrapper.classes()).toContain('bg-background')
      expect(wrapper.classes()).toContain('border-border')
      expect(wrapper.classes()).toContain('text-text')
    })

    it('outline variant applies bg-transparent and border-2', () => {
      const wrapper = mount(Card, { props: { variant: 'outline' } })
      expect(wrapper.classes()).toContain('!bg-transparent')
      expect(wrapper.classes()).toContain('border-2')
      expect(wrapper.classes()).toContain('border-border')
    })
  })

  describe('color prop', () => {
    it('teal applies brand-teal classes', () => {
      const wrapper = mount(Card, { props: { color: 'teal' } })
      expect(wrapper.classes()).toContain('bg-brand-teal')
      expect(wrapper.classes()).toContain('text-brand-teal-text')
    })

    it('red applies brand-red classes', () => {
      const wrapper = mount(Card, { props: { color: 'red' } })
      expect(wrapper.classes()).toContain('bg-brand-red')
      expect(wrapper.classes()).toContain('text-brand-red-text')
    })

    it('blue applies brand-blue classes', () => {
      const wrapper = mount(Card, { props: { color: 'blue' } })
      expect(wrapper.classes()).toContain('bg-brand-blue')
    })

    it('green applies brand-green classes', () => {
      const wrapper = mount(Card, { props: { color: 'green' } })
      expect(wrapper.classes()).toContain('bg-brand-green')
    })

    it('purple applies brand-purple classes', () => {
      const wrapper = mount(Card, { props: { color: 'purple' } })
      expect(wrapper.classes()).toContain('bg-brand-purple')
    })

    it('no color defaults to neutral variant classes', () => {
      const wrapper = mount(Card)
      expect(wrapper.classes()).toContain('bg-background')
      expect(wrapper.classes()).not.toContain('bg-brand-teal')
    })
  })

  describe('as prop', () => {
    it('renders as <article>', () => {
      const wrapper = mount(Card, { props: { as: 'article' } })
      expect(wrapper.element.tagName).toBe('ARTICLE')
    })

    it('renders as <aside>', () => {
      const wrapper = mount(Card, { props: { as: 'aside' } })
      expect(wrapper.element.tagName).toBe('ASIDE')
    })

    it('renders as <section>', () => {
      const wrapper = mount(Card, { props: { as: 'section' } })
      expect(wrapper.element.tagName).toBe('SECTION')
    })
  })

  describe('class prop', () => {
    it('merges a custom class', () => {
      const wrapper = mount(Card, { props: { class: 'my-class' } })
      expect(wrapper.classes()).toContain('my-class')
    })

    it('uses tailwind-merge to resolve conflicts', () => {
      const wrapper = mount(Card, { props: { class: 'rounded-none' } })
      expect(wrapper.classes()).toContain('rounded-none')
      expect(wrapper.classes()).not.toContain('rounded-lg')
    })
  })

  describe('subcomponents', () => {
    it('CardContent renders slot content', () => {
      const wrapper = mount(Card, {
        slots: {
          default: () => h(CardContent, null, () => 'content'),
        },
      })
      expect(wrapper.text()).toContain('content')
    })

    it('CardHeader renders and gets variant/color from context', () => {
      const wrapper = mount(Card, {
        props: { color: 'teal' },
        slots: {
          default: () => h(CardHeader, null, () => 'title'),
        },
      })
      const header = wrapper.findComponent(CardHeader)
      expect(header.classes()).toContain('border-brand-teal-dark')
    })

    it('CardFooter renders and gets variant/color from context', () => {
      const wrapper = mount(Card, {
        props: { color: 'teal' },
        slots: {
          default: () => h(CardFooter, null, () => 'footer'),
        },
      })
      const footer = wrapper.findComponent(CardFooter)
      expect(footer.classes()).toContain('border-brand-teal-dark')
    })
  })
})
