# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**Development:**

- `npm run dev` - Start Vite development server with HMR
- `npm run build` - TypeScript build + Vite production build
- `npm run preview` - Preview production build

**Code Quality:**

- `npm run format:check` - Check code formatting with Prettier
- `npm run format` - Auto-format code with Prettier
- `npm run lint` - Run ESLint checks
- `npm run typecheck` - TypeScript type checking
- `npm run all` - Run format, lint, typecheck, and test sequentially

**Testing:**

- `npm test` - Run BDD tests with Playwright
- `npm run test:ui` - Run tests in Playwright UI mode

See [TESTING.md](TESTING.md) for testing patterns and architecture.

## Architecture

This is a React + TypeScript application using Vite as the build tool and Tailwind CSS for styling.

### Code Style

- Prettier: no semicolons, single quotes, Tailwind class sorting
- ESLint: TypeScript-ESLint with React Hooks rules

### BDD Workflow

The project follows a structured BDD workflow with five commands:

```
/discover         → DISCOVERY.yml (structured requirements)
/formulate        → feature files (Gherkin scenarios)
/automate-red     → step definitions (tests fail)
/automate-green   → implementation (tests pass)
/automate-refactor → refactor code (tests stay green)
```
