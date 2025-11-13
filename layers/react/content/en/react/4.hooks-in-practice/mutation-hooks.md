---
title: Mutation Hooks
description: Handle create, update, and delete operations with optimistic UI patterns.
---

# Mutation Hooks

## Strategy

- Wrap mutations in dedicated hooks that expose status flags.
- Use optimistic updates for responsive UI, reverting on failure.
- Share error handling helpers to map API problems to form feedback.

## Example: thread mutations

```ts [src/features/threads/useThreadMutations.ts]
import { useState } from 'react'
import { ForumApi } from '@/lib/forum-api'
import type { ThreadInput } from './schemas'

type MutationStatus =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success' }
  | { status: 'error'; error: Error }

export function useThreadMutations() {
  const [state, setState] = useState<MutationStatus>({ status: 'idle' })

  const createThread = async (input: ThreadInput) => {
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

## Optimistic UI pattern

```ts [src/features/threads/useOptimisticThreads.ts]
import { useState } from 'react'
import type { Thread } from '@/types/forum'

export function useOptimisticThreads(initial: Thread[]) {
  const [threads, setThreads] = useState(initial)

  const prependThread = (pending: Thread) => {
    setThreads((current) => [pending, ...current])
  }

  const settleThread = (id: string, resolved: Thread) => {
    setThreads((current) => current.map(thread => thread.id === id ? resolved : thread))
  }

  const revertThread = (id: string) => {
    setThreads((current) => current.filter(thread => thread.id \!== id))
  }

  return { threads, prependThread, settleThread, revertThread }
}
```

## Linking with Router actions

```ts [src/features/threads/pages/CreateThreadPage.tsx]
import { Form, useActionData, useNavigation } from 'react-router-dom'
import { threadInputSchema } from '../schemas'
import { useThreadMutations } from '../useThreadMutations'

export async function action({ request }: { request: Request }) {
  const formData = Object.fromEntries(await request.formData())
  const parsed = threadInputSchema.parse(formData)
  await ForumApi.createThread(parsed)
  return null
}

export default function CreateThreadPage() {
  const actionData = useActionData()
  const navigation = useNavigation()
  const { state } = useThreadMutations()

  return (
    <Form method="post" className="space-y-6">
      {/* form fields here */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={navigation.state === 'submitting' || state.status === 'loading'}
      >
        {navigation.state === 'submitting' ? 'Creating…' : 'Create thread'}
      </button>
      {state.status === 'error' && <p className="text-danger-400">{state.error.message}</p>}
    </Form>
  )
}
```

## Checklist

- [ ] Return status flags (`isLoading`, `isSuccess`, `isError`) for UI state.
- [ ] Use optimistic helpers for quick feedback.
- [ ] Validate input before hitting the API.

Continue with [UI & Styling](../8.ui-and-styling/design-system) once mutations feel solid.
