import { defineComponent, h } from 'vue'
import { provideTheme } from '~/composables/useTheme'
import { mount } from '@vue/test-utils'

/**
 * A simple wrapper component that provides the theme context to its children.
 * Useful for testing components that rely on the theme context.
 */
const ThemeProvider = defineComponent({
  setup(_, {slots}) {
    provideTheme()
    return () => slots.default?.()
  },
})

/**
 * Ensure that localStorage is mocked in the test environment, since some components rely on it for theme persistence.
 */
function ensureStorageMocks() {
  const storage = globalThis.localStorage as Partial<Storage> | undefined
  if (storage?.getItem && storage?.setItem && storage?.removeItem && storage?.clear) return

  const values = new Map<string, string>()
  globalThis.localStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => void values.set(key, String(value)),
    removeItem: key => void values.delete(key),
    clear: () => void values.clear(),
    key: index => Array.from(values.keys())[index] ?? null,
    get length() {
      return values.size
    },
  } as Storage
}

/**
 * Mount a component with the ThemeProvider to ensure it has access to the theme context.
 * @param component
 * @param options
 */
export function mountWithTheme(component: unknown, options: Parameters<typeof mount>[1] = {}) {
  ensureStorageMocks()

  const wrapper = mount(ThemeProvider, {
    slots: {
      default: () => h(component as never, options?.props ?? {}, options?.slots ?? {}),
    },
    global: options.global,
  })

  return wrapper.findComponent(component as never)
}