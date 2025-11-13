# React Documentation Layer

This layer houses the React documentation for the forum application example. Content is organised in numbered sections to generate the sidebar navigation automatically.

## Content architecture

1. **Introduction**
   - Project overview
   - Forum domain model reference
2. **Project Setup**
   - Tooling (Vite + TypeScript, ESLint, Prettier)
   - Tailwind CSS configuration
   - React Router and folder structure
3. **React Fundamentals**
   - Components, props, & strict typing patterns
   - State and derived data
   - Rendering lists & conditional UI
4. **Hooks in Practice**
   - Core hooks (useState, useEffect, useMemo)
   - Custom hooks for API access & pagination
   - Context and reducers for shared state
5. **Routing & Layout**
   - Route definitions and loaders/actions with React Router
   - Nested routes for category/thread/post flows
   - Protected routes for authenticated areas
6. **Forms & Validation**
   - Controlled forms with React Hook Form or custom controllers
   - Zod schemas for validation and TypeScript inference
   - Authentication forms (Sign in / Sign up)
7. **Data & CRUD Features**
   - API modelling & pagination helpers
   - CRUD flows for categories, threads, posts, attachments
   - Optimistic updates & error handling strategies
8. **UI & Styling**
   - Tailwind design system adaptation (dark theme from mockups)
   - Reusable components (buttons, cards, avatars, editor shell)
9. **Testing & Quality**
   - Unit testing with Vitest and React Testing Library
   - Integration testing for routing and forms
10. **Deployment & Next Steps**
    - Build optimisation tips
    - Extending the forum features (notifications, moderation tools)

Each section contains bilingual content (`content/en` and `content/es`). The English pages are the source of truth; Spanish pages provide curated translations and practical vocabulary for the forum domain.

## Layer specifics

- **Nuxt layer**: extended in `nuxt.config.ts` via `./layers/react`.
- **Content**: placed under `layers/react/content/<locale>` to keep the React docs scoped to this layer.
- **Assets & components** (future): add custom Vue components under `layers/react/app/components` when needed for interactive demos.
- **Playgrounds**: Vite + React snippets will live under `layers/react/content/playgrounds` once we embed runnable examples.
