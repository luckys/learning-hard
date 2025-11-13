---
title: Forms Overview
description: Set up the forum’s form handling using controlled inputs, React Hook Form, and Zod.
---

# Forms Overview

## Schemas first

```ts [src/features/auth/schemas.ts]
import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
})

export type SignInInput = z.infer<typeof signInSchema>
```

## Sign In form component

```tsx [src/features/auth/components/SignInForm.tsx]
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signInSchema, type SignInInput } from '../schemas'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

type Props = {
  onSubmit: (data: SignInInput) => Promise<void>
}

export function SignInForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div>
        <label className="block text-sm font-medium text-slate-200" htmlFor="email">
          Email
        </label>
        <Input id="email" type="email" {...register('email')} />
        {errors.email && <p className="text-xs text-danger-400">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-200" htmlFor="password">
          Password
        </label>
        <Input id="password" type="password" {...register('password')} />
        {errors.password && <p className="text-xs text-danger-400">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  )
}
```

## Thread composer snippet

```tsx [src/features/threads/components/ThreadComposer.tsx]
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { threadInputSchema, type ThreadInput } from '../schemas'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

export function ThreadComposer({ onSubmit }: { onSubmit: (data: ThreadInput) => Promise<void> }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ThreadInput>({
    resolver: zodResolver(threadInputSchema),
    defaultValues: {
      title: '',
      categoryId: '',
      content: '',
      attachments: [],
    },
  })

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="text" className="hidden" {...register('attachments')} />

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-100" htmlFor="title">
          Thread title
        </label>
        <input id="title" className="input" {...register('title')} />
        {errors.title && <span className="text-xs text-danger-400">{errors.title.message}</span>}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-semibold text-slate-100" htmlFor="content">
          Your post
        </label>
        <Textarea id="content" rows={8} {...register('content')} />
        {errors.content && <span className="text-xs text-danger-400">{errors.content.message}</span>}
      </div>

      <Button type="submit" disabled={isSubmitting} variant="primary">
        {isSubmitting ? 'Posting…' : 'Post thread'}
      </Button>
    </form>
  )
}
```

## Steps

1. Install dependencies: `npm install react-hook-form @hookform/resolvers`.
2. Define Zod schemas for `SignInInput`, `SignUpInput`, `ThreadInput`.
3. Implement reusable form components with Tailwind styling.
4. Handle optimistic submission states and display server-side API errors.

Next: [Data & CRUD](../7.data-and-crud/rest-clients) to wire forms with API calls.

## Interactive playground

Experiment with the UX directly inside the docs using the embedded playground:

```mdc
<PlaygroundForm>
  <template #preview>
    <p class="text-sm text-slate-300">Try signing in with a sample account to see validation feedback.</p>
  </template>
</PlaygroundForm>
```

The Vue playground mirrors the React form validations so you can rehearse error states before implementing them in React Hook Form.
