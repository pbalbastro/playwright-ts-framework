# Playwright TS Framework

A TypeScript end-to-end test framework built on [Playwright](https://playwright.dev/), using the Page Object Model. Currently targets [saucedemo.com](https://www.saucedemo.com) as the application under test.

## Project structure

```
constants/        Shared enums (e.g. UserRole)
pages/             Page Object classes (e.g. LoginPage)
test-data/         Fixture data used by tests (e.g. users.json)
tests/             Test specs
tests-examples/    Sample Playwright specs (from `npm init playwright`)
playwright.config.ts   Playwright configuration
.github/workflows/     CI workflow (GitHub Actions)
```

## Prerequisites

- Node.js (LTS recommended)
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running tests

```bash
# Run all tests headless
npx playwright test

# Run in headed / UI mode
npx playwright test --headed
npx playwright test --ui

# Run a specific file
npx playwright test tests/sauce-demo.spec.ts

# Run tests by tag
npx playwright test --grep @smoke

# View the last HTML report
npx playwright show-report
```

## Configuration

Defined in [playwright.config.ts](playwright.config.ts):

- **Base URL**: `https://www.saucedemo.com`
- **Test directory**: `./tests`
- **Browser**: Chromium (Firefox/WebKit and mobile viewports are pre-wired but commented out)
- **Trace**: captured on first retry
- **Screenshots**: captured on failure
- **Reporter**: HTML (`playwright-report/`)

## Test data & users

Login credentials are defined in [test-data/users.json](test-data/users.json) and referenced by role via the [UserRole](constants/user-roles.ts) enum. `LoginPage.login(role)` looks up the matching user and signs in.

## CI

Tests run automatically on push/PR to `main`/`master` via [.github/workflows/playwright.yml](.github/workflows/playwright.yml), with the HTML report uploaded as a build artifact.
