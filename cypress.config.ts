import { defineConfig } from 'cypress'
import allureWriter from '@shelex/cypress-allure-plugin/writer'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'cypress/support/e2e.ts',
    setupNodeEvents(on, config) {
      // this sets up the Allure writer
      allureWriter(on, config)
      return config
    },
    env: {
      // Turns the Allure plug-in on
      allure: true,
      // avoids interference if other plugins use after:spec
      allureReuseAfterSpec: true
    }
  }
})
