import { defineComponent, h } from 'vue'
import { provideTheme } from '~/composables/useTheme'
import { mount } from '@vue/test-utils'

/**
 * Stub for NuxtPicture that renders a plain <img> so tests can assert on src/alt
 * and trigger native events (e.g. error) without a live Nuxt app instance.
 */
const NuxtPictureStub = defineComponent({
  props: ['src', 'alt', 'class'],
  emits: ['error'],
  setup(props, { emit }) {
    return () => h('img', {
      src: props.src,
      alt: props.alt,
      class: props.class,
      onError: () => emit('error'),
    })
  },
})

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
    global: {
      ...options.global,
      stubs: {
        NuxtPicture: NuxtPictureStub,
        ...options.global?.stubs,
      },
    },
  })

  return wrapper.findComponent(component as never)
}