---
title: Bilingual Preview Checklist
description: Verify English and Spanish navigation locally before shipping updates.
---

# Bilingual Preview Checklist

## Run the docs workspace

```bash [Terminal]
npm install
npm run dev
```

Visit both locales:

- <http://localhost:3000/en/react>
- <http://localhost:3000/es/react>

## What to verify

1. **Sidebar navigation** – All sections expand/collapse identically in each language.
2. **Breadcrumbs** – Links reflect the locale (`/en/...` vs `/es/...`).
3. **Search modal** – Queries return results in the active locale only.
4. **Interactive components** – Playgrounds and code tabs render without hydration warnings.
5. **External links** – Buttons pointing to English content also offer an Español alternative when relevant.

## Automated checks

Add a basic Playwright smoke test to avoid regressions:

```ts [tests/bilingual.spec.ts]
import { test, expect } from '@playwright/test'

test('english navigation', async ({ page }) => {
  await page.goto('http://localhost:3000/en/react')
  await expect(page.getByRole('link', { name: '2. Project Setup' })).toBeVisible()
})

test('spanish navigation', async ({ page }) => {
  await page.goto('http://localhost:3000/es/react')
  await expect(page.getByRole('link', { name: '2. Configuración del proyecto' })).toBeVisible()
})
```

Run with:

```bash [Terminal]
npm run test:e2e -- --project=chromium
```

Document any missing translations in an issue before releasing.
