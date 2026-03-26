import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormLabel from './FormLabel.vue'

// Stub UiText as a passthrough so attrs (including `for` and `class`) reach the rendered element.
const UiTextStub = {
  inheritAttrs: false,
  props: ['as'],
  template: '<component :is="as || \'span\'" v-bind="$attrs"><slot /></component>',
}

function mountLabel({
  fieldName   = 'email',
  slotContent = 'Email address',
} = {}) {
  return mount(FormLabel, {
    props:  { name: fieldName },
    slots:  { default: slotContent },
    global: { stubs: { UiText: UiTextStub } },
  })
}

describe('FormLabel', () => {
  it('renders a <label> element', () => {
    const wrapper = mountLabel()
    expect(wrapper.find('label').exists()).toBe(true)
  })

  it('renders slot content', () => {
    const wrapper = mountLabel({ slotContent: 'Your email' })
    expect(wrapper.find('label').text()).toBe('Your email')
  })

  it('has for attribute matching field-{name}', () => {
    const wrapper = mountLabel({ fieldName: 'phone' })
    expect(wrapper.find('label').attributes('for')).toBe('field-phone')
  })

  it('applies base layout classes', () => {
    const wrapper = mountLabel()
    expect(wrapper.find('label').classes()).toContain('block')
    expect(wrapper.find('label').classes()).toContain('mb-1')
  })
})
