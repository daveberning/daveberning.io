import { ref, computed } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, beforeEach } from 'vitest'
import FormTextArea from './FormTextArea.vue'

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

function mountTextArea({
  fieldName   = 'message',
  rows        = undefined as number | undefined,
  placeholder = undefined as string | undefined,
  areaClass   = undefined as string | undefined,
} = {}) {
  return mount(FormTextArea, {
    props: {
      name:        fieldName,
      ...(rows        !== undefined && { rows }),
      ...(placeholder && { placeholder }),
      ...(areaClass   && { class: areaClass }),
    },
  })
}

describe('FormTextArea', () => {
  beforeEach(() => {
    isDarkRef.value       = false
    errorMessageRef.value = undefined
  })

  describe('default rendering', () => {
    it('renders a <textarea> element', () => {
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').exists()).toBe(true)
    })

    it('has id matching field-{name}', () => {
      const wrapper = mountTextArea({ fieldName: 'bio' })
      expect(wrapper.find('textarea').attributes('id')).toBe('field-bio')
    })

    it('has aria-describedby pointing to field-{name}-message', () => {
      const wrapper = mountTextArea({ fieldName: 'bio' })
      expect(wrapper.find('textarea').attributes('aria-describedby')).toBe('field-bio-message')
    })

    it('does not have aria-invalid in default state', () => {
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').attributes('aria-invalid')).toBeUndefined()
    })

    it('applies border-border in default state', () => {
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').classes()).toContain('border-border')
    })
  })

  describe('props passthrough', () => {
    it('passes rows prop through', () => {
      const wrapper = mountTextArea({ rows: 6 })
      expect(wrapper.find('textarea').attributes('rows')).toBe('6')
    })

    it('passes placeholder prop through', () => {
      const wrapper = mountTextArea({ placeholder: 'Tell us more...' })
      expect(wrapper.find('textarea').attributes('placeholder')).toBe('Tell us more...')
    })

    it('passes class prop through', () => {
      const wrapper = mountTextArea({ areaClass: 'my-textarea-class' })
      expect(wrapper.find('textarea').classes()).toContain('my-textarea-class')
    })
  })

  describe('event handling', () => {
    it('does not throw when input event fires', async () => {
      const wrapper = mountTextArea()
      await expect(wrapper.find('textarea').trigger('input')).resolves.not.toThrow()
    })

    it('does not throw when blur event fires', async () => {
      const wrapper = mountTextArea()
      await expect(wrapper.find('textarea').trigger('blur')).resolves.not.toThrow()
    })
  })

  describe('error state', () => {
    it('has aria-invalid="true" when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').attributes('aria-invalid')).toBe('true')
    })

    it('applies border-brand-red in light mode when errorMessage is set', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').classes()).toContain('border-brand-red')
    })

    it('does not apply border-border in error state', () => {
      errorMessageRef.value = 'Required'
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').classes()).not.toContain('border-border')
    })

    it('applies border-brand-red-light in dark mode when errorMessage is set', () => {
      isDarkRef.value       = true
      errorMessageRef.value = 'Required'
      const wrapper = mountTextArea()
      expect(wrapper.find('textarea').classes()).toContain('border-brand-red-light')
    })
  })
})
