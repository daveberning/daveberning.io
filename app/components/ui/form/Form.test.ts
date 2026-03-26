import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import Form from './Form.vue'

vi.mock('vee-validate', () => ({
  useForm: () => ({
    handleSubmit: (cb: (values: Record<string, unknown>) => void) =>
      (e: Event) => { e.preventDefault(); cb({ email: 'test@example.com' }) },
    resetForm: vi.fn(),
  }),
}))

describe('Form', () => {
  describe('default rendering', () => {
    it('renders a <form> element', () => {
      const wrapper = mount(Form, { props: { validationSchema: {} } })
      expect(wrapper.element.tagName).toBe('FORM')
    })

    it('passes class prop through to the form element', () => {
      const wrapper = mount(Form, { props: { validationSchema: {}, class: 'my-form-class' } })
      expect(wrapper.classes()).toContain('my-form-class')
    })

    it('renders slot content', () => {
      const wrapper = mount(Form, {
        props: { validationSchema: {} },
        slots: { default: '<span class="child">field</span>' },
      })
      expect(wrapper.find('.child').exists()).toBe(true)
    })
  })

  describe('form submission', () => {
    it('emits submit event when the form is submitted', async () => {
      const wrapper = mount(Form, { props: { validationSchema: {} } })
      await wrapper.find('form').trigger('submit')
      expect(wrapper.emitted('submit')).toBeTruthy()
    })

    it('emits submit event with the validated values', async () => {
      const wrapper = mount(Form, { props: { validationSchema: {} } })
      await wrapper.find('form').trigger('submit')
      const [payload] = wrapper.emitted('submit')![0] as [Record<string, unknown>]
      expect(payload).toEqual({ email: 'test@example.com' })
    })
  })

  describe('form reset', () => {
    it('handles the reset event without throwing', async () => {
      const wrapper = mount(Form, { props: { validationSchema: {} } })
      await expect(wrapper.find('form').trigger('reset')).resolves.not.toThrow()
    })
  })
})
