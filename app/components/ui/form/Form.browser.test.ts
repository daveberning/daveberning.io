import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { defineComponent, h, ref } from 'vue'
import { object, string } from 'yup'
import { render } from 'vitest-browser-vue'
import { Form, FormInput, FormMessage, FormTextArea } from '.'
import { provideTheme } from '~/composables/useTheme'

const BrowserFormHarness = defineComponent({
  setup() {
    provideTheme()

    const submitted = ref('')
    const schema = object({
      firstName: string().required('First name is required'),
      emailAddress: string().email('Must be a valid email').required('Email address is required'),
      message: string().required('Message is required'),
    })

    function onSubmit(values: Record<string, unknown>) {
      submitted.value = JSON.stringify(values)
      // Direct DOM write to distinguish "never called" from "Vue not re-rendering"
      const el = document.querySelector('[data-testid="submitted-values"]')
      if (el) el.textContent = JSON.stringify(values)
    }

    return () => h('div', [
      h(Form, { validationSchema: schema, onSubmit }, {
        default: () => [
          h('label', { for: 'field-firstName' }, 'First Name'),
          h(FormInput, { name: 'firstName', placeholder: 'Jane' }),
          h(FormMessage, { name: 'firstName' }),
          h('label', { for: 'field-emailAddress' }, 'Email Address'),
          h(FormInput, { name: 'emailAddress', type: 'email', placeholder: 'jane@example.com' }),
          h(FormMessage, { name: 'emailAddress' }),
          h('label', { for: 'field-message' }, 'Message'),
          h(FormTextArea, { name: 'message', placeholder: 'Your message...' }),
          h(FormMessage, { name: 'message' }),
          h('button', { type: 'reset' }, 'Clear'),
          h('button', { type: 'submit' }, 'Send Message'),
        ],
      }),
      h('output', { 'data-testid': 'submitted-values' }, submitted.value),
    ])
  },
})

afterEach(() => {
  localStorage.clear()
  document.documentElement.removeAttribute('data-theme')
  document.documentElement.classList.remove('dark')
})

describe('Form browser behavior', () => {
  it('shows validation messages for missing and invalid fields', async () => {
    const view = render(BrowserFormHarness)

    await userEvent.click(view.getByRole('button', { name: 'Send Message' }))
    await expect.element(view.getByText('First name is required')).toBeVisible()
    await expect.element(view.getByText('Email address is required')).toBeVisible()
    await expect.element(view.getByText('Message is required')).toBeVisible()

    await userEvent.fill(view.getByLabelText('First Name'), 'Dave')
    await userEvent.fill(view.getByLabelText('Email Address'), 'not-an-email')
    await userEvent.fill(view.getByLabelText('Message'), 'Hello there')
    await userEvent.click(view.getByRole('button', { name: 'Send Message' }))

    await expect.element(view.getByText('Must be a valid email')).toBeVisible()
  })

  it('submits valid values', async () => {
    const view = render(BrowserFormHarness)

    const firstName = view.getByLabelText('First Name')
    const emailAddress = view.getByLabelText('Email Address')
    const message = view.getByLabelText('Message')

    await userEvent.fill(firstName, 'Dave')
    await expect.element(firstName).toHaveValue('Dave')
    await userEvent.tab()

    await userEvent.fill(emailAddress, 'dave@example.com')
    await expect.element(emailAddress).toHaveValue('dave@example.com')
    await userEvent.tab()

    await userEvent.fill(message, 'Hello from browser mode')
    await expect.element(message).toHaveValue('Hello from browser mode')

    await userEvent.click(view.getByRole('button', { name: 'Send Message' }))

    await expect.element(view.getByTestId('submitted-values')).toHaveTextContent('"firstName":"Dave"')
    await expect.element(view.getByTestId('submitted-values')).toHaveTextContent('"emailAddress":"dave@example.com"')
    await expect.element(view.getByTestId('submitted-values')).toHaveTextContent('"message":"Hello from browser mode"')
  })
})
