---
title: Testing Strategy
description: Validate ForumApp with Vitest, React Testing Library, and end-to-end scenarios.
---

# Testing Strategy

## Objectives

- Configure Vitest with jsdom environment and React Testing Library utilities.
- Write unit tests for hooks (`useForumQuery`, mutation hooks) with mocked fetchers.
- Cover components with integration tests focusing on accessibility and user flows.
- Optionally run Playwright or Cypress for critical end-to-end paths (auth, thread CRUD).

## Steps

1. Install tooling: `npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom`.
2. Add `vitest.config.ts` with path aliases and jsdom setup.
3. Create test utilities (`renderWithProviders`) to wrap Router and contexts.
4. Implement sample tests for SignIn form validation and Thread list pagination.

## Deliverables

- Test suites inside `src/__tests__` grouped by feature.
- GitHub Actions workflow (optional) running lint, test, and build.
- Documentation on how to run tests (`npm test`, `npm run test:watch`).

Next: [Production Build](../10.deployment-and-next-steps/production-build) to ship the app.
