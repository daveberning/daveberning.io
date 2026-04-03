import { computed, type ComputedRef } from 'vue'
import { useField } from 'vee-validate'

export interface UseFormFieldOptions {
  idPrefix?: string
}

export interface UseFormFieldReturn {
  value: ComputedRef<unknown>
  errorMessage: ComputedRef<string | undefined>
  state: ComputedRef<'error' | 'default'>
  inputId: ComputedRef<string>
  messageId: ComputedRef<string>
  handleChange: (e: Event) => void
  handleBlur: () => void
}

/**
 * Wraps vee-validate's useField with auto-generated IDs and computed state.
 * Reduces boilerplate in form components.
 *
 * @param fieldName The field name (used for vee-validate and ID generation)
 * @param options Configuration (idPrefix)
 * @returns Object with value, errorMessage, state, IDs, and handlers
 *
 * @example
 * const { value, state, inputId, messageId, handleChange, handleBlur } = useFormField('email')
 *
 * <template>
 *   <input :id="inputId" :value="value" @change="handleChange" @blur="handleBlur" />
 *   <p v-if="state === 'error'" :id="messageId">Error text</p>
 * </template>
 */
export function useFormField(fieldName: string, options: UseFormFieldOptions = {}): UseFormFieldReturn {
  const { idPrefix = 'field' } = options
  const { value: fieldValue, errorMessage: fieldErrorMessage, handleChange, handleBlur } = useField(() => fieldName)
  const value = computed(() => fieldValue.value)
  const errorMessage = computed(() => fieldErrorMessage.value)
  const state = computed(() => errorMessage.value ? 'error' : 'default')
  const inputId = computed(() => `${idPrefix}-${fieldName}`)
  const messageId = computed(() => `${idPrefix}-${fieldName}-message`)

  return {
    value,
    errorMessage,
    state,
    inputId,
    messageId,
    handleChange,
    handleBlur
  }
}
