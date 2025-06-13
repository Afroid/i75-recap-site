import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e/playwright',      // Keeps the Playwright tests separate
  testMatch: ['**/specs/**/*.spec.ts'],   // Picks up specs under the specs/ folder
  timeout: 30_000,                        // Per‑test timeout
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      suiteTitle: true
    }],
  ],
  webServer: {
    command: 'npm run start',             // or 'npm run dev'
    url: 'http://localhost:3000',
    reuseExistingServer: true,
    // reuseExistingServer: !process.env.CI,
    timeout: 120_000,                     // This makes it wait up to 2 minutes for it to start
  },
  use: {
    baseURL: process.env.PW_BASE_URL || 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'Playwright E2E Tests', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});
