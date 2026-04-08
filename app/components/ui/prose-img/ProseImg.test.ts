import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ProseImg from './ProseImg.vue'

describe('ProseImg', () => {
  describe('structure', () => {
    it('renders a <figure> element', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: 'Test image' } })
      expect(wrapper.element.tagName).toBe('FIGURE')
    })

    it('renders an <img> with the correct src', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: 'Test image' } })
      const img = wrapper.find('img')
      expect(img.exists()).toBe(true)
      expect(img.attributes('src')).toBe('/img/test.jpg')
    })

    it('renders an <img> with the correct alt attribute', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: 'Test image' } })
      const img = wrapper.find('img')
      expect(img.attributes('alt')).toBe('Test image')
    })

    it('renders <figcaption> with the alt text when alt is non-empty', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: 'Caption text' } })
      const caption = wrapper.find('figcaption')
      expect(caption.exists()).toBe(true)
      expect(caption.text()).toBe('Caption text')
    })

    it('does not render <figcaption> when alt is an empty string', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      expect(wrapper.find('figcaption').exists()).toBe(false)
    })
  })

  describe('align variants', () => {
    it('defaults to center align — applies my-6, block, mx-auto, max-w-2xl, and w-full', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      const classes = wrapper.classes()
      expect(classes).toContain('my-6')
      expect(classes).toContain('block')
      expect(classes).toContain('mx-auto')
      expect(classes).toContain('max-w-2xl')
      expect(classes).toContain('w-full')
    })

    it('center align does not apply float classes', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '', align: 'center' } })
      expect(wrapper.classes()).not.toContain('sm:float-left')
      expect(wrapper.classes()).not.toContain('sm:float-right')
    })

    it('align="full" applies block and w-full', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '', align: 'full' } })
      const classes = wrapper.classes()
      expect(classes).toContain('block')
      expect(classes).toContain('w-full')
    })

    it('align="full" does not apply mx-auto or max-w-2xl', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '', align: 'full' } })
      expect(wrapper.classes()).not.toContain('mx-auto')
      expect(wrapper.classes()).not.toContain('max-w-2xl')
    })

    it('align="left" applies block, w-full, and sm:float-left', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '', align: 'left' } })
      const classes = wrapper.classes()
      expect(classes).toContain('block')
      expect(classes).toContain('w-full')
      expect(classes).toContain('sm:float-left')
    })

    it('align="right" applies block, w-full, and sm:float-right', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '', align: 'right' } })
      const classes = wrapper.classes()
      expect(classes).toContain('block')
      expect(classes).toContain('w-full')
      expect(classes).toContain('sm:float-right')
    })
  })

  describe('image classes', () => {
    it('always applies rounded-lg to the img element', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      expect(wrapper.find('img').classes()).toContain('rounded-lg')
    })

    it('always applies border to the img element', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      expect(wrapper.find('img').classes()).toContain('border')
    })

    it('always applies border-border to the img element', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      expect(wrapper.find('img').classes()).toContain('border-border')
    })

    it('always applies w-full to the img element', () => {
      const wrapper = mount(ProseImg, { props: { src: '/img/test.jpg', alt: '' } })
      expect(wrapper.find('img').classes()).toContain('w-full')
    })
  })

  describe('class prop', () => {
    it('passes through an extra class onto the figure element', () => {
      const wrapper = mount(ProseImg, {
        props: { src: '/img/test.jpg', alt: '', class: 'extra-class' },
      })
      expect(wrapper.classes()).toContain('extra-class')
    })

    it('uses tailwind-merge to resolve conflicting classes on the figure', () => {
      const wrapper = mount(ProseImg, {
        props: { src: '/img/test.jpg', alt: '', class: 'my-0' },
      })
      expect(wrapper.classes()).toContain('my-0')
      expect(wrapper.classes()).not.toContain('my-6')
    })
  })
})
