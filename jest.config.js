/* eslint-disable @typescript-eslint/no-require-imports */
const nextJest = require("next/jest");

// 1) Tell next/jest where your Next app is
const createJestConfig = nextJest({
  dir: "./",
});

// 2) Add your custom overrides
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
    // uncomment if you mock next/image:
    // "^next/image$": "<rootDir>/__mocks__/nextImageMock.js",
  },
  transform: {
    // Use Babel-jest with the Next.js Babel preset so TSX/JSX is handled
    "^.+\\.(js|jsx|ts|tsx)$": [
      "babel-jest",
      { presets: ["next/babel"] },
    ],
  },
};

module.exports = createJestConfig(customJestConfig);
