import { ref, computed } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormSelect from './FormSelect.vue'

const isDarkRef       = ref(false)
const errorMessageRef = ref<string | undefined>(undefined)

vi.mock('~/composables/useThemeMode', () => ({
  useThemeMode: () => {
    return computed(() => isDarkRef.value ? 'dark' : 'light')
  }
}))

vi.mock('~/composables/useFormField', () => ({
  useFormField: (fieldName: string) => ({
    value:        ref(''),
    errorMessage: errorMessageRef,
    handleChange: vi.fn(),
    handleBlur:   vi.fn(),
    state:        computed(() => errorMessageRef.value ? 'error' : 'default'),
    inputId:      computed(() => `field-${fieldName}`),
    messageId:    computed(() => `field-${fieldName}-message`),
  })
}))

const DEFAULT_OPTIONS = ['Facebook', 'Instagram', 'LinkedIn', 'Google', 'Other']

function mountSelect({
  fieldName   = 'source',
  options     = DEFAULT_OPTIONS,
  placeholder = undefined as string | undefined,
  selectClass = undefined as string | undefined,
} = {}) {
  return mount(FormSelect, {
    props: {
      name:    fieldName,
      options,
      ...(placeholder && { placeholder }),
      ...(selectClass && { class: selectClass }),
    },
    global: { stubs: { NuxtIcon: true } },
  })
}

describe('FormSelect', () => {
  beforeEach(() => {
    isDarkRef.value       = false
    errorMessageRef.value = undefined
  })

  describe('default rendering', () => {
    it('renders a <select> element', () => {
      const wrapper = mountSelect()
      expect(wrapper.find('select').exists()).toBe(true)
    })

    it('has id matching field-{name}', () => {
      const wrapper = mountSelect({ fieldName: 'hearAboutMe' })
      expect(wrapper.find('select').attributes('id')).toBe('field-hearAboutMe')
    })

    it('has aria-describedby pointing to field-{name}-message', () => {
      const wrapper = mountSelect({ fieldName: 'hearAboutMe' })
      expect(wrapper.find('select').attributes('aria-describedby')).toBe('field-hearAboutMe-message')
    })

    it('does not have aria-invalid in default state', () => {
      const wrapper = mountSelect()
      expect(wrapper.find('select').attributes('aria-invalid')).toBeUndefined()
    })

    it('applies border-border in default state', () => {
      const wrapper = mountSelect()
      expect(wrapper.find('select').classes()).toContain('border-border')
    })

    it('applies appearance-none', () => {
      const wrapper = mountSelect()
      expect(wrapper.find('select').classes()).toContain('appearance-none')
    })
  })

  describe('options rendering', () => {
    it('renders one <option> per entry in options', () => {
      const wrapper = mountSelect()
      const options = wrapper.findAll('option')
      expect(options).toHaveLength(DEFAULT_OPTIONS.length)
    })

    it('renders option text for each value', () => {
      const wrapper = mountSelect()
      const texts = wrapper.findAll('option').map(o => o.text())
      expect(texts).toEqual(DEFAULT_OPTIONS)
    })

    it('renders a disabled placeholder option when placeholder is set', () => {
      const wrapper = mountSelect({ placeholder: 'Pick one' })
      const first = wrapper.findAll('option').at(0)
      expect(first?.text()).toBe('Pick one')
      expect(first?.attributes('disabled')).toBeDefined()
      expect(first?.attributes('value')).toBe('')
    })

    it('renders options after the placeholder', () => {
      const wrapper = mountSelect({ placeholder: 'Pick one' })
      const options = wrapper.findAll('option')
      expect(options).toHaveLength(DEFAULT_OPTIONS.length + 1)
    })
  })

  describe('props passthrough', () => {
    it('passes class prop through to the select element', () => {
      const wrapper = mountSelect({ selectClass: 'my-select-class' })
      expect(wrapper.find('select').classes()).toContain('my-select-class')
    })
  })

  describe('event handling', () => {
    it('does not throw when change event fires', async () => {
      const wrapper = mountSelect()
      await expect(wrapper.find('select').trigger('change')).resolves.not.toThrow()
    })

    it('does not throw when blur event fires', async () => {
      const wrapper = mountSelect()
      await expect(wrapper.find('select').trigger('blur')).resolves.not.toThrow()
    })
  })

  describe('error state', () => {
    it('has aria-invalid="true" when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountSelect()
      expect(wrapper.find('select').attributes('aria-invalid')).toBe('true')
    })

    it('applies border-brand-red in light mode when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountSelect()
      expect(wrapper.find('select').classes()).toContain('border-brand-red')
    })

    it('does not apply border-border in error state', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountSelect()
      expect(wrapper.find('select').classes()).not.toContain('border-border')
    })

    it('applies border-brand-red-light in dark mode when errorMessage is set', () => {
      isDarkRef.value       = true
      errorMessageRef.value = 'Required'
      const wrapper = mountSelect()
      expect(wrapper.find('select').classes()).toContain('border-brand-red-light')
    })
  })
})
