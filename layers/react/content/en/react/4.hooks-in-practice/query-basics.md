---
title: Data Fetching with Hooks
description: Build reusable hooks to consume the forum API with strict typing and predictable lifecycles.
---

# Data Fetching with Hooks

Learn how to wrap asynchronous calls to the forum API inside idiomatic React hooks.

## Typed fetch helper

```ts [src/lib/http.ts]
import { z } from 'zod'

const PaginatedResponse = <TData extends z.ZodTypeAny>(schema: TData) => z.object({
  data: z.array(schema),
  links: z.object({
    first: z.string().nullable(),
    last: z.string().nullable(),
    prev: z.string().nullable(),
    next: z.string().nullable(),
  }),
  meta: z.object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total: z.number(),
  }),
})

export async function fetchJson<TData extends z.ZodTypeAny>(input: RequestInfo, schema: TData) {
  const response = await fetch(input)
  if (\!response.ok) {
    throw new Error(`Request failed with status ${response.status}`)
  }
  const json = await response.json()
  return schema.parse(json)
}

export { PaginatedResponse }
```

## `useForumQuery`

```ts [src/hooks/useForumQuery.ts]
import { useEffect, useState } from 'react'

type ForumQueryConfig<TData> = {
  key: string
  fetcher: () => Promise<TData>
}

type ForumQueryState<TData> =
  | { status: 'loading'; data: null; error: null }
  | { status: 'error'; data: null; error: Error }
  | { status: 'success'; data: TData; error: null }

export function useForumQuery<TData>({ key, fetcher }: ForumQueryConfig<TData>): ForumQueryState<TData> & {
  refetch: () => Promise<void>
} {
  const [state, setState] = useState<ForumQueryState<TData>>({ status: 'loading', data: null, error: null })

  const load = async () => {
    try {
      const data = await fetcher()
      setState({ status: 'success', data, error: null })
    }
    catch (error) {
      setState({ status: 'error', data: null, error: error instanceof Error ? error : new Error('Unknown error') })
    }
  }

  useEffect(() => {
    void load()
  }, [key])

  return {
    ...state,
    refetch: async () => {
      setState({ status: 'loading', data: null, error: null })
      await load()
    },
  }
}
```

## Example: categories hook

```ts [src/features/categories/hooks.ts]
import { z } from 'zod'
import { fetchJson, PaginatedResponse } from '@/lib/http'
import { useForumQuery } from '@/hooks/useForumQuery'

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  parentId: z.string().uuid().nullable(),
  order: z.number(),
  createdAt: z.string(),
})

type Category = z.infer<typeof CategorySchema>

export function useCategories() {
  return useForumQuery({
    key: 'categories',
    fetcher: () => fetchJson('https://api.example.com/categories', PaginatedResponse(CategorySchema)),
  })
}
```

## Exercise

1. Create `src/lib/http.ts` with the `fetchJson` helper shown above.
2. Implement `useForumQuery<TData>` and domain-specific hooks.
3. Render data in `ThreadsPage` with skeleton/loading UI states.

## Key takeaways

- Hooks encapsulate side effects and expose metadata (`status`, `refetch`).
- Zod protects against malformed responses and keeps TypeScript inference intact.
- Pagination info (`links`, `meta`) flows directly to the UI.

Continue to [Mutation hooks](./mutation-hooks) next.
