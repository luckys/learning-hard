---
title: Production Build
description: Ship ForumApp with Vite optimisations and bilingual navigation checks.
---

# Production Build

## Scripts & tooling

```json [package.json]
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  }
}
```

> Tip: Run `npm run lint && npm run build` in CI to guarantee the bundle compiles before deployment.

## Vite configuration

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
```

## Deployment checklist

- [ ] Configure environment variables (`VITE_API_URL`, `VITE_SENTRY_DSN`, etc.).
- [ ] Provision storage for attachments (mocked locally, document real provider choices).
- [ ] Enable HTTPS and HTTP/2 on your hosting provider.
- [ ] Add monitoring/analytics (e.g., PostHog, Sentry).

## Local preview & bilingual QA

1. Build the project and run the preview server:

   ```bash [Terminal]
   npm run build
   npm run preview
   ```

2. Visit `http://localhost:4173/en/react` and `http://localhost:4173/es/react`.
3. Validate sidebar navigation, breadcrumbs, and search results in both locales.
4. Toggle dark/light mode (if implemented) and ensure text remains translated.
5. Record regressions or missing translations in the issue tracker.

## Hosting options

- **Vercel** – zero-config deploy; add `npm run build` as build command.
- **Netlify** – configure `npm run build` and publish `dist/`.
- **Cloudflare Pages** – set Node version ≥ 18 and point to `dist/`.

Next, document your release process (changelog, tagging, rollback) to keep the forum reliable.
