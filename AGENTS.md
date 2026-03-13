# Repository Guidelines

## Project Structure & Module Organization
This repository is a Vite 6 + React 19 + TypeScript single-page app. The current app code lives under `src/`, with route pages in `src/pages`, reusable UI in `src/components`, static service data in `src/data`, and custom hooks in `src/hooks`. Public assets belong in `public/`. Build and tooling config sits at the root in `vite.config.ts`, `tsconfig*.json`, `eslint.config.mjs`, and `postcss.config.mjs`.

Use the `@` alias for imports from `src` (example: `@/components/layout/Header`). Keep new files close to the feature they support.

## Build, Test, and Development Commands
- `npm run dev`: starts the Vite dev server for local development.
- `npm run build`: runs TypeScript project checks, then creates the production build in `dist/`.
- `npm run preview`: serves the built app locally for a production-like check.
- `npm run lint`: runs ESLint across the repository.

Install dependencies with `npm install`. There is no dedicated test script configured yet, so `npm run lint` and `npm run build` are the required verification steps before opening a PR.

## Coding Style & Naming Conventions
Follow the existing TypeScript and React style:
- Use 2-space indentation and double quotes.
- Name React components and page files in `PascalCase` (`HomePage.tsx`, `CTAButton.tsx`).
- Use `camelCase` for variables, functions, hooks, and local helpers.
- Prefer functional components and colocate small feature-specific helpers in the same file when practical.

Styling is handled with Tailwind CSS v4 plus project-specific CSS variables in [`src/index.css`](D:/crowdworks/invoice-card-payment-navi/src/index.css). Reuse the existing color tokens and section classes before adding new one-off values.

## Testing Guidelines
Automated tests are not set up yet. For now, validate changes by:
- running `npm run lint`
- running `npm run build`
- manually checking key routes: `/`, `/articles`, and `/articles/:slug`

When adding tests later, place them next to the feature or under `src/__tests__/`, and use `*.test.ts(x)` naming.

## Commit & Pull Request Guidelines
Recent history follows short conventional prefixes such as `feat:`, `fix:`, and `chore:`; keep using that format, optionally with concise Japanese descriptions. Keep commits focused on one change.

PRs should include a short summary, impacted pages/components, manual verification steps, and screenshots or recordings for visible UI changes. Note that `README.md` still contains older Next.js-era content, so treat the Vite structure in this guide as the current source of truth.
