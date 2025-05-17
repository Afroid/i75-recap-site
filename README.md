# 🏈 I75 League - Fantasy Football Recaps

Welcome to the official repository for the **I75 League**, a private Fantasy Football league.
This project transforms years of weekly email recaps into a clean, dynamic, modern web experience.

Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Framer Motion**, **ESLint (Flat Config)**, **Husky**, **Lint-Staged**, and more.

🧠 Full project wiki available here: [**I75 League Wiki**](https://github.com/Afroid/i75-recap-site/wiki)

---

## 🚀 Badges

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

🧪🧠 Full testing wiki available here: [**I75 League Testing**](https://github.com/Afroid/i75-recap-site/wiki/I75-League-Testing)

### Scripts

| Script                   | What it does                                                          |
| ------------------------ | --------------------------------------------------------------------- |
| `npm test`               | Run **all** tests once (jsdom environment)                           |
| `npm run test:watch`     | Run tests in **watch** mode                                          |
| `npm run test:coverage`  | Generate **coverage** reports (HTML + text-summary + lcov)           |
| `npx jest <path>`        | Run **only** the specified test file, e.g.:<br>`npx jest pages/index.test.tsx` |

### Coverage

After running:
```bash
npm run test:coverage

-   **HTML report**: `coverage/lcov-report/index.html`

-   **Terminal summary**: printed automatically

Open the HTML file in your browser for detailed insights.

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

✅ Code will auto-lint on every commit.
✅ Trailing spaces, formatting, and basic rules are enforced automatically.

---

## 📁 Project Structure (high-level)

```
/components       → UI components (Header, Navbar, Drawer, etc.)
/data/recaps      → JSON recap content (by year)
/lib              → Utility libraries (e.g., getRecaps.ts)
/pages            → Routes (dynamic year/week routing)
/public           → Static assets (images, icons)
/styles           → TailwindCSS global styles
/types            → TypeScript types (RecapData, RecapWeek, etc.)
.vscode           → Project-wide VS Code settings (optional)
.husky            → Git hooks
```

---

## ✍️ Author

**The John**

---

## 📜 License

This project is private to the I75 League.
Contact the repo owner for questions or to collaborate.
