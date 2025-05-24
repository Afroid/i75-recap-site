const BROWSERS = (process.env.BROWSERS ?? 'chrome').split(',');
const BASE_URL = process.env.BASE_URL ?? 'http://localhost:3000';
const HEADLESS = process.env.HEADLESS !== 'false';
// const VIEWPORT  = process.env.VIEWPORT  === 'mobile';

// const CHROME_ARGS = HEADLESS
//   ? ['--headless','--disable-gpu','--window-size=1920,1080']
//   : ['--start-maximized'];

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
  // Dynamic capabilities
  capabilities: BROWSERS.map((name) => ({
    browserName: name,
    'wdio:maxInstances': 5,
    ...(name === 'chrome' && {
      'goog:chromeOptions': { args: HEADLESS ? ['--headless'] : [] }
    })
  })),

  // capabilities: BROWSERS.map((name): SingleCapabilities => {
  //   // use WDIO's RemoteCapability
  //   const cap: SingleCapabilities = {
  //     browserName: name,
  //     'wdio:maxInstances': 5
  //   };

  //   // Chrome & Edge get the same Chromium flags + optional mobile emulation
  //   if (['chrome', 'edge'].includes(name)) {
  //     cap['goog:chromeOptions'] = {
  //       args: CHROME_ARGS,
  //       ...(VIEWPORT && { mobileEmulation: { deviceName: 'iPhone X' } })
  //     };
  //   }
  //   if (name === 'firefox') {
  //     cap['moz:firefoxOptions'] = {
  //       args: HEADLESS
  //         ? ['-headless','-width=1920','-height=1080']
  //         : []
  //     };
  //   }
  //   return cap;
  // }),

  framework: 'mocha',
  services: [],      // I can leave this empty because WDIO will auto‑manage drivers
  reporters: ['spec'],
  baseUrl: BASE_URL,
  tsConfigPath: "../../../tsconfig.json",

  // Custom commands
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
