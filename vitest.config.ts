import { resolve } from 'node:path'
import { defineVitestConfig } from '@nuxt/test-utils/config'
import { configDefaults } from 'vitest/config'

export default defineVitestConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  test: {
    environment: 'happy-dom',
    exclude: [
      ...configDefaults.exclude,
      '**/*.browser.test.ts',
    ],
    coverage: {
      provider: 'v8',
      include: [
        'app/lib/**',
        'app/components/**',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
