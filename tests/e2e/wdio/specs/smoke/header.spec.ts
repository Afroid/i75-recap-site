import { expect } from 'expect-webdriverio';
import { TestIds } from '@/lib/testIds';

describe('Home page', () => {
  before(async () => {
    await browser.url('/');
  });

  it('renders the site header', async () => {
    const header = await browser.getByTestId(TestIds.SITE_HEADER);
    await expect(header).toBeExisting();

    // pause for 10 seconds so you can visually inspect
    await browser.pause(10000);
  });
});
