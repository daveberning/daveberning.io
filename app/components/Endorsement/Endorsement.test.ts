import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import Endorsement, { EndorsementContent, EndorsementAttribution, EndorsementPhoto, EndorsementName, EndorsementRole, type EndorsementProps } from '.'
import { mountWithTheme } from '~/lib/mountHarness'

const baseProps: EndorsementProps = {
  name: 'Jane Smith',
}

function mountFull(props: EndorsementProps = baseProps, photoSrc?: string) {
  return mountWithTheme(Endorsement, {
    props,
    slots: {
      default: () => [
        h(EndorsementContent, null, () => 'Dave is a talented engineer.'),
        h(EndorsementAttribution, null, () => [
          h(EndorsementPhoto, { src: photoSrc }),
          h('div', { class: 'flex flex-col gap-0.5' }, [
            h(EndorsementName, null, () => props.name),
            h(EndorsementRole, null, () => 'Engineering Manager · Acme Corp'),
          ]),
        ]),
      ],
    },
  })
}

describe('Endorsement', () => {
  it('renders as an <article> by default', () => {
    const wrapper = mountFull()
    expect((wrapper.element as HTMLElement).tagName).toBe('ARTICLE')
  })

  it('renders as a custom element via as prop', () => {
    const wrapper = mountWithTheme(Endorsement, {
      props: { ...baseProps, as: 'div' },
      slots: { default: () => h(EndorsementContent, null, () => 'text') },
    })
    expect((wrapper.element as HTMLElement).tagName).toBe('DIV')
  })

  it('applies base variant classes', () => {
    const wrapper = mountFull()
    expect(wrapper.classes()).toContain('rounded-2xl')
    expect(wrapper.classes()).toContain('border-border')
    expect(wrapper.classes()).toContain('bg-surface')
  })

  it('merges a custom class', () => {
    const wrapper = mountWithTheme(Endorsement, {
      props: { ...baseProps, class: 'my-custom' },
      slots: { default: () => 'content' },
    })
    expect(wrapper.classes()).toContain('my-custom')
  })
})

describe('EndorsementContent', () => {
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

describe('EndorsementPhoto', () => {
  it('shows the initial fallback when src is not provided', () => {
    const wrapper = mountFull()
    expect(wrapper.find('img').exists()).toBe(false)
    const photo = wrapper.findComponent(EndorsementPhoto)
    expect(photo.find('span[aria-hidden="true"]').text().trim()).toBe('J')
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
    const photo = wrapper.findComponent(EndorsementPhoto)
    expect(photo.classes()).toContain('rounded-full')
    expect(photo.classes()).toContain('ring-2')
    expect(photo.classes()).toContain('ring-border')
  })

  it('falls back to the initial when the image errors', async () => {
    const wrapper = mountFull(baseProps, '/photos/jane.jpg')
    await wrapper.find('img').trigger('error')

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.findComponent(EndorsementPhoto).find('span[aria-hidden="true"]').text().trim()).toBe('J')
  })
})

describe('EndorsementName', () => {
  it('renders slot content', () => {
    const wrapper = mountFull()
    const name = wrapper.findComponent(EndorsementName)
    expect(name.text()).toBe('Jane Smith')
    expect(name.find('p').classes()).toContain('font-semibold')
  })

  it('renders updated slot content', () => {
    const wrapper = mountFull({ ...baseProps, name: 'Alice Lee' })
    expect(wrapper.findComponent(EndorsementName).text()).toBe('Alice Lee')
  })
})

describe('EndorsementRole', () => {
  it('renders slot content', () => {
    const wrapper = mountFull()
    const role = wrapper.findComponent(EndorsementRole)
    expect(role.text()).toContain('Engineering Manager')
    expect(role.text()).toContain('Acme Corp')
    expect(role.find('p').classes()).toContain('text-text-muted')
  })
})

describe('EndorsementAttribution', () => {
  it('renders a divider', () => {
    const wrapper = mountFull()
    expect(wrapper.find('hr').exists()).toBe(true)
  })

  it('renders Photo, Name, and Role inside attribution', () => {
    const wrapper = mountFull()
    const attribution = wrapper.findComponent(EndorsementAttribution)
    expect(attribution.findComponent(EndorsementPhoto).exists()).toBe(true)
    expect(attribution.findComponent(EndorsementName).exists()).toBe(true)
    expect(attribution.findComponent(EndorsementRole).exists()).toBe(true)
  })
})
