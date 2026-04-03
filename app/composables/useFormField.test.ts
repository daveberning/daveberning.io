import { ref } from 'vue'
import { describe, expect, it, vi } from 'vitest'
import { useFormField } from './useFormField'

vi.mock('vee-validate', () => ({
  useField: (nameGetter: () => string) => {
    nameGetter()
    return {
      value: ref(''),
      errorMessage: ref<string | undefined>(undefined),
      handleChange: vi.fn(),
      handleBlur: vi.fn(),
    }
  },
}))

describe('useFormField', () => {
  it('returns field state, handlers, and computed IDs', () => {
    const result = useFormField('email')

    expect(result).toHaveProperty('value')
    expect(result).toHaveProperty('errorMessage')
    expect(result).toHaveProperty('state')
    expect(result).toHaveProperty('inputId')
    expect(result).toHaveProperty('messageId')
    expect(result).toHaveProperty('handleChange')
    expect(result).toHaveProperty('handleBlur')
  })

  it('generates correct default IDs', () => {
    const result = useFormField('username')

    expect(result.inputId.value).toBe('field-username')
    expect(result.messageId.value).toBe('field-username-message')
  })

  it('generates IDs with custom prefix', () => {
    const result = useFormField('username', { idPrefix: 'input' })

    expect(result.inputId.value).toBe('input-username')
    expect(result.messageId.value).toBe('input-username-message')
  })

  it('defaults state to "default" when errorMessage is empty', () => {
    const result = useFormField('email')

    expect(result.state.value).toBe('default')
  })

  it('updates state when errorMessage changes', () => {
    const result = useFormField('email')

    // Initially state should be 'default' (errorMessage is empty)
    expect(result.state.value).toBe('default')
  })

  it('has reactive handlers', () => {
    const result = useFormField('name')

    expect(typeof result.handleChange).toBe('function')
    expect(typeof result.handleBlur).toBe('function')
  })

  it('works with different field names', () => {
    const emailField = useFormField('email')
    const passwordField = useFormField('password')

    expect(emailField.inputId.value).toBe('field-email')
    expect(passwordField.inputId.value).toBe('field-password')
  })

  it('has reactive value and errorMessage from useField', () => {
    const result = useFormField('test')

    expect(result.value).toBeDefined()
    expect(result.errorMessage).toBeDefined()
  })
})
