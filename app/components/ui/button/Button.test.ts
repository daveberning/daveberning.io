import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Button from './Button.vue'

describe('Button', () => {
  describe('default rendering', () => {
    it('renders a <button> element by default', () => {
      const wrapper = mount(Button)
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('renders slot content', () => {
      const wrapper = mount(Button, { slots: { default: 'Click me' } })
      expect(wrapper.text()).toBe('Click me')
    })

    it('applies default variant and size classes', () => {
      const wrapper = mount(Button)
      const classes = wrapper.classes()
      expect(classes).toContain('bg-primary')
      expect(classes).toContain('h-10')
      expect(classes).toContain('px-4')
    })
  })

  describe('variant prop', () => {
    it('applies destructive variant classes', () => {
      const wrapper = mount(Button, { props: { variant: 'destructive' } })
      expect(wrapper.classes()).toContain('bg-destructive')
    })

    it('applies outline variant classes', () => {
      const wrapper = mount(Button, { props: { variant: 'outline' } })
      expect(wrapper.classes()).toContain('border')
      expect(wrapper.classes()).toContain('bg-background')
    })

    it('applies secondary variant classes', () => {
      const wrapper = mount(Button, { props: { variant: 'secondary' } })
      expect(wrapper.classes()).toContain('bg-secondary')
    })

    it('applies ghost variant classes', () => {
      const wrapper = mount(Button, { props: { variant: 'ghost' } })
      expect(wrapper.classes()).toContain('hover:bg-accent')
    })

    it('applies link variant classes', () => {
      const wrapper = mount(Button, { props: { variant: 'link' } })
      expect(wrapper.classes()).toContain('underline-offset-4')
    })
  })

  describe('size prop', () => {
    it('applies sm size classes', () => {
      const wrapper = mount(Button, { props: { size: 'sm' } })
      expect(wrapper.classes()).toContain('h-9')
      expect(wrapper.classes()).toContain('px-3')
    })

    it('applies lg size classes', () => {
      const wrapper = mount(Button, { props: { size: 'lg' } })
      expect(wrapper.classes()).toContain('h-11')
      expect(wrapper.classes()).toContain('px-8')
    })

    it('applies icon size classes', () => {
      const wrapper = mount(Button, { props: { size: 'icon' } })
      expect(wrapper.classes()).toContain('h-10')
      expect(wrapper.classes()).toContain('w-10')
    })
  })

  describe('as prop', () => {
    it('renders as an <a> element when as="a"', () => {
      const wrapper = mount(Button, { props: { as: 'a' } })
      expect(wrapper.element.tagName).toBe('A')
    })

    it('renders as a <div> element when as="div"', () => {
      const wrapper = mount(Button, { props: { as: 'div' } })
      expect(wrapper.element.tagName).toBe('DIV')
    })
  })

  describe('class prop', () => {
    it('merges a custom class onto the element', () => {
      const wrapper = mount(Button, { props: { class: 'my-custom-class' } })
      expect(wrapper.classes()).toContain('my-custom-class')
    })

    it('uses tailwind-merge to resolve conflicting classes', () => {
      const wrapper = mount(Button, { props: { class: 'px-10' } })
      // px-10 should win over the default px-4 py-2 from size=default
      expect(wrapper.classes()).toContain('px-10')
      expect(wrapper.classes()).not.toContain('px-4')
    })
  })
})
