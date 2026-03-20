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

    it('applies default solid+teal+regular+regular classes', () => {
      const wrapper = mount(Button)
      const classes = wrapper.classes()
      expect(classes).toContain('bg-teal-600')
      expect(classes).toContain('text-white')
      expect(classes).toContain('h-10')
      expect(classes).toContain('px-4')
      expect(classes).toContain('rounded-md')
    })
  })

  describe('color prop', () => {
    it('applies teal solid classes', () => {
      const wrapper = mount(Button, { props: { color: 'teal' } })
      expect(wrapper.classes()).toContain('bg-teal-600')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies purple solid classes', () => {
      const wrapper = mount(Button, { props: { color: 'purple' } })
      expect(wrapper.classes()).toContain('bg-purple-600')
    })

    it('applies red solid classes', () => {
      const wrapper = mount(Button, { props: { color: 'red' } })
      expect(wrapper.classes()).toContain('bg-red-600')
    })

    it('applies green solid classes', () => {
      const wrapper = mount(Button, { props: { color: 'green' } })
      expect(wrapper.classes()).toContain('bg-green-600')
    })

    it('applies blue solid classes', () => {
      const wrapper = mount(Button, { props: { color: 'blue' } })
      expect(wrapper.classes()).toContain('bg-blue-700')
    })
  })

  describe('variant prop', () => {
    it('applies solid variant — filled background', () => {
      const wrapper = mount(Button, { props: { variant: 'solid', color: 'teal' } })
      expect(wrapper.classes()).toContain('bg-teal-600')
      expect(wrapper.classes()).toContain('text-white')
    })

    it('applies outline variant — border and transparent background', () => {
      const wrapper = mount(Button, { props: { variant: 'outline', color: 'teal' } })
      const classes = wrapper.classes()
      expect(classes).toContain('border-2')
      expect(classes).toContain('bg-transparent')
      expect(classes).toContain('border-teal-600')
      expect(classes).toContain('text-teal-600')
    })

    it('applies text variant — no border, transparent background', () => {
      const wrapper = mount(Button, { props: { variant: 'text', color: 'teal' } })
      const classes = wrapper.classes()
      expect(classes).toContain('bg-transparent')
      expect(classes).toContain('text-teal-600')
      expect(classes).not.toContain('border-2')
    })

    it('outline purple has correct color classes', () => {
      const wrapper = mount(Button, { props: { variant: 'outline', color: 'purple' } })
      expect(wrapper.classes()).toContain('border-purple-600')
      expect(wrapper.classes()).toContain('text-purple-600')
    })

    it('text red has correct color class', () => {
      const wrapper = mount(Button, { props: { variant: 'text', color: 'red' } })
      expect(wrapper.classes()).toContain('text-red-600')
    })
  })

  describe('size prop', () => {
    it('applies small size classes', () => {
      const wrapper = mount(Button, { props: { size: 'small' } })
      const classes = wrapper.classes()
      expect(classes).toContain('h-8')
      expect(classes).toContain('px-3')
      expect(classes).toContain('text-xs')
    })

    it('applies regular size classes', () => {
      const wrapper = mount(Button, { props: { size: 'regular' } })
      const classes = wrapper.classes()
      expect(classes).toContain('h-10')
      expect(classes).toContain('px-4')
      expect(classes).toContain('text-sm')
    })

    it('applies large size classes', () => {
      const wrapper = mount(Button, { props: { size: 'large' } })
      const classes = wrapper.classes()
      expect(classes).toContain('h-12')
      expect(classes).toContain('px-6')
      expect(classes).toContain('text-base')
    })
  })

  describe('radius prop', () => {
    it('applies small radius', () => {
      const wrapper = mount(Button, { props: { radius: 'small' } })
      expect(wrapper.classes()).toContain('rounded-sm')
    })

    it('applies regular radius', () => {
      const wrapper = mount(Button, { props: { radius: 'regular' } })
      expect(wrapper.classes()).toContain('rounded-md')
    })

    it('applies full radius', () => {
      const wrapper = mount(Button, { props: { radius: 'full' } })
      expect(wrapper.classes()).toContain('rounded-full')
    })

    it('applies none radius', () => {
      const wrapper = mount(Button, { props: { radius: 'none' } })
      expect(wrapper.classes()).toContain('rounded-none')
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
      expect(wrapper.classes()).toContain('px-10')
      expect(wrapper.classes()).not.toContain('px-4')
    })
  })
})
