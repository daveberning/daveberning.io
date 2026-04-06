import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CodeBlockLabel from './CodeBlockLabel.vue'

describe('CodeBlockLabel', () => {
  describe('agent="none"', () => {
    it('renders nothing when agent is "none"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'none' },
      })
      expect(wrapper.find('p').exists()).toBe(false)
    })
  })

  describe('agent display names', () => {
    it('shows "Front-end Software Engineer" for agent="front-end-software-engineer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'front-end-software-engineer' },
      })
      expect(wrapper.text()).toContain('Front-end Software Engineer')
    })

    it('shows "QA Engineer" for agent="qa-engineer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'qa-engineer' },
      })
      expect(wrapper.text()).toContain('QA Engineer')
    })

    it('shows "SEO Copywriter" for agent="seo-copywriter"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'seo-copywriter' },
      })
      expect(wrapper.text()).toContain('SEO Copywriter')
    })

    it('shows "UI/UX Designer" for agent="ui-designer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'ui-designer' },
      })
      expect(wrapper.text()).toContain('UI/UX Designer')
    })
  })

  describe('agent color classes', () => {
    it('applies a cyan label background with white bold text for agent="front-end-software-engineer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'front-end-software-engineer' },
      })
      const label = wrapper.find('p')
      expect(label.classes()).toContain('bg-cyan-400')
      expect(label.classes()).toContain('text-white')
      expect(label.classes()).toContain('font-bold')
    })

    it('applies a green label background for agent="qa-engineer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'qa-engineer' },
      })
      const label = wrapper.find('p')
      expect(label.classes()).toContain('bg-green-500')
      expect(label.classes()).toContain('text-white')
    })

    it('applies an amber label background for agent="seo-copywriter"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'seo-copywriter' },
      })
      const label = wrapper.find('p')
      expect(label.classes()).toContain('bg-pink-500')
      expect(label.classes()).toContain('text-white')
    })

    it('applies a pink label background for agent="ui-designer"', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'ui-designer' },
      })
      const label = wrapper.find('p')
      expect(label.classes()).toContain('bg-amber-400')
      expect(label.classes()).toContain('text-white')
    })
  })

  describe('class prop', () => {
    it('merges custom classes onto the label wrapper', () => {
      const wrapper = mount(CodeBlockLabel, {
        props: { agent: 'qa-engineer', class: 'my-label-class' },
      })
      expect(wrapper.find('p').classes()).toContain('my-label-class')
    })
  })
})
