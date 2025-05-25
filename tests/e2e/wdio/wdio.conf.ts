import allure from '@wdio/allure-reporter';

const BROWSERS = (process.env.BROWSERS ?? 'chrome').split(',');
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS !== 'false';
const VIEWPORT = process.env.VIEWPORT  === 'mobile';

const CHROME_ARGS = HEADLESS
  ? ['--headless','--disable-gpu','--window-size=1920,1080']
  : ['--start-maximized'];

const caps = BROWSERS.map((name) => {
  // Builds the shape for our capibilities
  const cap = {
    browserName: name,
    'wdio:maxInstances': 5,
    ...( ['chrome','edge'].includes(name) && {
      'goog:chromeOptions': {
        args: CHROME_ARGS,
        ...(VIEWPORT && { mobileEmulation: { deviceName: 'iPhone X' } })
      }
    }),
    ...( name === 'firefox' && {
      'moz:firefoxOptions': {
        args: HEADLESS
          ? ['-headless','-width=1920','-height=1080']
          : []
      }
    })
  };
  return cap;
});

// Cast the whole thing back to what WDIO expects
export const config: WebdriverIO.Config = {
  runner: 'local',

  // global fallback specs (only used if a capability doesn’t override)
  specs: ['./specs/**/*.ts'],

  // Allow up to 15 parallel spec runners (default: 100)
  maxInstances: 15,
  suites: {
    smoke:  ['./specs/smoke/**/*.ts'],
    full:   ['./specs/**/*.ts']
  },
  capabilities: caps as WebdriverIO.Config['capabilities'],
  framework: 'mocha',
  services: [],      // I can leave this empty because WDIO will auto‑manage drivers
  reporters: [
    'spec',
    ['allure', {
      outputDir: 'allure-results',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
    }]
  ],
  //
  // afterTest is called once each test completes
  //
  afterTest: async function (
    _test,    // Unused, so that's why it's prefixed with an underscore
    _context, // Unused
    { error } // only one being used (for now)
  ) {
    /**
     * result, duration, passed, retries are part of afterTest's hook signature, just like error
     * If you want to use them for something later, you can.
     */
    if (error) {
      // Grab a screenshot and attach it to Allure
      const screenshot = await browser.takeScreenshot();
      allure.addAttachment(
        'Screenshot on failure',
        Buffer.from(screenshot, 'base64'),
        'image/png'
      );
    }
    // you can also add custom labels, parameters, steps, etc:
    // allure.addLabel('feature', test.parent);
  },
  baseUrl: BASE_URL,
  tsConfigPath: "../../../tsconfig.json",

  /**
   * Custom commands
   */
  before: () => {
    // getByTestId
    // E.G.: const header = await browser.getByTestId(TestIds.SITE_HEADER);
    browser.addCommand(
      'getByTestId',
      async function (this: WebdriverIO.Browser, id: string) {
        return this.$(`[data-testid="${id}"]`);
      }
    );

    // getByText (exact match on visible text)
    // E.G.: const submitBtn = await browser.getByText('Submit');
    browser.addCommand(
      'getByText',
      async function (this: WebdriverIO.Browser, text: string) {
        return this.$(`=${text}`);
      }
    );

  },
  mochaOpts: { ui: 'bdd', timeout: 60_000 }
};
