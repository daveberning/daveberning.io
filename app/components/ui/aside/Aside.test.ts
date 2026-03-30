import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Aside from './Aside.vue'
import AsideTitle from './AsideTitle.vue'
import AsideSubtitle from './AsideSubtitle.vue'
import AsideSection from './AsideSection.vue'
import AsideList from './AsideList.vue'

vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    isDark:     ref(false),
    color:      ref('teal'),
    setColor:   vi.fn(),
    toggleDark: vi.fn(),
  }),
}))

// Passthrough stub for UiText — renders the `as` prop element so element tag assertions work.
const UiTextStub = {
  inheritAttrs: false,
  props: ['as', 'color'],
  template: '<component :is="as || \'p\'" v-bind="$attrs"><slot /></component>',
}

const globalStubs = {
  stubs: { UiText: UiTextStub },
}

// Mount a subcomponent inside an Aside root so provide/inject context is satisfied.
function mountInsideAside(
  childNode: ReturnType<typeof h>,
  asideProps: Record<string, unknown> = {},
) {
  return mount(Aside, {
    props: asideProps,
    slots: { default: () => childNode },
    global: globalStubs,
  })
}

// ─── Aside ───────────────────────────────────────────────────────────────────

describe('Aside', () => {
  it('renders a <div> element', () => {
    const wrapper = mount(Aside, { global: globalStubs })
    expect(wrapper.element.tagName).toBe('DIV')
  })

  it('renders slot content', () => {
    const wrapper = mount(Aside, {
      slots: { default: 'sidebar content' },
      global: globalStubs,
    })
    expect(wrapper.text()).toContain('sidebar content')
  })

  it('applies base CVA classes by default', () => {
    const wrapper = mount(Aside, { global: globalStubs })
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('applies default teal color variant (no extra classes emitted)', () => {
    const wrapper = mount(Aside, { props: { color: 'teal' }, global: globalStubs })
    // CVA teal variant is empty string — base classes must still be present
    expect(wrapper.classes()).toContain('flex')
    expect(wrapper.classes()).toContain('flex-col')
    expect(wrapper.classes()).toContain('gap-4')
  })

  it('applies red color variant', () => {
    const wrapper = mount(Aside, { props: { color: 'red' }, global: globalStubs })
    expect(wrapper.classes()).toContain('flex')
  })

  it('applies blue color variant', () => {
    const wrapper = mount(Aside, { props: { color: 'blue' }, global: globalStubs })
    expect(wrapper.classes()).toContain('flex')
  })

  it('applies green color variant', () => {
    const wrapper = mount(Aside, { props: { color: 'green' }, global: globalStubs })
    expect(wrapper.classes()).toContain('flex')
  })

  it('applies purple color variant', () => {
    const wrapper = mount(Aside, { props: { color: 'purple' }, global: globalStubs })
    expect(wrapper.classes()).toContain('flex')
  })

  it('merges a custom class', () => {
    const wrapper = mount(Aside, {
      props: { class: 'my-aside' },
      global: globalStubs,
    })
    expect(wrapper.classes()).toContain('my-aside')
  })

  it('uses tailwind-merge to resolve conflicting classes', () => {
    const wrapper = mount(Aside, {
      props: { class: 'gap-8' },
      global: globalStubs,
    })
    expect(wrapper.classes()).toContain('gap-8')
    expect(wrapper.classes()).not.toContain('gap-4')
  })
})

// ─── AsideTitle ──────────────────────────────────────────────────────────────

describe('AsideTitle', () => {
  it('renders as an <h2> element', () => {
    const wrapper = mountInsideAside(h(AsideTitle, null, () => 'About me'))
    const title = wrapper.findComponent(AsideTitle)
    expect(title.find('h2').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mountInsideAside(h(AsideTitle, null, () => 'About me'))
    const title = wrapper.findComponent(AsideTitle)
    expect(title.text()).toBe('About me')
  })

  it('applies text-xl and font-semibold classes', () => {
    const wrapper = mountInsideAside(h(AsideTitle, null, () => 'Title'))
    const title = wrapper.findComponent(AsideTitle)
    expect(title.find('h2').classes()).toContain('text-xl')
    expect(title.find('h2').classes()).toContain('font-semibold')
  })

  it('merges a custom class', () => {
    const wrapper = mountInsideAside(h(AsideTitle, { class: 'extra-title' }, () => 'Title'))
    const title = wrapper.findComponent(AsideTitle)
    expect(title.find('h2').classes()).toContain('extra-title')
  })
})

// ─── AsideSubtitle ───────────────────────────────────────────────────────────

describe('AsideSubtitle', () => {
  it('renders a <p> element (UiText default)', () => {
    const wrapper = mountInsideAside(h(AsideSubtitle, null, () => 'Skills'))
    const subtitle = wrapper.findComponent(AsideSubtitle)
    expect(subtitle.find('p').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mountInsideAside(h(AsideSubtitle, null, () => 'Skills'))
    const subtitle = wrapper.findComponent(AsideSubtitle)
    expect(subtitle.text()).toBe('Skills')
  })

  it('applies text-xs, font-semibold, uppercase, and tracking-widest classes', () => {
    const wrapper = mountInsideAside(h(AsideSubtitle, null, () => 'Skills'))
    const subtitle = wrapper.findComponent(AsideSubtitle)
    const el = subtitle.find('p')
    expect(el.classes()).toContain('text-xs')
    expect(el.classes()).toContain('font-bold')
    expect(el.classes()).toContain('uppercase')
    expect(el.classes()).toContain('tracking-widest')
  })

  it('merges a custom class', () => {
    const wrapper = mountInsideAside(h(AsideSubtitle, { class: 'extra-sub' }, () => 'Sub'))
    const subtitle = wrapper.findComponent(AsideSubtitle)
    expect(subtitle.find('p').classes()).toContain('extra-sub')
  })
})

// ─── AsideSection ────────────────────────────────────────────────────────────

describe('AsideSection', () => {
  it('renders a <div> element', () => {
    const wrapper = mountInsideAside(h(AsideSection, null, () => 'section content'))
    const section = wrapper.findComponent(AsideSection)
    expect(section.element.tagName).toBe('DIV')
  })

  it('renders slot content', () => {
    const wrapper = mountInsideAside(h(AsideSection, null, () => 'section content'))
    const section = wrapper.findComponent(AsideSection)
    expect(section.text()).toBe('section content')
  })

  it('applies flex, flex-col, and gap-2 classes', () => {
    const wrapper = mountInsideAside(h(AsideSection, null, () => 'content'))
    const section = wrapper.findComponent(AsideSection)
    expect(section.classes()).toContain('flex')
    expect(section.classes()).toContain('flex-col')
    expect(section.classes()).toContain('gap-2')
  })

  it('merges a custom class', () => {
    const wrapper = mountInsideAside(h(AsideSection, { class: 'extra-section' }, () => 'content'))
    const section = wrapper.findComponent(AsideSection)
    expect(section.classes()).toContain('extra-section')
  })
})

// ─── AsideList ───────────────────────────────────────────────────────────────

describe('AsideList', () => {
  it('renders items joined by " · "', () => {
    const wrapper = mountInsideAside(
      h(AsideList, { items: ['Vue', 'TypeScript', 'Nuxt'] }),
    )
    const list = wrapper.findComponent(AsideList)
    expect(list.text()).toBe('Vue · TypeScript · Nuxt')
  })

  it('renders a single item without a separator', () => {
    const wrapper = mountInsideAside(h(AsideList, { items: ['Vue'] }))
    const list = wrapper.findComponent(AsideList)
    expect(list.text()).toBe('Vue')
  })

  it('renders nothing meaningful with an empty array', () => {
    const wrapper = mountInsideAside(h(AsideList, { items: [] }))
    const list = wrapper.findComponent(AsideList)
    expect(list.text()).toBe('')
  })

  it('merges a custom class onto the rendered element', () => {
    const wrapper = mountInsideAside(
      h(AsideList, { items: ['item'], class: 'extra-list' }),
    )
    const list = wrapper.findComponent(AsideList)
    expect(list.find('p').classes()).toContain('extra-list')
  })
})
