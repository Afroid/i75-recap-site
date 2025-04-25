/** @type {import('lint-staged').Config} */

const config = {
  // Lint and auto-fix JS/TS/React files
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix"],

  // Example: format Markdown or JSON files (uncomment if needed)
  // "**/*.{md,json}": ["prettier --write"],

  // Example: style linting (if added later)
  // "**/*.{css,scss}": ["stylelint --fix"],
};

export default config;