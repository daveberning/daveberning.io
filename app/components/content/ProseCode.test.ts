import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProseCode from './ProseCode.vue'

const UiCodeBlockStub = {
  inheritAttrs: false,
  props: ['variant', 'agent'],
  template: '<code v-bind="$attrs"><slot /></code>',
}

describe('ProseCode', () => {
  describe('default rendering', () => {
    it('renders slot content inside a code element', () => {
      const wrapper = mount(ProseCode, {
        slots: { default: 'let x = 1' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      expect(wrapper.find('code').exists()).toBe(true)
      expect(wrapper.text()).toContain('let x = 1')
    })

    it('delegates to UiCodeBlock with variant="inline"', () => {
      const wrapper = mount(ProseCode, {
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('variant')).toBe('inline')
    })

    it('defaults agent prop to "none"', () => {
      const wrapper = mount(ProseCode, {
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('none')
    })
  })

  describe('agent prop', () => {
    it('propagates agent="qa-engineer" to UiCodeBlock', () => {
      const wrapper = mount(ProseCode, {
        props: { agent: 'qa-engineer' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('qa-engineer')
    })

    it('propagates agent="front-end-software-engineer" to UiCodeBlock', () => {
      const wrapper = mount(ProseCode, {
        props: { agent: 'front-end-software-engineer' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('front-end-software-engineer')
    })

    it('propagates agent="seo-copywriter" to UiCodeBlock', () => {
      const wrapper = mount(ProseCode, {
        props: { agent: 'seo-copywriter' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('seo-copywriter')
    })

    it('propagates agent="ui-designer" to UiCodeBlock', () => {
      const wrapper = mount(ProseCode, {
        props: { agent: 'ui-designer' },
        global: { stubs: { UiCodeBlock: UiCodeBlockStub } },
      })
      const block = wrapper.findComponent(UiCodeBlockStub)
      expect(block.props('agent')).toBe('ui-designer')
    })
  })
})
