import type { VariantProps } from 'class-variance-authority'
import { cva } from 'class-variance-authority'
import Form from './Form.vue'
import FormLabel from './FormLabel.vue'
import FormInput from './FormInput.vue'
import FormSelect from './FormSelect.vue'
import FormTextArea from './FormTextArea.vue'
import FormMessage from './FormMessage.vue'

/* Variants
--------------------------------------------------------------------- */
export const formLabelVariants = cva('block text-sm font-medium mb-1.5', {
  variants: {
    state: { default: 'text-text', error: '' },
    mode:  { light: '', dark: '' },
  },
  compoundVariants: [
    { state: 'error', mode: 'light', class: 'text-brand-red' },
    { state: 'error', mode: 'dark',  class: 'text-brand-red-light' },
  ],
  defaultVariants: { state: 'default', mode: 'light' },
})

export const formInputVariants = cva('w-full rounded-md border bg-surface text-text px-3 py-2.5 text-sm placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:ring-theme disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      state: { default: 'border-border', error: '' },
      mode:  { light: '', dark: '' },
    },
    compoundVariants: [
      { state: 'error', mode: 'light', class: 'border-brand-red' },
      { state: 'error', mode: 'dark',  class: 'border-brand-red-light' },
    ],
    defaultVariants: { state: 'default', mode: 'light' },
  },
)

export const formTextAreaVariants = cva(
  'w-full rounded-md border bg-surface text-text px-3 py-2.5 text-sm placeholder:text-text-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:ring-theme disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none resize-y min-h-[120px]',
  {
    variants: {
      state: { default: 'border-border', error: '' },
      mode:  { light: '', dark: '' },
    },
    compoundVariants: [
      { state: 'error', mode: 'light', class: 'border-brand-red' },
      { state: 'error', mode: 'dark',  class: 'border-brand-red-light' },
    ],
    defaultVariants: { state: 'default', mode: 'light' },
  },
)

export const formSelectVariants = cva(
  'w-full rounded-md border bg-surface text-text px-3 py-2.5 pr-10 text-sm transition-colors appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:ring-theme disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
  {
    variants: {
      state: { default: 'border-border', error: '' },
      mode:  { light: '', dark: '' },
    },
    compoundVariants: [
      { state: 'error', mode: 'light', class: 'border-brand-red' },
      { state: 'error', mode: 'dark',  class: 'border-brand-red-light' },
    ],
    defaultVariants: { state: 'default', mode: 'light' },
  },
)

export const formMessageVariants = cva('block text-sm mt-1.5 min-h-[1.25rem]', {
  variants: {
    state: { default: 'text-transparent', error: '' },
    mode:  { light: '', dark: '' },
  },
  compoundVariants: [
    { state: 'error', mode: 'light', class: 'text-brand-red' },
    { state: 'error', mode: 'dark',  class: 'text-brand-red-light' },
  ],
  defaultVariants: { state: 'default', mode: 'light' },
})

/* Types
--------------------------------------------------------------------- */
export type FormLabelVariants    = VariantProps<typeof formLabelVariants>
export type FormInputVariants    = VariantProps<typeof formInputVariants>
export type FormSelectVariants   = VariantProps<typeof formSelectVariants>
export type FormTextAreaVariants = VariantProps<typeof formTextAreaVariants>
export type FormMessageVariants  = VariantProps<typeof formMessageVariants>

export interface FormProps {
  validationSchema: unknown
  class?:           string
}

export interface FormLabelProps {
  name:   string
  class?: string
}

export interface FormInputProps {
  name:         string
  type?:        string
  placeholder?: string
  class?:       string
}

export interface FormSelectProps {
  name:         string
  options:      string[]
  placeholder?: string
  class?:       string
}

export interface FormTextAreaProps {
  name:         string
  placeholder?: string
  rows?:        number
  class?:       string
}

export interface FormMessageProps {
  name:   string
  class?: string
}

/* Components
--------------------------------------------------------------------- */
export {
  Form as default,
  Form,
  FormLabel,
  FormInput,
  FormSelect,
  FormTextArea,
  FormMessage,
}
