import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Track the onUnmounted callback
let unmountedCallback: (() => void) | null = null
let injectReturnValue: unknown = undefined

vi.mock('vue', async () => {
  const actual = await vi.importActual<typeof import('vue')>('vue')
  return {
    ...actual,
    onUnmounted: (cb: () => void) => {
      unmountedCallback = cb
    },
    inject: () => injectReturnValue,
    provide: vi.fn(),
  }
})

import { provideMobileNav, useMobileNav } from './useMobileNav'

describe('provideMobileNav', () => {
  let addEventSpy: ReturnType<typeof vi.spyOn>
  let removeEventSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    unmountedCallback = null
    injectReturnValue = undefined
    addEventSpy = vi.spyOn(window, 'addEventListener')
    removeEventSpy = vi.spyOn(window, 'removeEventListener')
    // Reset body styles
    document.body.style.removeProperty('overflow')
    document.body.style.removeProperty('position')
    document.body.style.removeProperty('top')
    document.body.style.removeProperty('width')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns isOpen as false initially', () => {
    const { isOpen } = provideMobileNav()
    expect(isOpen.value).toBe(false)
  })

  it('opens the drawer and locks scroll', () => {
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(100)
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const { open, isOpen } = provideMobileNav()
    open()

    expect(isOpen.value).toBe(true)
    expect(document.body.style.overflow).toBe('hidden')
    expect(document.body.style.position).toBe('fixed')
    expect(document.body.style.top).toBe('-100px')
    expect(document.body.style.width).toBe('100%')

    scrollToSpy.mockRestore()
  })

  it('does not re-open when already open', () => {
    const { open, isOpen } = provideMobileNav()
    open()
    expect(isOpen.value).toBe(true)

    // Calling open again should be a no-op
    open()
    expect(isOpen.value).toBe(true)
  })

  it('closes the drawer and unlocks scroll', () => {
    const scrollToSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(200)

    const { open, close, isOpen } = provideMobileNav()
    open()
    close()

    expect(isOpen.value).toBe(false)
    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.position).toBe('')
    expect(document.body.style.top).toBe('')
    expect(document.body.style.width).toBe('')
    expect(scrollToSpy).toHaveBeenCalledWith(0, 200)

    scrollToSpy.mockRestore()
  })

  it('does not re-close when already closed', () => {
    const { close, isOpen } = provideMobileNav()
    expect(isOpen.value).toBe(false)

    // Calling close when already closed should be a no-op
    close()
    expect(isOpen.value).toBe(false)
  })

  it('toggle opens when closed', () => {
    const { toggle, isOpen } = provideMobileNav()
    toggle()
    expect(isOpen.value).toBe(true)
  })

  it('toggle closes when open', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { toggle, isOpen } = provideMobileNav()
    toggle()
    expect(isOpen.value).toBe(true)
    toggle()
    expect(isOpen.value).toBe(false)
  })

  it('closes on Escape key press', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { open, isOpen } = provideMobileNav()
    open()

    // Find the keydown handler
    const keydownCall = addEventSpy.mock.calls.find((c: unknown[]) => c[0] === 'keydown')
    expect(keydownCall).toBeTruthy()

    const handler = keydownCall![1] as EventListener
    handler(new KeyboardEvent('keydown', { key: 'Escape' }))

    expect(isOpen.value).toBe(false)
  })

  it('does not close on non-Escape key press', () => {
    const { open, isOpen } = provideMobileNav()
    open()

    const keydownCall = addEventSpy.mock.calls.find((c: unknown[]) => c[0] === 'keydown')
    const handler = keydownCall![1] as EventListener
    handler(new KeyboardEvent('keydown', { key: 'Enter' }))

    expect(isOpen.value).toBe(true)
  })

  it('closes when window resizes to >= 768px', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { open, isOpen } = provideMobileNav()
    open()

    const resizeCall = addEventSpy.mock.calls.find((c: unknown[]) => c[0] === 'resize')
    expect(resizeCall).toBeTruthy()

    // Simulate resize to desktop width
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(768)
    const handler = resizeCall![1] as EventListener
    handler(new Event('resize'))

    expect(isOpen.value).toBe(false)
  })

  it('does not close when window resizes but stays below 768px', () => {
    const { open, isOpen } = provideMobileNav()
    open()

    const resizeCall = addEventSpy.mock.calls.find((c: unknown[]) => c[0] === 'resize')
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(767)
    const handler = resizeCall![1] as EventListener
    handler(new Event('resize'))

    expect(isOpen.value).toBe(true)
  })

  it('removes event listeners on close', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { open, close } = provideMobileNav()
    open()
    close()

    expect(removeEventSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeEventSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('skips listener removal when open fails before listeners are created', () => {
    vi.spyOn(window, 'scrollY', 'get').mockImplementation(() => {
      throw new Error('scroll unavailable')
    })
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})

    const { open, close, isOpen } = provideMobileNav()

    expect(() => open()).toThrow('scroll unavailable')
    expect(isOpen.value).toBe(true)

    close()

    expect(isOpen.value).toBe(false)
    const removeKeydown = removeEventSpy.mock.calls.filter((c: unknown[]) => c[0] === 'keydown')
    const removeResize = removeEventSpy.mock.calls.filter((c: unknown[]) => c[0] === 'resize')
    expect(removeKeydown).toHaveLength(0)
    expect(removeResize).toHaveLength(0)
  })

  it('cleans up on unmount when open', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    const { open } = provideMobileNav()
    open()

    expect(unmountedCallback).not.toBeNull()
    unmountedCallback!()

    expect(document.body.style.overflow).toBe('')
    expect(removeEventSpy).toHaveBeenCalledWith('keydown', expect.any(Function))
    expect(removeEventSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })

  it('does not clean up on unmount when closed', () => {
    vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
    provideMobileNav()

    expect(unmountedCallback).not.toBeNull()
    unmountedCallback!()

    // Should not have tried to remove listeners (none were added)
    const removeKeydown = removeEventSpy.mock.calls.filter((c: unknown[]) => c[0] === 'keydown')
    const removeResize = removeEventSpy.mock.calls.filter((c: unknown[]) => c[0] === 'resize')
    expect(removeKeydown).toHaveLength(0)
    expect(removeResize).toHaveLength(0)
  })
})

describe('useMobileNav', () => {
  it('throws when no provider is present', () => {
    expect(() => useMobileNav()).toThrow('[useMobileNav] Missing provider')
  })

  it('returns the injected context when provider is present', () => {
    const mockContext = { isOpen: { value: false }, open: vi.fn(), close: vi.fn(), toggle: vi.fn() }
    injectReturnValue = mockContext
    const result = useMobileNav()
    expect(result).toBe(mockContext)
  })
})
