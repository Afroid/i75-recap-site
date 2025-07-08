# 🏈 I75 League - Fantasy Football Recaps

Welcome to the official repository for the **I75 League**, a private Fantasy Football league.
This project transforms years of weekly email recaps into a clean, dynamic, modern web experience.

Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Framer Motion**, **ESLint (Flat Config)**, **Husky**, **Lint-Staged**, and more.

🧠 Full project wiki available here: [**I75 League Wiki**](https://github.com/Afroid/i75-recap-site/wiki)

---

## 🛡️ Badges

🚦 Status

[![CI status](https://github.com/Afroid/i75-recap-site/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/Afroid/i75-recap-site/actions/workflows/ci.yml)

🧪 Status

[![Codecov](https://img.shields.io/codecov/c/github/Afroid/i75-recap-site?branch=main&logo=codecov)](https://codecov.io/gh/Afroid/i75-recap-site)

---

## 🚀 Features

- Dynamic Recap Pages (by year and week)
- Animated, responsive layout
- Clean desktop and mobile experience
- ESLint + Husky pre-commit hooks for code quality
- Future-proofed for admin features and CMS/image uploads

---

## 📦 Local Development Setup

### Requirements
- Node.js `v20.x`
- NPM `v9.x` or higher
- Git
- **Java JRE 8+**
  - Windows: set a `JAVA_HOME` system variable pointing at your JDK install (e.g. `C:\Program Files\Eclipse Adoptium\jdk-21…`) and ensure `%JAVA_HOME%\bin` is on your `Path`.
  - macOS/Linux: install via your package manager (`brew install openjdk`, `sudo apt install default-jre`, etc.).

### Getting Started
1. **Clone the repo:**

```bash
git clone https://github.com/Afroid/i75-recap-site.git
cd i75league
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start local dev server:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🧪 Testing

We use **Jest** + **React Testing Library** for unit and snapshot tests.
We use **WDIO**, **Playwright** and **Cypress** for our E2E runs.

🧪🧠 Full testing wiki available here: [**I75 League Testing**](https://github.com/Afroid/i75-recap-site/wiki/I75-League-Testing)

### Jest Scripts

| Script                   | What it does                                                                   |
| ------------------------ | -------------------------------------------------------------------------------|
| `npm test`               | Run **all** tests once (jsdom environment)                                     |
| `npm run test:watch`     | Run tests in **watch** mode                                                    |
| `npm run test:coverage`  | Generate **coverage** reports (HTML + text-summary + lcov)                     |
| `npx jest <path>`        | Run **only** the specified test file, e.g.:<br>`npx jest pages/index.test.tsx` |

### Jest Test Coverage

After running:

```bash
npm run test:coverage
```

-   **HTML report**: `coverage/lcov-report/index.html`

-   **Terminal summary**: printed automatically

Open the HTML file in your browser for detailed insights.

### WDIO Scripts

| Script                                  | What it does                                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `npm run test:wdio`                     | Run **all** E2E tests (suite=`full`) against `BASE_URL` (default `localhost:3000`) in headless Chrome     |
| `npm run test:wdio:local`               | Same as above but forces `BASE_URL=http://localhost:3000`                                                 |
| `npm run test:wdio:prod`                | Same as above but forces `BASE_URL=https://www.i75league.com`                                             |
| `npm run test:smoke`                    | Run **smoke** suite (fast‑sanity checks) against `BASE_URL`                                               |
| `npm run test:full`                     | Run **full** suite (all specs) against `BASE_URL`                                                         |
| `npm run wdio:spec -- <path/to/spec>`   | Run **only** the specified spec file, e.g.<br>`npm run wdio:spec -- header.spec.ts`                       |

---

### Cypress Scripts

| Script                      | What it does                                                         |
| --------------------------- | -------------------------------------------------------------------- |
| `npm run cypress:open`      | Launch the Cypress Test Runner (interactive GUI)                     |
| `npm run cypress:run`       | Execute **all** Cypress tests in headless mode                       |
| `npm run cypress:run:smoke` | Run only the smoke tests (`cypress/e2e/smoke/**/*.cy.{js,jsx,ts,tsx}`) |

---

### Playwright Scripts

| Script                 | What it does                                                         |
| ---------------------- | -------------------------------------------------------------------- |
| `npm run pw:e2e`       | Run **all** Playwright tests (headless)                              |
| `npm run pw:e2e:smoke` | Run Playwright tests tagged with `@smoke`                            |
| `npm run pw:e2e:headed`| Run Playwright tests in headed (non-headless) mode                   |
| `npm run pw:e2e:report`| Generate & open the HTML report (`playwright show-report`)           |

---

### 📊 Allure Test Reports

We use [Allure](https://docs.qameta.io/allure/) to generate interactive HTML reports for our E2E runs.

[**Allure Test Report**](https://Afroid.github.io/i75-recap-site/)

### Allure Reporting Scripts

| Script                           | What it does                                                                                  |
| -------------------------------- | --------------------------------------------------------------------------------------------- |
| `npm run allure:report`         | **Generate** and **serve** a live Allure report from `allure-results/` (opens in your browser) |
| `npm run allure:generate`       | **Generate** static HTML into `allure-report/`                                                |
| `npm run allure:serve`          | **Serve** the already‑generated `allure-report/` on http://localhost:3000                     |

### CI Integration

We’ve included a GitHub Actions workflow (`.github/workflows/allure.yml`) that:

1.  Checks out your code

2.  Installs dependencies (`npm ci`)

3.  Runs E2E tests (`npm run test:wdio`)

4.  Generates a static Allure site (`npm run allure:generate`)

5.  Publishes the result as a build artifact **and** deploys to GitHub Pages


Once merged, your reports will be publicly available at:

[**Allure Test Report**](https://Afroid.github.io/i75-recap-site/)

---

## 🛠️ Key Scripts

| Script           | Command                                                      | Description                                 |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------- |
| **dev**          | `npm run dev`                                                | Start Next.js in development mode           |
| **build**        | `npm run build`                                              | Build production bundle                     |
| **start**        | `npm run start`                                              | Launch production server                    |
| **prepare**      | `npm run prepare`                                            | Install Husky Git hooks                     |
| **lint**         | `npm run lint`                                               | Run ESLint with auto-fix                    |
| **test**         | `npm run test`                                               | Run Jest once                               |
| **test:watch**   | `npm run test:watch`                                         | Run Jest in watch mode (re-runs on changes) |
| **test:coverage**| `npm run test:coverage`                                      | Run Jest and output coverage report         |

---

## 🛠 Code Quality Tools

- **ESLint** (Flat Config - modern setup)
- **Husky** (Git pre-commit hooks)
- **Lint-Staged** (only lints staged files on commit)

---

## ✍️ Author

**The John**

---

## 📜 License

This project is private to the I75 League.
Contact the repo owner for questions or to collaborate.
