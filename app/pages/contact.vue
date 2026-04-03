<script setup lang="ts">
import { object, string } from 'yup'
import { type FormField, FormInput, FormSelect, FormTextArea } from '~/components/ui/form'

const config = useRuntimeConfig()
const siteUrl = config.public.siteUrl as string
const contactDescription = 'Contact Dave Berning about senior front-end engineering roles, front-end architecture, design systems, or collaboration opportunities.'
const { color } = useTheme()

/* Page Meta Information
--------------------------------- */
useHead({ title: 'Contact' })

useSeoMeta({
  description: contactDescription,
  ogTitle: 'Contact Dave Berning | Senior Front-End Engineer',
  ogDescription: contactDescription,
  ogType: 'website',
  ogImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
  twitterTitle: 'Contact',
  twitterDescription: contactDescription,
  twitterImage: `${siteUrl}/bg/plaid-bg-teal.jpg`,
})

const { data: siteInfo } = await useSiteInfo()

const whatToSend = [
  'A quick overview of the project or role',
  'Your timeline, team setup, and current stack',
  'What kind of help you need most right now',
]

const tags = [
  'Freelance',
  'Collaboration',
  'Open to Work',
  'Open to Network',
  'Remote Opportunities',
]

const fields: FormField[] = [
  { name: 'firstName',     label: 'First Name',                component: FormInput,    placeholder: 'Fox' },
  { name: 'lastName',     label: 'Last Name',                 component: FormInput,    placeholder: 'McCloud' },
  { name: 'phone',        label: 'Phone Number',              component: FormInput,    placeholder: '(555) 123-4567' },
  { name: 'emailAddress', label: 'Email Address',             component: FormInput,    placeholder: 'fox@starfox.com', type: 'email' },
  { name: 'hearAboutMe',  label: 'How\'d you hear about me?', component: FormSelect,   placeholder: 'Select an option', class: 'sm:col-span-2', options: ['Facebook', 'Instagram', 'LinkedIn', 'Google', 'Other'] },
  { name: 'message',      label: 'Message',                   component: FormTextArea, placeholder: 'Your message...',  class: 'sm:col-span-2' },
]

/* Form Schema
--------------------------------- */
const schema = object({
  firstName:     string().required('First name is required'),
  lastName:     string().required('Last name is required'),
  phone:        string(),
  emailAddress: string().email('Must be a valid email').required('Email address is required'),
  hearAboutMe:  string(),
  message:      string().required('Message is required'),
})

function onSubmit(_values: Record<string, unknown>) {
  // TODO: implement form submission
}

useHead({
  script: [
    {
      key: 'contact-page-schema',
      type: 'application/ld+json',
      innerHTML: () => JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: 'Contact',
        description: contactDescription,
        url: `${siteUrl}/contact`,
      }),
    },
  ],
})
</script>

<template>
  <NuxtLayout name="sidebar">
    <UiText as="h1" class="mb-4">
      Contact
    </UiText>
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
      <div class="mt-6 flex flex-col-reverse sm:flex-row justify-end gap-3">
        <UiButton type="reset" variant="text" :color="color" size="large" class="w-full sm:w-auto">
          Clear
        </UiButton>
        <UiButton type="submit" variant="solid" :color="color" size="large" class="w-full sm:w-auto">
          Send Message
        </UiButton>
      </div>
    </UiForm>
    <template #aside>
      <UiAside class="py-8">
        <UiAsideSection>
          <ul class="flex flex-wrap gap-2 list-none">
            <li v-for="tag in tags" :key="tag">
              <UiPill color="white">{{ tag }}</UiPill>
            </li>
          </ul>
        </UiAsideSection>
        <UiAsideSection>
          <UiAsideSubtitle>
            <span class="inline-flex items-center gap-1.5">
              <Icon name="lucide:send" class="size-3" aria-hidden="true" />
              What To Send
            </span>
          </UiAsideSubtitle>
          <UiAsideList :items="whatToSend" />
        </UiAsideSection>
        <UiAsideSection>
          <UiAsideSubtitle>
            <span class="inline-flex items-center gap-1.5">
              <Icon name="lucide:clock-3" class="size-3" aria-hidden="true" />
              Response Time
            </span>
          </UiAsideSubtitle>
          <UiText color="white">Usually within 1–2 business days.</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="siteInfo?.city && siteInfo?.state">
          <UiAsideSubtitle>
            <span class="inline-flex items-center gap-1.5">
              <Icon name="lucide:map-pinned" class="size-3" aria-hidden="true" />
              Location
            </span>
          </UiAsideSubtitle>
          <UiText color="white">{{ siteInfo.city }}, {{ siteInfo.state }}</UiText>
        </UiAsideSection>
        <UiAsideSection v-if="siteInfo?.socialLinks?.length">
          <UiAsideSubtitle>
            <span class="inline-flex items-center gap-1.5">
              <Icon name="lucide:messages-square" class="size-3" aria-hidden="true" />
              Connect
            </span>
          </UiAsideSubtitle>
          <SocialLinks :links="siteInfo.socialLinks" />
        </UiAsideSection>
      </UiAside>
    </template>
  </NuxtLayout>
</template>
