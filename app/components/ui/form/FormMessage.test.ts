import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormMessage from './FormMessage.vue'

const isDarkRef       = ref(false)
const errorMessageRef = ref<string | undefined>(undefined)

vi.mock('~/composables/useTheme', () => ({
  useTheme: () => ({
    isDark:     isDarkRef,
    color:      ref('teal'),
    setColor:   vi.fn(),
    toggleDark: vi.fn(),
  }),
}))

vi.mock('vee-validate', () => ({
  useField: () => ({
    value:        ref(''),
    errorMessage: errorMessageRef,
    handleChange: vi.fn(),
    handleBlur:   vi.fn(),
  }),
}))

function mountMessage({
  fieldName    = 'email',
  messageClass = undefined as string | undefined,
} = {}) {
  return mount(FormMessage, {
    props: { name: fieldName, ...(messageClass && { class: messageClass }) },
  })
}

describe('FormMessage', () => {
  beforeEach(() => {
    isDarkRef.value       = false
    errorMessageRef.value = undefined
  })

  describe('default rendering', () => {
    it('renders a <span> element', () => {
      const wrapper = mountMessage()
      expect(wrapper.find('span').exists()).toBe(true)
    })

    it('has id matching field-{name}-message', () => {
      const wrapper = mountMessage({ fieldName: 'phone' })
      expect(wrapper.find('span').attributes('id')).toBe('field-phone-message')
    })

    it('has role="alert"', () => {
      const wrapper = mountMessage()
      expect(wrapper.find('span').attributes('role')).toBe('alert')
    })

    it('has aria-live="polite"', () => {
      const wrapper = mountMessage()
      expect(wrapper.find('span').attributes('aria-live')).toBe('polite')
    })

    it('applies text-transparent in default state', () => {
      const wrapper = mountMessage()
      expect(wrapper.find('span').classes()).toContain('text-transparent')
    })

    it('renders empty text in default state', () => {
      const wrapper = mountMessage()
      expect(wrapper.find('span').text()).toBe('')
    })

    it('passes class prop through', () => {
      const wrapper = mountMessage({ messageClass: 'my-message-class' })
      expect(wrapper.find('span').classes()).toContain('my-message-class')
    })
  })

  describe('error state', () => {
    it('shows error message text when errorMessage is set', () => {
      errorMessageRef.value = 'This field is required'
      const wrapper = mountMessage()
      expect(wrapper.find('span').text()).toBe('This field is required')
    })

    it('applies text-brand-red in light mode when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountMessage()
      expect(wrapper.find('span').classes()).toContain('text-brand-red')
    })

    it('does not apply text-transparent in error state', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountMessage()
      expect(wrapper.find('span').classes()).not.toContain('text-transparent')
    })

    it('applies text-brand-red-light in dark mode when errorMessage is set', () => {
      isDarkRef.value       = true
      errorMessageRef.value = 'Required'
      const wrapper = mountMessage()
      expect(wrapper.find('span').classes()).toContain('text-brand-red-light')
    })
  })
})
