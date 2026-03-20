import '../app/assets/css/main.css'

import { setup } from '@storybook/vue3-vite'
import { defineComponent, h } from 'vue'
import type { Preview } from '@storybook/vue3-vite'
import { provideTheme } from '../app/composables/useTheme'

setup((app) => {
  // Stub NuxtLink so components that default as="NuxtLink" render correctly
  app.component('NuxtLink', defineComponent({
    props: ['to', 'href'],
    setup(props, { slots }) {
      return () => h('a', { href: props.to ?? props.href }, slots.default?.())
    },
  }))
})

const preview: Preview = {
  // Provide theme context to every story that needs it
  decorators: [
    (story) => ({
      setup() { provideTheme() },
      template: '<story />',
    }),
  ],
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'dark', value: '#0f1117' },
      ],
    },
  },
}

export default preview
