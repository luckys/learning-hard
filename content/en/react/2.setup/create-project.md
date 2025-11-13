---
title: Create Project
description: Set up a React project with Vite, TypeScript, and essential tooling for our forum application.
---

# Disclaimer

:::u-alert
---
title: Comments in the code are for educational purposes only.
description: In real projects, avoid adding irrelevant or redundant comments.
color: warning
variant: subtle
icon: i-lucide-triangle-alert
---
:::

Let's create our React project with modern tooling. We'll use **Vite** for blazing-fast development and **TypeScript** for type safety.

## Create Vite Project

```bash
npm create vite@latest forum-app -- --template react-ts
cd forum-app
npm install
```

This creates:
```
forum-app/
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Install Dependencies

```bash
# Routing
npm install react-router-dom

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Testing (we'll set this up next)
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Dev tools
npm install -D @types/node
```

## Configure TypeScript

Update `tsconfig.json` for strict mode and path aliases:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Configure Vite

Update `vite.config.ts` to support path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## Configure Tailwind CSS

Update `tailwind.config.js` with our forum color palette:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forum-bg': '#0f172a',           // slate-900
        'forum-surface': '#1e293b',      // slate-800
        'forum-border': '#334155',       // slate-700
        'forum-text': '#e2e8f0',         // slate-200
        'forum-text-muted': '#94a3b8',   // slate-400
        'forum-primary': '#38bdf8',      // sky-400
        'forum-primary-hover': '#0ea5e9', // sky-500
        'forum-danger': '#ef4444',       // red-500
        'forum-success': '#10b981',      // emerald-500
        'forum-warning': '#f59e0b',      // amber-500
      },
    },
  },
  plugins: [],
}
```

## Update Global Styles

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-forum-border;
  }
  
  body {
    @apply bg-forum-bg text-forum-text antialiased;
  }

  /* Input styles */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="search"],
  select,
  textarea {
    @apply w-full px-4 py-2.5 bg-forum-surface border border-forum-border rounded-lg;
    @apply text-forum-text placeholder:text-forum-text-muted;
    @apply focus:outline-none focus:ring-2 focus:ring-forum-primary focus:border-transparent;
    @apply transition-colors;
  }

  /* Button base */
  button {
    @apply transition-colors font-medium rounded-lg;
  }
}

@layer components {
  /* Card component */
  .card {
    @apply bg-forum-surface border border-forum-border rounded-xl p-6;
  }

  /* Primary button */
  .btn-primary {
    @apply px-4 py-2.5 bg-forum-primary text-forum-bg;
    @apply hover:bg-forum-primary-hover;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Secondary button */
  .btn-secondary {
    @apply px-4 py-2.5 bg-forum-surface text-forum-text;
    @apply border border-forum-border hover:bg-forum-border;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Danger button */
  .btn-danger {
    @apply px-4 py-2.5 bg-forum-danger text-white;
    @apply hover:bg-forum-danger/90;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }
}
```

## Create Folder Structure

```bash
mkdir -p src/{components/{layout,forum,ui},features/{auth,threads,posts,admin},hooks,lib,types,__tests__}
```

Final structure:
```
src/
├── components/
│   ├── layout/        # Navbar, Footer, Container
│   ├── forum/         # ThreadCard, PostCard, Reply
│   └── ui/            # Button, Input, Badge
├── features/
│   ├── auth/          # Sign in, Sign up
│   ├── threads/       # Thread list, detail, create
│   ├── posts/         # Post, reply, vote
│   └── admin/         # Category management
├── hooks/             # Custom hooks
├── lib/               # Utilities, API client
├── types/             # TypeScript types
├── __tests__/         # Test files
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## Create Type Definitions

Create `src/types/index.ts` with our domain model:

```typescript
// src/types/index.ts

export type UserRole = 'user' | 'moderator' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
  lastActiveAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  order: number
  createdAt: string
  updatedAt: string
  children?: Category[]
}

export interface Thread {
  id: string
  categoryId: string
  authorId: string
  title: string
  slug: string | null
  isPinned: boolean
  isLocked: boolean
  viewCount: number
  replyCount: number
  lastPostId: string | null
  createdAt: string
  updatedAt: string
  author?: User
  category?: Category
}

export interface Post {
  id: string
  threadId: string
  parentPostId: string | null
  authorId: string
  content: string
  voteScore: number
  isEdited: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  author?: User
  replies?: Post[]
}
```

## Test the Setup

Start the dev server:

```bash
npm run dev
```

Visit http://localhost:5173 - you should see the Vite + React default page with dark styling.

## Clean Up

Delete the default files we won't use:

```bash
rm src/App.css
```

Update `src/App.tsx` to a minimal version:

```tsx
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md">
        <h1 className="text-3xl font-bold text-forum-text mb-4">
          Forum App
        </h1>
        <p className="text-forum-text-muted">
          Ready to build! 🚀
        </p>
      </div>
    </div>
  )
}

export default App
```

## Verify Setup

Your project should now:
- ✅ Build successfully with `npm run dev`
- ✅ Show dark theme (slate background)
- ✅ Support TypeScript with strict mode
- ✅ Have Tailwind CSS configured
- ✅ Support `@/` import aliases

## Next Steps

Project is ready! Now let's set up **testing** and write our first component using TDD.

Next: [Setup Vitest →](/en/react/2.setup-and-first-test/setup-vitest)
