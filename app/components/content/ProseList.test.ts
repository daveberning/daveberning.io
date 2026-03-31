import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProseUl from './ProseUl.vue'
import ProseLi from './ProseLi.vue'

const UiTextStub = {
  inheritAttrs: false,
  props: ['as', 'color'],
  template: '<component :is="as || \'p\'" v-bind="$attrs"><slot /></component>',
}

describe('ProseUl', () => {
  it('applies the tighter outside-list spacing classes', () => {
    const wrapper = mount(ProseUl)
    expect(wrapper.classes()).toContain('pl-5')
    expect(wrapper.classes()).toContain('space-y-1.5')
    expect(wrapper.classes()).not.toContain('list-inside')
  })
})

describe('ProseLi', () => {
  it('renders list content inside a div instead of a paragraph', () => {
    const wrapper = mount(ProseLi, {
      slots: { default: 'List item copy' },
      global: {
        stubs: { UiText: UiTextStub },
      },
    })

    expect(wrapper.find('div').exists()).toBe(true)
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.text()).toContain('List item copy')
  })

  it('applies the hanging-indent helper class', () => {
    const wrapper = mount(ProseLi, {
      global: {
        stubs: { UiText: UiTextStub },
      },
    })

    expect(wrapper.classes()).toContain('pl-1')
  })
})
