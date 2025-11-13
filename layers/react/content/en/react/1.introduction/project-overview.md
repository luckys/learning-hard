---
title: Project Overview
description: Understand the goals of the React forum application and how it drives the learning journey in this documentation layer.
---

# Project Overview

The React layer teaches modern React by building a **forum interface** that mirrors a professional product. You will:

- Scaffold the project with **Vite + TypeScript**.
- Style the UI with **Tailwind CSS** in a dark theme inspired by the provided mockups.
- Implement multi-page navigation using **React Router**.
- Validate data and infer types with **Zod**.
- Apply strict typing everywhere—components, hooks, helpers, and API clients.

Each section alternates between **concept explanations** and **hands-on forum tasks**. Expect to see:

- Code samples focused on clarity and strict types.
- Domain-specific examples for categories, threads, posts, and attachments.
- Guidance on testing, deployment, and extensibility.

> **Tip:** Use the English version as the source of truth. Spanish pages deliver curated translations plus vocabulary aids for React terminology.

::alert{type="info"}
This documentation doubles as a blueprint for your own React projects. Fork the examples and adapt them to your team's needs.
::

## Curriculum journey

| Section | What you will build | React focus |
| --- | --- | --- |
| Introduction | Domain model and project tooling decisions | Planning, type modelling |
| Project Setup | Vite + Tailwind + Router skeleton | Environment configuration |
| React Fundamentals | Core components such as `ForumLayout` and `ThreadList` | Component composition |
| Hooks in Practice | Data fetching hooks with pagination | Hooks and state sharing |
| Routing & Layout | Nested routes for threads and posts | React Router v7 concepts |
| Forms & Validation | Thread composer, sign in/sign up forms | Form control + Zod integration |
| Data & CRUD | CRUD flows for all forum entities | Data mutations with optimistic UI |
| UI & Styling | Extracting reusable Tailwind components | Design systems |
| Testing & Quality | Vitest suites for hooks and views | Testing strategy |
| Deployment & Next Steps | Production builds and enhancements | Ship-ready React apps |

## Shared Stack

- **Language:** TypeScript with `"strict": true`
- **UI:** Tailwind CSS with dark theme tokens
- **Routing:** React Router data APIs, loaders, and actions
- **Validation:** Zod schemas shared between client and mock API
- **Formatting:** ESLint (strict) + Prettier + Husky (optional)

## Learning outcomes

By the end you will be comfortable with:

- Structuring React projects for scalability.
- Coordinating global state and side effects responsibly.
- Building accessible, well-tested components with Tailwind.
- Translating React concepts into bilingual documentation.

Ready? Continue to the [domain model](./domain-model) for the entities powering the forum.
