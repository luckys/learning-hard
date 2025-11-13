---
title: Hooks de mutación
description: Gestiona operaciones de creación, edición y borrado con UI optimista.
---

# Hooks de mutación

## Estrategia

- Envuelve cada mutación en un hook dedicado que exponga estados (`isLoading`, `isError`).
- Usa actualizaciones optimistas para que la interfaz responda al instante.
- Centraliza el manejo de errores para mostrar mensajes consistentes.

## Ejemplo: mutaciones de hilos

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

## Patrón de UI optimista

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

## Conexión con actions de Router

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
      {/* campos del formulario */}
      <button
        type="submit"
        className="btn btn-primary"
        disabled={navigation.state === 'submitting' || state.status === 'loading'}
      >
        {navigation.state === 'submitting' ? 'Creando…' : 'Crear hilo'}
      </button>
      {state.status === 'error' && <p className="text-danger-400">{state.error.message}</p>}
    </Form>
  )
}
```

## Checklist

- [ ] Los hooks devuelven estados de carga/éxito/error.
- [ ] Las actualizaciones optimistas agregan y reemplazan hilos temporalmente.
- [ ] Valida la entrada con Zod antes de llamar al API.

Continúa con [UI y estilos](../8.ui-y-estilos/sistema-de-diseno) cuando tengas mutaciones robustas.
