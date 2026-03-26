import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormInput from './FormInput.vue'

const isDarkRef      = ref(false)
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

function mountInput({
  fieldName   = 'email',
  type        = undefined as string | undefined,
  placeholder = undefined as string | undefined,
  inputClass  = undefined as string | undefined,
} = {}) {
  return mount(FormInput, {
    props: {
      name:        fieldName,
      ...(type        && { type }),
      ...(placeholder && { placeholder }),
      ...(inputClass  && { class: inputClass }),
    },
  })
}

describe('FormInput', () => {
  beforeEach(() => {
    isDarkRef.value       = false
    errorMessageRef.value = undefined
  })

  describe('default rendering', () => {
    it('renders an <input> element', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').exists()).toBe(true)
    })

    it('defaults to type="text"', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })

    it('has id matching field-{name}', () => {
      const wrapper = mountInput({ fieldName: 'username' })
      expect(wrapper.find('input').attributes('id')).toBe('field-username')
    })

    it('has aria-describedby pointing to field-{name}-message', () => {
      const wrapper = mountInput({ fieldName: 'username' })
      expect(wrapper.find('input').attributes('aria-describedby')).toBe('field-username-message')
    })

    it('does not have aria-invalid in default state', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('aria-invalid')).toBeUndefined()
    })

    it('applies border-border in default state', () => {
      const wrapper = mountInput()
      expect(wrapper.find('input').classes()).toContain('border-border')
    })
  })

  describe('props passthrough', () => {
    it('passes type prop through', () => {
      const wrapper = mountInput({ type: 'email' })
      expect(wrapper.find('input').attributes('type')).toBe('email')
    })

    it('passes placeholder prop through', () => {
      const wrapper = mountInput({ placeholder: 'Enter your email' })
      expect(wrapper.find('input').attributes('placeholder')).toBe('Enter your email')
    })

    it('passes class prop through', () => {
      const wrapper = mountInput({ inputClass: 'my-input-class' })
      expect(wrapper.find('input').classes()).toContain('my-input-class')
    })
  })

  describe('event handling', () => {
    it('does not throw when change event fires', async () => {
      const wrapper = mountInput()
      await expect(wrapper.find('input').trigger('change')).resolves.not.toThrow()
    })

    it('does not throw when blur event fires', async () => {
      const wrapper = mountInput()
      await expect(wrapper.find('input').trigger('blur')).resolves.not.toThrow()
    })
  })

  describe('error state', () => {
    it('has aria-invalid="true" when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountInput()
      expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
    })

    it('applies border-brand-red in light mode when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountInput()
      expect(wrapper.find('input').classes()).toContain('border-brand-red')
    })

    it('does not apply border-border in error state', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountInput()
      expect(wrapper.find('input').classes()).not.toContain('border-border')
    })

    it('applies border-brand-red-light in dark mode when errorMessage is set', () => {
      isDarkRef.value       = true
      errorMessageRef.value = 'Required'
      const wrapper = mountInput()
      expect(wrapper.find('input').classes()).toContain('border-brand-red-light')
    })
  })
})
