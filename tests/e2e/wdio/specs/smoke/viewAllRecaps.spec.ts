import { expect } from 'expect-webdriverio';
import { TestIds } from '@/lib/testIds';

describe('WDIO E2E Testing', () => {
  before(async () => {
    await browser.url('recaps/viewAllRecaps');
  });

  it('checks random elements on the page', async () => {
    const viewAllRecapsPage = await browser.getByTestId(TestIds.VIEW_ALL_RECAPS_PAGE);
    const searchInput = await browser.getByTestId(TestIds.VIEW_ALL_RECAPS_SEARCH_INPUT);
    const recapsList = await browser.getByTestId(TestIds.VIEW_ALL_RECAPS_RECAP_LIST);

    // Assertions
    await expect(viewAllRecapsPage).toBeExisting();
    await expect(searchInput).toBeExisting();
    await expect(recapsList).toBeExisting();
  });
});
