---
title: Architecture Overview
description: Learn how ForumApp structures components, state, and data flow to keep React code maintainable.
---

# Architecture Overview

This section introduces the building blocks that keep the forum UI modular and scalable.

## Component taxonomy

| Layer | Responsibility | Examples |
| --- | --- | --- |
| Pages | Bind React Router loaders/actions to UI | `ThreadListPage`, `ThreadDetailPage` |
| Layouts | Persistent scaffolding | `ForumLayout`, `AdminLayout` |
| UI Components | Visual building blocks | `ThreadCard`, `CategoryBadge`, `Avatar` |
| Hooks & Utils | Behaviour and data access | `useForumApi`, `usePagination`, `formatDate` |

## State strategy

- **Server cache**: Fetch data via dedicated hooks (later integrated with TanStack Query or DIY cache) that rely on typed API clients.
- **Component state**: Local UI state managed with `useState` or `useReducer` for complex forms.
- **Context**: `AuthContext` shares the signed-in user; `ThemeContext` toggles light/dark modes if needed.

## Type safety

- Shared `types.ts` exports the interfaces defined in [Forum Domain Model](/en/react/1.introduction/domain-model).
- Zod schemas mirror those interfaces and provide runtime validation for API responses and form submissions.
- Component props should use explicit interfaces, avoiding `any` or implicit inference for clarity.

## File structure

```
src/
  components/
    layout/
    forum/
  features/
    auth/
    categories/
    threads/
    posts/
  hooks/
  lib/
  routes/
  styles/
```

- `features/*` co-locates UI + hooks + utilities per domain.
- `routes/` holds React Router route modules with loaders/actions and component entry points.

## Next up

Dive into concrete components starting with the forum layout shell in **Component Foundations**.
