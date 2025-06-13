import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test.describe('Tests the home page', () => {
    test('Home page loads', async ({ page }) => {
      await page.goto('/');
      await expect(page.locator('h1')).toHaveText('I75 League Recaps');
    });
  })
});
