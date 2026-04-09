import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

type BrowserName = 'chromium' | 'firefox' | 'webkit'
const browser = (process.env.BROWSER as BrowserName | undefined) ?? 'chromium'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'app'),
    },
  },
  test: {
    include: ['app/**/*.browser.test.ts'],
    browser: {
      enabled: true,
      provider: playwright({
        actionTimeout: 5_000,
      }),
      headless: true,
      instances: [
        { browser },
      ],
      api: {
        host: '127.0.0.1',
        port: 63315,
      },
    },
  },
})
