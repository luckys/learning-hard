---
title: Route Structure
description: Map the forum navigation with React Router nested routes and loaders.
---

# Route Structure

Outline how the forum screens connect through React Router v7-style routes.

## Router tree

```tsx [src/routes/index.tsx]
import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '@/layouts/RootLayout'
import { ForumLayout } from '@/layouts/ForumLayout'
import { AdminLayout } from '@/layouts/AdminLayout'
import {
  threadsLoader,
  threadDetailLoader,
  createThreadAction,
} from '@/features/threads/route-handlers'
import { categoriesLoader } from '@/features/categories/route-handlers'
import { requireAuth } from '@/features/auth/guards'

export const routes = createBrowserRouter([
  {
    element: <RootLayout />, // top navigation, theme toggles, auth status
    children: [
      {
        path: '/',
        element: <ForumLayout />, // sidebar filters, search
        loader: categoriesLoader,
        children: [
          {
            index: true,
            loader: threadsLoader,
            lazy: () => import('@/features/threads/pages/AllThreadsPage'),
          },
          {
            path: 'threads/:threadId',
            loader: threadDetailLoader,
            lazy: () => import('@/features/threads/pages/ThreadDetailPage'),
          },
          {
            path: 'threads/new',
            action: createThreadAction,
            lazy: () => import('@/features/threads/pages/CreateThreadPage'),
          },
        ],
      },
      {
        path: 'admin',
        loader: requireAuth('moderator'),
        element: <AdminLayout />, // tabs for dashboard, users, categories
        children: [
          {
            path: 'categories',
            lazy: () => import('@/features/categories/pages/CategoryAdminPage'),
          },
        ],
      },
      {
        path: 'auth',
        lazy: () => import('@/features/auth/routes'),
      },
    ],
  },
])
```

## Loader example

```ts [src/features/threads/route-handlers.ts]
import { defer } from 'react-router-dom'
import { ForumApi } from '@/lib/forum-api'

export const threadsLoader = async ({ request }: { request: Request }) => {
  const url = new URL(request.url)
  const page = Number(url.searchParams.get('page') ?? 1)
  const category = url.searchParams.get('category') ?? undefined

  return defer({
    threads: ForumApi.listThreads({ page, category }),
  })
}
```

## Checklist

- [ ] Root layout provides navigation, search, and authentication status.
- [ ] Nested routes handle categories (`/threads/:categorySlug?`) and thread details (`/threads/:threadId`).
- [ ] Admin routes require authentication middleware.

## Router playground

Visualise the nested flows without leaving the docs:

```mdc
<PlaygroundRouter />
```

Each tab represents a route segment so learners can mentally map the navigation hierarchy before coding it in React Router.

Next: build the form experiences in [Forms & Validation](../6.forms-and-validation/forms-overview).
