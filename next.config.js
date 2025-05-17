/** @type {import('next').NextConfig} */
module.exports = {
  // Only treat files with the following extensions
  //   *.page.tsx|.page.jsx|.page.ts|.page.js
  //   *.api.tsx|.api.jsx|.api.ts|.api.js
  // as pages
  pageExtensions: [
    'page.tsx','page.ts','page.jsx','page.js',
    'api.tsx','api.ts','api.jsx','api.js',
  ],
}
