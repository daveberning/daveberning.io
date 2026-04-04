import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { provideTheme, useTheme } from './useTheme'

function createStorage() {
  const values = new Map<string, string>()

  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => void values.set(key, value),
    removeItem: (key: string) => void values.delete(key),
    clear: () => void values.clear(),
    key: (index: number) => Array.from(values.keys())[index] ?? null,
    get length() {
      return values.size
    },
  } as Storage
}

function createMatchMedia(matches = false) {
  let changeHandler: ((event: MediaQueryListEvent) => void) | undefined

  return {
    media: '(prefers-color-scheme: dark)',
    matches,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
      if (event === 'change') changeHandler = handler
    }),
    removeEventListener: vi.fn((event: string, handler: (event: MediaQueryListEvent) => void) => {
      if (event === 'change' && changeHandler === handler) changeHandler = undefined
    }),
    dispatch(matches: boolean) {
      changeHandler?.({ matches } as MediaQueryListEvent)
    },
  }
}

function mountThemeHarness() {
  let provided: ReturnType<typeof provideTheme> | undefined

  const Consumer = defineComponent({
    setup() {
      const theme = useTheme()
      return () => h('div', { 'data-test': 'consumer' }, `${theme.color.value}:${String(theme.isDark.value)}`)
    },
  })

  const Provider = defineComponent({
    setup() {
      provided = provideTheme()
      return () => h('div', [h(Consumer)])
    },
  })

  const wrapper = mount(Provider)

  return {
    wrapper,
    context: provided!,
  }
}

describe('useTheme', () => {
  beforeEach(() => {
    vi.restoreAllMocks()
    vi.stubGlobal('localStorage', createStorage())
    document.documentElement.removeAttribute('data-theme')
    document.documentElement.classList.remove('dark')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('auto-provides when no parent provider is present', () => {
    const Consumer = defineComponent({
      setup() {
        const theme = useTheme()
        return () => h('div', `${theme.color.value}:${String(theme.isDark.value)}`)
      },
    })

    const wrapper = mount(Consumer)
    expect(wrapper.text()).toBe('teal:false')
  })

  it('reads persisted theme values on mount without subscribing to matchMedia changes', async () => {
    localStorage.setItem('theme:color', 'purple')
    localStorage.setItem('theme:dark', 'true')
    const mediaQuery = createMatchMedia(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { wrapper, context } = mountThemeHarness()
    await nextTick()

    expect(context.color.value).toBe('purple')
    expect(context.isDark.value).toBe(true)
    expect(wrapper.get('[data-test="consumer"]').text()).toBe('purple:true')
    expect(document.documentElement.getAttribute('data-theme')).toBe('purple')
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(mediaQuery.addEventListener).not.toHaveBeenCalled()
  })

  it('uses OS preference when no saved dark mode exists, responds to changes, and cleans up on unmount', async () => {
    const mediaQuery = createMatchMedia(true)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { wrapper, context } = mountThemeHarness()
    await nextTick()

    expect(context.color.value).toBe('teal')
    expect(context.isDark.value).toBe(true)
    expect(mediaQuery.addEventListener).toHaveBeenCalledWith('change', expect.any(Function))

    mediaQuery.dispatch(false)
    await nextTick()
    expect(context.isDark.value).toBe(false)
    expect(document.documentElement.classList.contains('dark')).toBe(false)

    localStorage.setItem('theme:dark', 'true')
    mediaQuery.dispatch(true)
    await nextTick()
    expect(context.isDark.value).toBe(false)

    wrapper.unmount()
    expect(mediaQuery.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function))
  })

  it('setColor updates the DOM and persists the selected color', async () => {
    const mediaQuery = createMatchMedia(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { context } = mountThemeHarness()
    await nextTick()

    context.setColor('green')

    expect(context.color.value).toBe('green')
    expect(document.documentElement.getAttribute('data-theme')).toBe('green')
    expect(localStorage.getItem('theme:color')).toBe('green')
    expect(localStorage.getItem('theme:dark')).toBe('false')
  })

  it('setColor skips DOM writes when document is unavailable', async () => {
    const mediaQuery = createMatchMedia(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { context } = mountThemeHarness()
    await nextTick()

    const originalDocument = globalThis.document
    // Force applyToDOM() through its document guard branch.
    vi.stubGlobal('document', undefined)

    context.setColor('red')

    expect(context.color.value).toBe('red')
    expect(localStorage.getItem('theme:color')).toBe('red')
    expect(localStorage.getItem('theme:dark')).toBe('false')

    vi.stubGlobal('document', originalDocument)
  })

  it('toggleDark updates the DOM and persists dark mode', async () => {
    const mediaQuery = createMatchMedia(false)
    vi.stubGlobal('matchMedia', vi.fn(() => mediaQuery))

    const { context } = mountThemeHarness()
    await nextTick()

    context.toggleDark()

    expect(context.isDark.value).toBe(true)
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    expect(localStorage.getItem('theme:color')).toBe('teal')
    expect(localStorage.getItem('theme:dark')).toBe('true')
  })
})
