import type { StorybookConfig } from '@storybook/vue3-vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import path from 'node:path'

const config: StorybookConfig = {
  stories: ['../app/**/*.stories.@(js|ts|vue)'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  viteFinal(config) {
    const appDir = path.resolve(process.cwd(), 'app')
    config.plugins = [...(config.plugins ?? []), vue(), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '~': appDir,
        '@': appDir,
      },
    }
    return config
  },
}

export default config
