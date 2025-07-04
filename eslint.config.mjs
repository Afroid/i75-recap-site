import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignore folders first
  {
    ignores: [
      "node_modules",
      ".next",
      "public",
      "build",
      "data",            // Ignore JSON files folder
      "dev-notes.ignore", // Ignore the dev notes file
      "allure-report",
    ],
  },

  // Main JS/TS config
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },

  // Globals like window, document, etc.
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // TypeScript rules
  tseslint.configs.recommended,

  // React rules
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Detects the React version automatically
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React doesn't need to be imported manually.
      "no-trailing-spaces": "error",
      "max-len": ["error", { "code": 100, "ignoreUrls": true }],
    },
  },
]);
