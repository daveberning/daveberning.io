import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useThemeMode } from './useThemeMode'

const isDarkRef = ref(false)

vi.mock('./useTheme', () => ({
  useTheme: () => ({
    isDark: isDarkRef,
    color: ref('teal'),
    setColor: vi.fn(),
    toggleDark: vi.fn(),
  }),
}))

describe('useThemeMode', () => {
  it('returns a computed ref with value property', () => {
    const mode = useThemeMode()

    expect(mode).toBeDefined()
    expect(mode.value).toBeDefined()
    expect(typeof mode.value).toBe('string')
  })

  it('returns "light" when isDark is false', () => {
    isDarkRef.value = false
    const mode = useThemeMode()

    expect(mode.value).toBe('light')
  })

  it('returns "dark" when isDark is true', () => {
    isDarkRef.value = true
    const mode = useThemeMode()

    expect(mode.value).toBe('dark')
  })

  it('is reactive to isDark changes', () => {
    isDarkRef.value = false
    const mode = useThemeMode()

    expect(mode.value).toBe('light')

    isDarkRef.value = true
    expect(mode.value).toBe('dark')

    isDarkRef.value = false
    expect(mode.value).toBe('light')
  })

  it('can be used multiple times independently', () => {
    isDarkRef.value = false
    const mode1 = useThemeMode()
    const mode2 = useThemeMode()

    expect(mode1.value).toBe('light')
    expect(mode2.value).toBe('light')

    isDarkRef.value = true

    expect(mode1.value).toBe('dark')
    expect(mode2.value).toBe('dark')
  })
})
