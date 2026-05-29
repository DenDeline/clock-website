# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 15 application using the App Router. Application routes live in `src/app`, including `page.tsx`, `layout.tsx`, `robots.ts`, `sitemap.ts`, and the dynamic clock route at `src/app/clocks/[id]/page.tsx`.

Reusable UI belongs in `src/components`, with each component kept in its own folder and re-exported through `index.ts`. Shared helpers live in `src/utils`, shared theme setup is in `src/theme.ts`, and ambient TypeScript declarations are in `src/types`. Static public assets are stored in `public`.

## Build, Test, and Development Commands

Use pnpm, matching the repository package manager.

- `pnpm dev`: starts the local Next.js development server.
- `pnpm build`: creates a production build and catches type/build regressions.
- `pnpm start`: serves the production build locally after `pnpm build`.
- `pnpm lint`: runs the configured Next.js ESLint checks.
- `pnpm exec prettier --write .`: formats files using the repo Prettier config.

## Coding Style & Naming Conventions

Write TypeScript and React components in the existing style. Prettier is configured with no semicolons, single quotes, and single quotes in JSX. Keep formatting tool-driven rather than hand-aligned.

Use PascalCase for React component files and component names, such as `Clock.tsx` and `PageBlock.tsx`. Use camelCase for utility functions and values. Keep folder-level `index.ts` files for public exports when adding reusable modules.

## Testing Guidelines

There is currently no dedicated test framework or `test` script. For now, validate changes with `pnpm lint` and `pnpm build`, and manually check affected routes in `pnpm dev`.

When adding tests later, prefer colocated tests near the code they cover, using names like `Clock.test.tsx` or `clock.test.ts`. Add the test command to `package.json` so contributors have one standard entry point.

## Commit & Pull Request Guidelines

Commit history follows short Conventional Commit-style subjects, for example `feat: add home page as prototype`, `refactor: add fade animation to clock`, and `chore: update build/deploy workflow to dispatch on tags`.

Use concise commit subjects in the form `type: summary`, where common types include `feat`, `fix`, `refactor`, and `chore`.

Pull requests should include a brief description of the change, the routes or components affected, validation performed (`pnpm lint`, `pnpm build`, screenshots when UI changes), and any linked issue or deployment context.

## Agent-Specific Instructions

Keep edits scoped and consistent with the existing App Router structure. Do not introduce new tooling, dependencies, or test frameworks unless the task requires it. Prefer updating existing component and utility patterns over creating new abstractions.
