import { TestIds } from "@/lib/testIds";

describe('Testing the Home Page', () => {
  beforeEach(() => {
    // Sets a custom Allure test case name
    cy.allure().testName('Homepage smoke test')
      .epic('I75 League Site')
      .feature('Homepage')
      .story('Site title & drawer')
      .severity('critical');
  });

  it('displays the site title and opens the nav drawer', () => {
    cy.visit('/');

    // Checks the main heading
    cy.get('h1')
      .should('be.visible')
      .and('contain.text', 'I75 League Recaps');

    // Asserts the hamburger button exists and opens the drawer
    cy.get(`button[data-testid=${TestIds.HEADER_HAMBURGER_BUTTON}]`)
      .should('exist')
      .click();

    // Asserts the drawer is visible
    cy.get(`[data-testid=${TestIds.HEADER_MOBILE_HEADER}]`)
      .should('be.visible');
  });
});
