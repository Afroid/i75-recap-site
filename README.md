# 🏈 I75 League - Fantasy Football Recaps

Welcome to the official repository for the **I75 League**, a private Fantasy Football league.
This project transforms years of weekly email recaps into a clean, dynamic, modern web experience.

Built with **Next.js**, **TypeScript**, **TailwindCSS**, **Framer Motion**, **ESLint (Flat Config)**, **Husky**, and **Lint-Staged**.

🧠 Full project wiki available here: [**I75 League Wiki**](https://github.com/Afroid/i75-recap-site/wiki)

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

## 🧐 Future Plans

- Admin login per league
- Multiple league support
- Upload GIFs/screenshots to CDN
- Dark mode
- Mobile app (possible)

---

## ✍️ Author

**John Brady**

---

## 📜 License

This project is private to the I75 League.
Contact the repo owner for questions.
