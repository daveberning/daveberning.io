import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProsePre from './ProsePre.vue'

const UiCodeBlockStub = {
  inheritAttrs: false,
  props: ['variant', 'agent', 'language', 'code', 'class', 'preClass', 'preStyle'],
  template: '<div v-bind="$attrs"><slot /></div>',
}

describe('ProsePre', () => {
  describe('default rendering', () => {
    it('renders slot content', () => {
      const wrapper = mount(ProsePre, {
        slots: { default: 'console.log("hello")' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      expect(wrapper.text()).toContain('console.log("hello")')
    })

    it('delegates to UiCodeBlock with variant="block"', () => {
      const wrapper = mount(ProsePre, {
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('variant')).toBe('block')
    })
  })

  describe('meta prop — agent extraction', () => {
    it('extracts agent from meta string and passes to UiCodeBlock', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: 'agent="qa-engineer"' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('qa-engineer')
    })

    it('extracts agent="front-end-software-engineer" from meta', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: 'agent="front-end-software-engineer"' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('front-end-software-engineer')
    })

    it('extracts agent="seo-copywriter" from meta', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: 'agent="seo-copywriter"' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('seo-copywriter')
    })

    it('extracts agent="ui-designer" from meta', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: 'agent="ui-designer"' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('ui-designer')
    })

    it('falls back to agent="none" when meta is null', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: null },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('none')
    })

    it('falls back to agent="none" when meta is undefined', () => {
      const wrapper = mount(ProsePre, {
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('none')
    })

    it('falls back to agent="none" when meta contains no agent key', () => {
      const wrapper = mount(ProsePre, {
        props: { meta: 'highlight="1,2,3"' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('none')
    })
  })

  describe('language prop', () => {
    it('passes language prop through to UiCodeBlock', () => {
      const wrapper = mount(ProsePre, {
        props: { language: 'typescript' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('language')).toBe('typescript')
    })
  })

  describe('code prop', () => {
    it('passes code prop through to UiCodeBlock', () => {
      const wrapper = mount(ProsePre, {
        props: { code: 'const x = 1' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('code')).toBe('const x = 1')
    })
  })

  describe('class prop', () => {
    it('forwards class prop to UiCodeBlock preClass', () => {
      const wrapper = mount(ProsePre, {
        props: { class: 'my-pre-class' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('preClass')).toBe('my-pre-class')
    })

    it('forwards style attr to UiCodeBlock preStyle', () => {
      const wrapper = mount(ProsePre, {
        attrs: { style: '--shiki-light: #111; --shiki-dark: #eee;' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('preStyle')).toBe('--shiki-light: #111; --shiki-dark: #eee;')
    })
  })
})
