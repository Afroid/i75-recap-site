/** @type {import('lint-staged').Config} */

module.exports = {
  "**/*.{js,jsx,ts,tsx}": ["eslint --fix"],

  // Example: format Markdown or JSON files (uncomment if needed)
  // "**/*.{md,json}": ["prettier --write"],

  // Example: style linting (if added later)
  // "**/*.{css,scss}": ["stylelint --fix"],
};