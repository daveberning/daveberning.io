import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Blockquote from './Blockquote.vue'

describe('Blockquote', () => {
  it('renders as a <blockquote> element by default', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.element.tagName).toBe('BLOCKQUOTE')
  })

  it('renders as a different element when the as prop is passed', () => {
    const wrapper = mount(Blockquote, { props: { as: 'section' } })
    expect(wrapper.element.tagName).toBe('SECTION')
  })

  it('applies the pl-6 static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('pl-6')
  })

  it('applies the pr-5 static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('pr-5')
  })

  it('applies the py-5 static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('py-5')
  })

  it('applies the my-6 static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('my-6')
  })

  it('applies the rounded-r-lg static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('rounded-r-lg')
  })

  it('applies the bg-surface static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('bg-surface')
  })

  it('applies the border-l-4 static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('border-l-4')
  })

  it('applies the border-theme static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('border-theme')
  })

  it('applies the italic static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('italic')
  })

  it('applies the text-text static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('text-text')
  })

  it('applies the leading-relaxed static class', () => {
    const wrapper = mount(Blockquote)
    expect(wrapper.classes()).toContain('leading-relaxed')
  })

  it('passes through an additional class prop and merges it', () => {
    const wrapper = mount(Blockquote, { props: { class: 'custom-class' } })
    expect(wrapper.classes()).toContain('custom-class')
  })

  it('uses tailwind-merge to resolve conflicting classes', () => {
    const wrapper = mount(Blockquote, { props: { class: 'my-10' } })
    expect(wrapper.classes()).toContain('my-10')
    expect(wrapper.classes()).not.toContain('my-6')
  })

  it('renders slot content', () => {
    const wrapper = mount(Blockquote, { slots: { default: 'A great quote here.' } })
    expect(wrapper.text()).toBe('A great quote here.')
  })
})
