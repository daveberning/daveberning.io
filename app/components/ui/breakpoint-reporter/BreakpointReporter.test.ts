import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import { getBreakpointLabel } from '.'
import BreakpointReporter from './BreakpointReporter.vue'

describe('getBreakpointLabel', () => {
  it('returns XS for width below 640', () => {
    expect(getBreakpointLabel(0)).toBe('XS')
    expect(getBreakpointLabel(320)).toBe('XS')
    expect(getBreakpointLabel(639)).toBe('XS')
  })

  it('returns XS for negative width', () => {
    expect(getBreakpointLabel(-1)).toBe('XS')
  })

  it('returns SM for width 640-767', () => {
    expect(getBreakpointLabel(640)).toBe('SM')
    expect(getBreakpointLabel(767)).toBe('SM')
  })

  it('returns MD for width 768-1023', () => {
    expect(getBreakpointLabel(768)).toBe('MD')
    expect(getBreakpointLabel(1023)).toBe('MD')
  })

  it('returns LG for width 1024-1279', () => {
    expect(getBreakpointLabel(1024)).toBe('LG')
    expect(getBreakpointLabel(1279)).toBe('LG')
  })

  it('returns XL for width 1280-1535', () => {
    expect(getBreakpointLabel(1280)).toBe('XL')
    expect(getBreakpointLabel(1535)).toBe('XL')
  })

  it('returns 2XL for width 1536 and above', () => {
    expect(getBreakpointLabel(1536)).toBe('2XL')
    expect(getBreakpointLabel(2560)).toBe('2XL')
  })
})

describe('BreakpointReporter', () => {
  beforeEach(() => {
    vi.stubGlobal('innerWidth', 1024)
  })

  async function mountReporter(props: Record<string, unknown> = {}) {
    const wrapper = mount(BreakpointReporter, { props: { dev: true, ...props } })
    await nextTick()
    return wrapper
  }

  describe('when dev is false', () => {
    it('does not render anything', async () => {
      const wrapper = mount(BreakpointReporter, { props: { dev: false } })
      await nextTick()
      expect(wrapper.find('div').exists()).toBe(false)
      expect(wrapper.text()).toBe('')
    })
  })

  describe('when dev is true', () => {
    it('renders the breakpoint label', async () => {
      const wrapper = await mountReporter()
      expect(wrapper.find('div').exists()).toBe(true)
      expect(wrapper.text()).toBe('LG')
    })

    it('applies fixed positioning classes', async () => {
      const wrapper = await mountReporter()
      const classes = wrapper.find('div').classes()
      expect(classes).toContain('fixed')
      expect(classes).toContain('right-0')
      expect(classes).toContain('top-1/4')
      expect(classes).toContain('-translate-y-1/2')
    })

    it('applies visual styling classes', async () => {
      const wrapper = await mountReporter()
      const classes = wrapper.find('div').classes()
      expect(classes).toContain('text-white')
      expect(classes).toContain('rounded-l-md')
    })

    it('has aria-hidden attribute', async () => {
      const wrapper = await mountReporter()
      expect(wrapper.find('div').attributes('aria-hidden')).toBe('true')
    })

    it('merges custom class prop', async () => {
      const wrapper = await mountReporter({ class: 'my-custom' })
      expect(wrapper.find('div').classes()).toContain('my-custom')
    })

    it('shows XS for small window widths', async () => {
      vi.stubGlobal('innerWidth', 320)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('XS')
    })

    it('shows SM for 640px window width', async () => {
      vi.stubGlobal('innerWidth', 640)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('SM')
    })

    it('shows MD for 768px window width', async () => {
      vi.stubGlobal('innerWidth', 768)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('MD')
    })

    it('shows XL for 1280px window width', async () => {
      vi.stubGlobal('innerWidth', 1280)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('XL')
    })

    it('shows 2XL for 1536px window width', async () => {
      vi.stubGlobal('innerWidth', 1536)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('2XL')
    })

    it('updates label on window resize', async () => {
      vi.stubGlobal('innerWidth', 1024)
      const wrapper = await mountReporter()
      expect(wrapper.text()).toBe('LG')

      vi.stubGlobal('innerWidth', 640)
      window.dispatchEvent(new Event('resize'))
      await nextTick()
      expect(wrapper.text()).toBe('SM')
    })

    it('removes resize listener on unmount', async () => {
      const removeSpy = vi.spyOn(window, 'removeEventListener')
      const wrapper = await mountReporter()
      wrapper.unmount()
      expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function))
      removeSpy.mockRestore()
    })
  })
})
