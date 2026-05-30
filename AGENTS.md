# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 application using the App Router and static export. Application routes and route metadata live in `src/app`, including `page.tsx`, `layout.tsx`, `providers.tsx`, `robots.ts`, `sitemap.ts`, and `opengraph-image.tsx`.

Reusable UI belongs in `src/components`, with each component kept in its own folder and re-exported through `index.ts`. `LifeClockApp` owns the client-side form state, localStorage-backed clock config, and MUI dialog flow. `Clock` renders the live clock display. Shared date/time and URL helpers live in `src/utils`, shared MUI theme setup is in `src/theme.ts`, and ambient TypeScript declarations are in `src/types`. Static public assets are stored in `public`.

## Build, Test, and Development Commands

Use pnpm, matching the repository package manager (`pnpm@11.4.0`). Use Node `24.16.0`, matching `.nvmrc`.

- `pnpm dev`: starts the local Next.js development server.
- `pnpm build`: creates a static production build in `out` because `next.config.ts` sets `output: 'export'`; it also catches type/build regressions.
- `pnpm start`: serves the production build locally after `pnpm build`.
- `pnpm lint`: runs ESLint directly with the configured Next.js flat config.
- `pnpm exec prettier --write .`: formats files using the repo Prettier config.

Husky runs lint-staged on pre-commit, and lint-staged formats staged files with Prettier.

## Coding Style & Naming Conventions

Write TypeScript and React components in the existing style. Prettier is configured with no semicolons, single quotes, and single quotes in JSX. Keep formatting tool-driven rather than hand-aligned.

Use PascalCase for React component files and component names, such as `Clock.tsx` and `PageBlock.tsx`. Use camelCase for utility functions and values. Keep folder-level `index.ts` files for public exports when adding reusable modules.

The app uses React 19, MUI 9, Dayjs, React Hook Form, and Zod. Prefer the existing MUI component patterns, Dayjs date values, Zod validation, and `@/*` TypeScript path alias instead of introducing parallel approaches.

## Testing Guidelines

There is currently no dedicated test framework or `test` script. For now, validate changes with `pnpm lint` and `pnpm build`, and manually check affected routes in `pnpm dev`.

When adding tests later, prefer colocated tests near the code they cover, using names like `Clock.test.tsx` or `clock.test.ts`. Add the test command to `package.json` so contributors have one standard entry point.

## Commit & Pull Request Guidelines

Commit history follows short Conventional Commit-style subjects, for example `feat: add home page as prototype`, `refactor: add fade animation to clock`, and `chore: update build/deploy workflow to dispatch on tags`.

Use concise commit subjects in the form `type: summary`, where common types include `feat`, `fix`, `refactor`, and `chore`.

Pull requests should include a brief description of the change, the routes or components affected, validation performed (`pnpm lint`, `pnpm build`, screenshots when UI changes), and any linked issue or deployment context.

GitHub Pages deployment is configured in `.github/workflows/nextjs.yml`. It runs on `v*` tags or manual dispatch, builds with pnpm, and uploads the static `./out` artifact.

## Agent-Specific Instructions

Keep edits scoped and consistent with the existing App Router structure and static-export deployment. Do not introduce new tooling, dependencies, or test frameworks unless the task requires it. Prefer updating existing component, utility, theme, and provider patterns over creating new abstractions.

When working on Next.js behavior, use the project-level Next.js DevTools MCP integration when it is available. Call the `next-devtools-mcp` `init` tool first to establish current Next.js context, and use `nextjs_docs` for framework and API questions instead of relying on stale assumptions. When `pnpm dev` is running, use `nextjs_index` to discover the active dev server, then use `nextjs_call` for runtime tools such as `get_errors`, `get_logs`, `get_page_metadata`, and `get_project_metadata`.

Prefer MCP runtime diagnostics before guessing about hydration, routing, metadata, build, or runtime errors. For UI verification, use browser tooling after MCP diagnostics or when visual interaction and screenshots are specifically needed.

## Use the mui-mcp server to answer any MUI questions --

- 1. call the "useMuiDocs" tool to fetch the docs of the package relevant in the question
- 2. call the "fetchDocs" tool to fetch any additional docs if needed using ONLY the URLs present in the returned content.
- 3. repeat steps 1-2 until you have fetched all relevant docs for the given question
- 4. use the fetched content to answer the question
