import { h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Testimonial, {
  TestimonialContent,
  TestimonialAttribution,
  TestimonialPhoto,
  TestimonialName,
  TestimonialRole,
  type TestimonialProps,
} from '.'

const baseProps: TestimonialProps = {
  name:    'Jane Smith',
  role:    'Engineering Manager',
  company: 'Acme Corp',
}

function mountFull(props: TestimonialProps = baseProps, photoSrc?: string) {
  return mount(Testimonial, {
    props,
    slots: {
      default: () => [
        h(TestimonialContent, null, () => 'Dave is a talented engineer.'),
        h(TestimonialAttribution, null, () => [
          h(TestimonialPhoto, { src: photoSrc }),
          h('div', { class: 'flex flex-col gap-0.5' }, [
            h(TestimonialName),
            h(TestimonialRole),
          ]),
        ]),
      ],
    },
  })
}

describe('Testimonial', () => {
  it('renders as an <article> by default', () => {
    const wrapper = mountFull()
    expect(wrapper.element.tagName).toBe('ARTICLE')
  })

  it('renders as a custom element via as prop', () => {
    const wrapper = mount(Testimonial, {
      props: { ...baseProps, as: 'div' },
      slots: { default: () => h(TestimonialContent, null, () => 'text') },
    })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('applies base variant classes', () => {
    const wrapper = mountFull()
    expect(wrapper.classes()).toContain('rounded-2xl')
    expect(wrapper.classes()).toContain('border-border')
    expect(wrapper.classes()).toContain('bg-surface')
  })

  it('merges a custom class', () => {
    const wrapper = mount(Testimonial, {
      props: { ...baseProps, class: 'my-custom' },
      slots: { default: () => 'content' },
    })
    expect(wrapper.classes()).toContain('my-custom')
  })
})

describe('TestimonialContent', () => {
  it('renders a decorative quote mark with aria-hidden', () => {
    const wrapper = mountFull()
    const quote = wrapper.find('span[aria-hidden="true"]')
    expect(quote.exists()).toBe(true)
    expect(quote.classes()).toContain('text-theme')
  })

  it('renders slot content inside a blockquote', () => {
    const wrapper = mountFull()
    const blockquote = wrapper.find('blockquote')
    expect(blockquote.exists()).toBe(true)
    expect(blockquote.text()).toBe('Dave is a talented engineer.')
    expect(blockquote.classes()).toContain('italic')
  })
})

describe('TestimonialPhoto', () => {
  it('shows the initial fallback when src is not provided', () => {
    const wrapper = mountFull()
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.find('span[aria-hidden="true"]').text()).toBe('“')
  })

  it('shows the initial fallback when src is an empty string', () => {
    const wrapper = mountFull(baseProps, '')
    expect(wrapper.find('img').exists()).toBe(false)
  })

  it('renders an <img> when src is provided', () => {
    const wrapper = mountFull(baseProps, '/photos/jane.jpg')
    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/photos/jane.jpg')
    expect(img.attributes('alt')).toBe("Jane Smith's photo")
  })

  it('uses the name from context for the alt text', () => {
    const wrapper = mountFull({ ...baseProps, name: 'Bob Jones' }, '/photos/bob.jpg')
    expect(wrapper.find('img').attributes('alt')).toBe("Bob Jones's photo")
  })

  it('applies base photo variant classes', () => {
    const wrapper = mountFull()
    const photo = wrapper.findComponent(TestimonialPhoto)
    expect(photo.classes()).toContain('rounded-full')
    expect(photo.classes()).toContain('ring-2')
    expect(photo.classes()).toContain('ring-border')
  })
})

describe('TestimonialName', () => {
  it('renders the name from context', () => {
    const wrapper = mountFull()
    const name = wrapper.findComponent(TestimonialName)
    expect(name.text()).toBe('Jane Smith')
    expect(name.find('p').classes()).toContain('font-semibold')
  })

  it('reflects updated context', () => {
    const wrapper = mountFull({ ...baseProps, name: 'Alice Lee' })
    expect(wrapper.findComponent(TestimonialName).text()).toBe('Alice Lee')
  })
})

describe('TestimonialRole', () => {
  it('renders role and company from context', () => {
    const wrapper = mountFull()
    const role = wrapper.findComponent(TestimonialRole)
    expect(role.text()).toContain('Engineering Manager')
    expect(role.text()).toContain('Acme Corp')
    expect(role.find('p').classes()).toContain('text-text-muted')
  })
})

describe('TestimonialAttribution', () => {
  it('renders a divider', () => {
    const wrapper = mountFull()
    expect(wrapper.find('hr').exists()).toBe(true)
  })

  it('renders Photo, Name, and Role inside attribution', () => {
    const wrapper = mountFull()
    const attribution = wrapper.findComponent(TestimonialAttribution)
    expect(attribution.findComponent(TestimonialPhoto).exists()).toBe(true)
    expect(attribution.findComponent(TestimonialName).exists()).toBe(true)
    expect(attribution.findComponent(TestimonialRole).exists()).toBe(true)
  })
})
