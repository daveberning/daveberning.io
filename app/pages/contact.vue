<script setup lang="ts">
import { object, string } from 'yup'
import { FormInput, FormSelect, FormTextArea } from '~/components/ui/form'

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Contact — Dave Berning' })
definePageMeta({ layout: 'internal' })

const { color } = useTheme()

/* Form Fields
--------------------------------- */
interface FormField {
  name:         string
  label:        string
  component:    typeof FormInput | typeof FormSelect | typeof FormTextArea
  type?:        string
  placeholder?: string
  options?:     string[]
  class?:       string
}

const fields: FormField[] = [
  { name: 'firstName',    label: 'First Name',    component: FormInput,    placeholder: 'Jane' },
  { name: 'lastName',     label: 'Last Name',     component: FormInput,    placeholder: 'Doe' },
  { name: 'phone',        label: 'Phone Number',  component: FormInput,    placeholder: '(555) 123-4567' },
  { name: 'emailAddress',  label: 'Email Address',           component: FormInput,    placeholder: 'jane@example.com', type: 'email' },
  { name: 'hearAboutMe',  label: 'How\'d you hear about me?', component: FormSelect,   placeholder: 'Select an option', options: ['Facebook', 'Instagram', 'LinkedIn', 'Google', 'Other'], class: 'sm:col-span-2' },
  { name: 'message',       label: 'Message',                  component: FormTextArea, placeholder: 'Your message...', class: 'sm:col-span-2' },
]

/* Form Schema
--------------------------------- */
const schema = object({
  firstName:    string().required('First name is required'),
  lastName:     string().required('Last name is required'),
  phone:        string(),
  emailAddress: string().email('Must be a valid email').required('Email address is required'),
  hearAboutMe:  string(),
  message:      string().required('Message is required'),
})

function onSubmit(_values: Record<string, unknown>) {
  // TODO: implement form submission
}
</script>

<template>
  <UiText as="h1" class="mb-4">
    Contact
  </UiText>
  <UiText as="p" class="mb-8">
    Have a project in mind or just want to say hello? Fill out the form below and I'll get back to you as soon as I can.
  </UiText>
  <div class="w-[1200px] mx-auto">
    <UiForm :validation-schema="schema" @submit="onSubmit">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div v-for="field in fields" :key="field.name" :class="field.class">
          <UiFormLabel :name="field.name">
            {{ field.label }}
          </UiFormLabel>
          <component :is="field.component" :name="field.name" :type="field.type" :placeholder="field.placeholder" :options="field.options" />
          <UiFormMessage :name="field.name" />
        </div>
      </div>
      <div class="mt-6 flex justify-end gap-3">
        <UiButton type="reset" variant="text" :color="color" size="large">
          Clear
        </UiButton>
        <UiButton type="submit" variant="solid" :color="color" size="large">
          Send Message
        </UiButton>
      </div>
    </UiForm>
  </div>
</template>
