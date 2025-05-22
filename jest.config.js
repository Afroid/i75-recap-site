/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

// Tells next/jest where your Next app is
const createJestConfig = nextJest({
  dir: "./",
});

// Custom overrides
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  transform: {
    // Use Babel-jest with the Next.js Babel preset so TSX/JSX is handled
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { presets: ["next/babel"] },
    ],
  },

  // Only pick up files ending in .test.js / .test.ts / .test.jsx / .test.tsx
  testMatch: [
    "**/?(*.)+(test).[jt]s?(x)"
  ],

  // Automatically collect coverage information while running tests
  collectCoverage: true,

  // Where Jest should output its coverage reports
  coverageDirectory: "coverage",

  // Which files should be included when computing coverage;
  // by default tests and anything in node_modules are ignored
  collectCoverageFrom: [
    "lib/**/*.{js,ts,tsx}",
    "components/**/*.{js,ts,tsx}",
    "pages/**/*.{js,ts,tsx}"
  ],
  /**
   * html → spits out a browsable HTML report in coverage/lcov-report/index.html.
   * text-summary → prints a tiny pass/fail summary in your terminal.
   * lcov → generates an lcov.info file (a standard coverage-data format) which tools like
   * Coveralls, Codecov, SonarCloud, or CI dashboards can consume.
   */
  coverageReporters: ["html", "text-summary", "lcov"],
};

module.exports = createJestConfig(customJestConfig);
