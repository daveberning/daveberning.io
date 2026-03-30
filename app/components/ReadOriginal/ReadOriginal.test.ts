import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ReadOriginal from './ReadOriginal.vue'

const HREF = 'https://example.com/article'

function mountComponent(props: Record<string, unknown> = {}) {
  return mount(ReadOriginal, {
    props: { href: HREF, ...props },
    global: {
      stubs: {
        Icon: true,
        NuxtIcon: true,
        UiText: { props: ['color', 'as'], template: '<p v-bind="$attrs"><slot /></p>' },
        UiLink: { props: ['to', 'variant', 'size', 'radius'], template: '<a :href="to" v-bind="$attrs"><slot /></a>' },
      },
    },
  })
}

describe('ReadOriginal', () => {
  describe('root element', () => {
    it('renders a <div> element', () => {
      const wrapper = mountComponent()
      expect(wrapper.element.tagName).toBe('DIV')
    })

    it('applies base classes on the root element', () => {
      const wrapper = mountComponent()
      const classes = wrapper.classes()
      expect(classes).toContain('relative')
      expect(classes).toContain('rounded-lg')
      expect(classes).toContain('border')
      expect(classes).toContain('border-border')
      expect(classes).toContain('bg-surface')
      expect(classes).toContain('overflow-hidden')
    })

    it('merges custom class prop onto root element', () => {
      const wrapper = mountComponent({ class: 'mt-8' })
      expect(wrapper.classes()).toContain('mt-8')
    })
  })

  describe('accent stripe', () => {
    it('renders a left accent stripe with aria-hidden', () => {
      const wrapper = mountComponent()
      const stripe = wrapper.find('[aria-hidden="true"]')
      expect(stripe.exists()).toBe(true)
      expect(stripe.classes()).toContain('absolute')
      expect(stripe.classes()).toContain('inset-y-0')
      expect(stripe.classes()).toContain('left-0')
      expect(stripe.classes()).toContain('w-1')
      expect(stripe.classes()).toContain('bg-theme')
    })
  })

  describe('platform line', () => {
    it('renders platform text when platform prop is provided', () => {
      const wrapper = mountComponent({ platform: 'DigitalOcean' })
      const platformText = wrapper.find('p')
      expect(platformText.exists()).toBe(true)
      expect(platformText.text()).toBe('This is an AI-generated summary of the handwritten article published on DigitalOcean')
    })

    it('does not render platform text when platform prop is not provided', () => {
      const wrapper = mountComponent()
      const platformText = wrapper.find('p')
      expect(platformText.exists()).toBe(false)
    })
  })

  describe('CTA link', () => {
    it('renders the link with correct href', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      expect(link.attributes('href')).toBe(HREF)
    })

    it('opens in a new tab with security attributes', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      expect(link.attributes('target')).toBe('_blank')
      expect(link.attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders default label text', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      expect(link.text()).toContain('Read the full article')
    })

    it('renders custom label text when label prop is provided', () => {
      const wrapper = mountComponent({ label: 'View on Medium' })
      const link = wrapper.find('a')
      expect(link.text()).toContain('View on Medium')
    })

    it('applies expected classes to the link', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      expect(link.classes()).toContain('group')
      expect(link.classes()).toContain('font-semibold')
    })
  })

  describe('aria-label', () => {
    it('includes platform in aria-label when platform is provided', () => {
      const wrapper = mountComponent({ platform: 'DigitalOcean' })
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBe('Read the full article on DigitalOcean (opens in new tab)')
    })

    it('omits platform from aria-label when platform is not provided', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBe('Read the full article (opens in new tab)')
    })

    it('uses custom label in aria-label when label prop is provided', () => {
      const wrapper = mountComponent({ label: 'View original', platform: 'Medium' })
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBe('View original on Medium (opens in new tab)')
    })

    it('uses custom label without platform in aria-label', () => {
      const wrapper = mountComponent({ label: 'View original' })
      const link = wrapper.find('a')
      expect(link.attributes('aria-label')).toBe('View original (opens in new tab)')
    })
  })

  describe('icon', () => {
    it('renders the arrow icon stub', () => {
      const wrapper = mountComponent()
      const link = wrapper.find('a')
      // The Icon is stubbed; verify the stub exists inside the link
      expect(link.html()).toContain('nuxt-icon-stub')
    })
  })
})
