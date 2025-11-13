---
title: Project Setup Overview
description: Prepare the Vite + TypeScript + Tailwind + React Router environment for the forum documentation.
---

# Project Setup Overview

In this chapter you will bootstrap the **ForumApp** React project.

```bash [Terminal]
npm create vite@latest forum-app -- --template react-ts
cd forum-app
npm install
```

Enable strict mode and tooling essentials:

```json [tsconfig.json]
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "bundler",
    "jsx": "react-jsx"
  }
}
```

```bash [Terminal]
npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-config-prettier prettier
npx eslint --init
```

Tailwind CSS setup:

```bash [Terminal]
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```ts [tailwind.config.ts]
import type { Config } from 'tailwindcss'

export default <Config>{
  darkMode: 'class',
  content: ['index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0f172a',
          muted: '#111827',
        },
        primary: '#38bdf8',
        success: '#22c55e',
        danger: '#f87171',
      },
    },
  },
}
```

Routing & validation dependencies:

```bash [Terminal]
npm install react-router-dom zod
```

Create the router entry point:

```tsx [src/main.tsx]
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { routes } from './routes'
import './index.css'

const router = createBrowserRouter(routes)

ReactDOM.createRoot(document.getElementById('root')\!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```

See the checklist below before moving forward.

## Checklist

- [ ] Vite project initialized with TypeScript template.
- [ ] ESLint configured with strict TypeScript rules.
- [ ] Tailwind configured and theme tokens added.
- [ ] React Router installed with base route files.
- [ ] Zod installed for validations.

Continue with **3. React Fundamentals** once your environment is ready.
