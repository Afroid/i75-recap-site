import { expect } from 'expect-webdriverio';
import { TestIds } from '@/lib/testIds';

describe('WDIO E2E Testing', () => {
    before(async () => {
      await browser.url('/');
    });

    it('renders the site header', async () => {
      const header = await browser.getByTestId(TestIds.SITE_HEADER);

      // Assertion
      await expect(header).toBeExisting();

      // pause for 10 seconds so you can visually inspect
      await browser.pause(10000);
    });
});
