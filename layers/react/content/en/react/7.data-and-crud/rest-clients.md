---
title: REST Clients
description: Implement typed API clients and mutation flows for forum CRUD operations.
---

# REST Clients

## Shared models

```ts [src/types/forum.ts]
export type Role = 'user' | 'moderator' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  passwordHash: string
  displayName: string
  avatarUrl: string | null
  role: Role
  createdAt: string
  lastActiveAt: string
}

export interface Thread {
  id: string
  forumId: string
  authorId: string
  title: string
  slug: string | null
  isPinned: boolean
  viewCount: number
  replyCount: number
  lastPostId: string | null
  createdAt: string
  updatedAt: string
}
```

## Forum API wrapper

```ts [src/lib/forum-api.ts]
import { z } from 'zod'
import { PaginatedResponse, fetchJson } from '@/lib/http'

const ThreadSchema = z.object({
  id: z.string().uuid(),
  forumId: z.string().uuid(),
  authorId: z.string().uuid(),
  title: z.string(),
  slug: z.string().nullable(),
  isPinned: z.boolean(),
  viewCount: z.number(),
  replyCount: z.number(),
  lastPostId: z.string().uuid().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

type Thread = z.infer<typeof ThreadSchema>

export const ForumApi = {
  listThreads: async (params: { page?: number; category?: string }) => {
    const search = new URLSearchParams()
    if (params.page) search.set('page', String(params.page))
    if (params.category) search.set('category', params.category)

    return fetchJson(
      `https://api.example.com/threads?${search.toString()}`,
      PaginatedResponse(ThreadSchema),
    )
  },
  createThread: async (input: { title: string; categoryId: string; content: string }) => {
    const schema = z.object({ data: ThreadSchema })
    return fetchJson('https://api.example.com/threads', schema)
  },
}
```

## Mutation hook skeleton

```ts [src/features/threads/useThreadMutations.ts]
import { useState } from 'react'
import { ForumApi } from '@/lib/forum-api'

type CreateThreadInput = {
  title: string
  categoryId: string
  content: string
}

type MutationState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; error: Error }

export function useThreadMutations() {
  const [state, setState] = useState<MutationState>({ status: 'idle' })

  const createThread = async (input: CreateThreadInput) => {
    setState({ status: 'loading' })
    try {
      await ForumApi.createThread(input)
      setState({ status: 'success' })
    }
    catch (error) {
      setState({ status: 'error', error: error instanceof Error ? error : new Error('Unknown error') })
    }
  }

  return { state, createThread }
}
```

## Deliverables

- `src/lib/forum-api.ts` exposing typed functions for each entity.
- Mutation hooks that surface loading/success/error states.
- UI notifications for optimistic success and rollback on failure.

Continue with [UI & Styling](../8.ui-and-styling/design-system) to polish the experience.
EOF}
