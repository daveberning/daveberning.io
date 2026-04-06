import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import CodeBlockCopyButton from './CodeBlockCopyButton.vue'

const IconStub = { props: ['name', 'size'], template: '<span :data-icon="name" />' }
const globalStubs = { Icon: IconStub, NuxtIcon: IconStub }

beforeEach(() => {
  vi.stubGlobal('navigator', {
    clipboard: {
      writeText: vi.fn().mockResolvedValue(undefined),
    },
  })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('CodeBlockCopyButton', () => {
  describe('default rendering', () => {
    it('renders a <button> element', () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.element.tagName).toBe('BUTTON')
    })

    it('has aria-label="Copy code to clipboard" by default', () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.attributes('aria-label')).toBe('Copy code to clipboard')
    })

    it('shows copy icon by default', () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.find('[data-icon="lucide:copy"]').exists()).toBe(true)
      expect(wrapper.find('[data-icon="lucide:check"]').exists()).toBe(false)
    })

    it('shows "Copy" label text by default', () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.text()).toContain('Copy')
    })
  })

  describe('click — copy interaction', () => {
    it('calls navigator.clipboard.writeText with the code prop on click', async () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1')
    })

    it('shows check icon immediately after click', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-icon="lucide:check"]').exists()).toBe(true)
      expect(wrapper.find('[data-icon="lucide:copy"]').exists()).toBe(false)
      vi.useRealTimers()
    })

    it('updates aria-label to "Copied" after click', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.attributes('aria-label')).toBe('Copied')
      vi.useRealTimers()
    })

    it('shows "Copied" label text after click', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain('Copied')
      vi.useRealTimers()
    })

    it('reverts back to copy icon after 2 seconds', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      vi.advanceTimersByTime(2000)
      await wrapper.vm.$nextTick()
      expect(wrapper.find('[data-icon="lucide:copy"]').exists()).toBe(true)
      expect(wrapper.find('[data-icon="lucide:check"]').exists()).toBe(false)
      vi.useRealTimers()
    })

    it('reverts aria-label to "Copy code to clipboard" after 2 seconds', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      vi.advanceTimersByTime(2000)
      await wrapper.vm.$nextTick()
      expect(wrapper.attributes('aria-label')).toBe('Copy code to clipboard')
      vi.useRealTimers()
    })
  })

  describe('class prop', () => {
    it('merges custom classes onto the button', () => {
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1', class: 'my-copy-class' },
        global: { stubs: globalStubs },
      })
      expect(wrapper.classes()).toContain('my-copy-class')
    })
  })

  describe('cleanup on unmount', () => {
    it('does not throw when unmounted while copy timer is active', async () => {
      vi.useFakeTimers()
      const wrapper = mount(CodeBlockCopyButton, {
        props: { code: 'const x = 1' },
        global: { stubs: globalStubs },
      })
      await wrapper.trigger('click')
      await wrapper.vm.$nextTick()
      expect(() => wrapper.unmount()).not.toThrow()
      vi.useRealTimers()
    })
  })
})
