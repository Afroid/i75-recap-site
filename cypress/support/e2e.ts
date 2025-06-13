import '@shelex/cypress-allure-plugin'

beforeEach(() => {
  cy.allure()
    .parentSuite('Cypress E2E Tests')
});
