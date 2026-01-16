import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  featuresRoot: '_features',
  steps: 'test/steps/*.ts',
  outputDir: 'test/.gen',
})

export default defineConfig({
  testDir,
  outputDir: 'test/results',
  reporter: [['html', { outputFolder: 'test/report' }]],
  expect: { timeout: 500 },
  use: {
    baseURL: 'http://localhost:5173',
    actionTimeout: 500,
    // Ensure fresh context per test with no shared state
    storageState: undefined,
    serviceWorkers: 'block',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
