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
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
