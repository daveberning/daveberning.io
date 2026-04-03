import { h } from 'vue'
import { describe, expect, it } from 'vitest'
import PortfolioPiece, { PortfolioPieceHeader, PortfolioPieceBody, PortfolioPieceTech, PortfolioPieceTechItem, PortfolioPieceFooter } from '.'
import { mountWithTheme } from '~/lib/mountHarness'

function mountRoot(props: Record<string, unknown> = {}, slots: Record<string, () => unknown> = {}) {
  return mountWithTheme(PortfolioPiece, {
    props,
    slots: { default: slots.default ?? (() => 'content') },
    global: {
      stubs: {
        UiLink: {
          props: ['href', 'variant', 'size'],
          template: '<a :href="href"><slot /></a>',
        },
      },
    },
  })
}

describe('PortfolioPiece', () => {
  it('renders as an <article> by default', () => {
    const wrapper = mountRoot()
    expect((wrapper.element as HTMLElement).tagName).toBe('ARTICLE')
  })

  it('renders as a custom element via as prop', () => {
    const wrapper = mountRoot({ as: 'section' })
    expect((wrapper.element as HTMLElement).tagName).toBe('SECTION')
  })

  it('applies base variant classes', () => {
    const wrapper = mountRoot()
    expect(wrapper.classes()).toContain('rounded-2xl')
    expect(wrapper.classes()).toContain('overflow-hidden')
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
  })

  it('applies solid variant classes by default', () => {
    const wrapper = mountRoot()
    expect(wrapper.classes()).toContain('bg-surface')
    expect(wrapper.classes()).toContain('border-border')
    expect(wrapper.classes()).toContain('text-text')
  })

  it('applies outline variant classes', () => {
    const wrapper = mountRoot({ variant: 'outline' })
    expect(wrapper.classes()).toContain('bg-transparent')
    expect(wrapper.classes()).toContain('border-2')
  })

  it('applies accent none by default (no accent classes)', () => {
    const wrapper = mountRoot()
    expect(wrapper.classes()).not.toContain('border-t-4')
    expect(wrapper.classes()).not.toContain('border-l-4')
  })

  it('applies accent top classes', () => {
    const wrapper = mountRoot({ accent: 'top' })
    expect(wrapper.classes()).toContain('border-t-4')
  })

  it('applies accent left classes', () => {
    const wrapper = mountRoot({ accent: 'left' })
    expect(wrapper.classes()).toContain('border-l-4')
  })

  it('applies all color variants with grey idle border', () => {
    const colors = ['teal', 'red', 'blue', 'green', 'purple'] as const
    for (const color of colors) {
      const wrapper = mountRoot({ color })
      expect(wrapper.classes()).toContain('border-border')
    }
  })

  it('applies compound variants for accent top + each color', () => {
    const colors = ['teal', 'red', 'blue', 'green', 'purple'] as const
    for (const color of colors) {
      const wrapper = mountRoot({ accent: 'top', color })
      expect(wrapper.classes()).toContain('border-t-4')
      expect(wrapper.classes()).toContain(`border-t-brand-${color}`)
    }
  })

  it('applies compound variants for accent left + each color', () => {
    const colors = ['teal', 'red', 'blue', 'green', 'purple'] as const
    for (const color of colors) {
      const wrapper = mountRoot({ accent: 'left', color })
      expect(wrapper.classes()).toContain('border-l-4')
      expect(wrapper.classes()).toContain(`border-l-brand-${color}`)
    }
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({ class: 'my-custom' })
    expect(wrapper.classes()).toContain('my-custom')
  })

  it('renders slot content', () => {
    const wrapper = mountRoot({}, { default: () => 'hello world' })
    expect(wrapper.text()).toBe('hello world')
  })
})

describe('PortfolioPieceHeader', () => {
  it('renders as a <header> by default', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'Test' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.element.tagName).toBe('HEADER')
  })

  it('renders as a custom element via as prop', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'Test', as: 'div' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.element.tagName).toBe('DIV')
  })

  it('renders the title', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'My Project' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.text()).toContain('My Project')
  })

  it('renders the role when provided', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'My Project', role: 'Lead Dev' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.text()).toContain('Lead Dev')
    expect(header.find('h2').text()).toBe('My Project')
    expect(header.find('p').text()).toBe('Lead Dev')
  })

  it('omits the role when not provided', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'Solo Title' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.find('h2').text()).toBe('Solo Title')
    expect(header.find('p').exists()).toBe(false)
  })

  it('applies base header variant classes', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'T' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.classes()).toContain('px-6')
    expect(header.classes()).toContain('pt-6')
    expect(header.classes()).toContain('pb-4')
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceHeader, { title: 'T', class: 'extra' }),
    })
    const header = wrapper.findComponent(PortfolioPieceHeader)
    expect(header.classes()).toContain('extra')
  })
})

describe('PortfolioPieceBody', () => {
  it('renders slot content', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceBody, null, () => 'Body text here'),
    })
    const body = wrapper.findComponent(PortfolioPieceBody)
    expect(body.text()).toBe('Body text here')
  })

  it('applies base body variant classes', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceBody, null, () => 'text'),
    })
    const body = wrapper.findComponent(PortfolioPieceBody)
    expect(body.classes()).toContain('px-6')
    expect(body.classes()).toContain('py-2')
    expect(body.classes()).toContain('flex-1')
    expect(body.classes()).toContain('text-sm')
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceBody, { class: 'extra-body' }, () => 'text'),
    })
    const body = wrapper.findComponent(PortfolioPieceBody)
    expect(body.classes()).toContain('extra-body')
  })
})

describe('PortfolioPieceTech', () => {
  it('renders as a <ul>', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => 'items'),
    })
    const tech = wrapper.findComponent(PortfolioPieceTech)
    expect(tech.element.tagName).toBe('UL')
  })

  it('applies base tech variant classes', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => 'items'),
    })
    const tech = wrapper.findComponent(PortfolioPieceTech)
    expect(tech.classes()).toContain('px-6')
    expect(tech.classes()).toContain('py-2')
    expect(tech.classes()).toContain('flex-wrap')
    expect(tech.classes()).toContain('list-none')
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, { class: 'extra-tech' }, () => 'items'),
    })
    const tech = wrapper.findComponent(PortfolioPieceTech)
    expect(tech.classes()).toContain('extra-tech')
  })
})

describe('PortfolioPieceTechItem', () => {
  it('renders as a <li>', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => h(PortfolioPieceTechItem, null, () => 'Vue')),
    })
    const item = wrapper.findComponent(PortfolioPieceTechItem)
    expect(item.element.tagName).toBe('LI')
  })

  it('renders slot content', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => h(PortfolioPieceTechItem, null, () => 'TypeScript')),
    })
    const item = wrapper.findComponent(PortfolioPieceTechItem)
    expect(item.text()).toBe('TypeScript')
  })

  it('applies base tech item variant classes', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => h(PortfolioPieceTechItem, null, () => 'Vue')),
    })
    const item = wrapper.findComponent(PortfolioPieceTechItem)
    expect(item.classes()).toContain('text-xs')
    expect(item.classes()).toContain('rounded-full')
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceTech, null, () => h(PortfolioPieceTechItem, { class: 'extra-item' }, () => 'Vue')),
    })
    const item = wrapper.findComponent(PortfolioPieceTechItem)
    expect(item.classes()).toContain('extra-item')
  })
})

describe('PortfolioPieceFooter', () => {
  it('renders as a <footer> by default', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.element.tagName).toBe('FOOTER')
  })

  it('renders as a custom element via as prop', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter, { as: 'div' }),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.element.tagName).toBe('DIV')
  })

  it('omits year when not provided', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter, { url: 'https://example.com' }),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.find('span').exists()).toBe(false)
  })

  it('omits link when url is not provided', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter, { year: 2023 }),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.find('a').exists()).toBe(false)
  })

  it('omits both year and link when neither provided', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.find('span').exists()).toBe(false)
    expect(footer.find('a').exists()).toBe(false)
  })

  it('applies base footer variant classes', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.classes()).toContain('px-6')
    expect(footer.classes()).toContain('pt-4')
    expect(footer.classes()).toContain('pb-6')
    expect(footer.classes()).toContain('border-t')
    expect(footer.classes()).toContain('mt-auto')
  })

  it('merges a custom class', () => {
    const wrapper = mountRoot({}, {
      default: () => h(PortfolioPieceFooter, { class: 'extra-footer' }),
    })
    const footer = wrapper.findComponent(PortfolioPieceFooter)
    expect(footer.classes()).toContain('extra-footer')
  })
})
