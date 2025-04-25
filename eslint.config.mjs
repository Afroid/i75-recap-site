import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // 🧹 1. Ignore folders first
  {
    ignores: [
      "node_modules",
      ".next",
      "public",
      "build",
      "data",            // Ignore JSON files folder
      "dev-notes.ignore", // Ignore the dev notes file
    ],
  },

  // 🛠 2. Main JS/TS config
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    plugins: { js }, 
    extends: ["js/recommended"],
  },

  // 🌎 3. Globals like window, document, etc.
  { 
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"], 
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
  },

  // 🔥 4. TypeScript rules
  tseslint.configs.recommended,

  // ⚛️ 5. React rules
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Detects the React version automatically
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // React doesn't need to be imported manually.
    },
  },
]);
