import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Text from './Text.vue'

const isDark = ref(false)

vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    isDark,
  }),
}))

describe('Text', () => {
  it('renders a paragraph with light-mode default text color', () => {
    isDark.value = false
    const wrapper = mount(Text, { slots: { default: 'Hello world' } })

    expect((wrapper.element as HTMLElement).tagName).toBe('P')
    expect(wrapper.text()).toBe('Hello world')
    expect(wrapper.classes()).toContain('text-theme-black')
  })

  it('uses dark-mode default text color when the theme is dark', () => {
    isDark.value = true
    const wrapper = mount(Text, { slots: { default: 'Hello world' } })

    expect(wrapper.classes()).toContain('text-text')
    expect(wrapper.classes()).not.toContain('text-theme-black')
    isDark.value = false
  })
})
