---
title: Forum Domain Model
description: Explore the data structures behind the forum application before implementing React features.
---

# Forum Domain Model

Understanding the entities in the forum keeps the React implementation grounded. The backend is mocked, but the data shapes mirror a production-ready design.

## Entity overview

| Entity | Purpose | Key relationships |
| --- | --- | --- |
| User | Identifies members of the forum | owns Profile, Threads, Posts, Attachments |
| Profile | Stores public profile details | belongs to User |
| Category | Organises threads by topic | parent-child hierarchy |
| Thread | Represents a discussion topic | belongs to Category and User |
| Post | Individual messages in a thread | can reply to another Post |
| Attachment | File added to a post | belongs to Post and User |

## TypeScript models

```ts
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

export interface Profile {
  id: string
  userId: User['id']
  bio: string | null
  language: string
  updatedAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  order: number
  createdAt: string
}

export interface Thread {
  id: string
  forumId: string
  authorId: User['id']
  title: string
  slug: string | null
  isPinned: boolean
  viewCount: number
  replyCount: number
  lastPostId: string | null
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  threadId: Thread['id']
  parentPostId: string | null
  authorId: User['id']
  content: string
  createdAt: string
  updatedAt: string
}

export interface Attachment {
  id: string
  postId: Post['id']
  uploaderId: User['id']
  filename: string
  contentType: string
  url: string
  sizeBytes: number
  createdAt: string
}
```

## API response format

All endpoints return paginated data with link metadata:

```json
{
  "data": [
    {
      "id": "20ec4e8e-6769-4d62-8a52-bdd3bb94b35f",
      "name": "Alex Doe",
      "email": "alex@example.com"
    }
  ],
  "links": {
    "first": "https://api.example.com/users?page=1",
    "last": "https://api.example.com/users?page=1",
    "prev": null,
    "next": null
  },
  "meta": {
    "current_page": 1,
    "from": 1,
    "last_page": 1,
    "path": "https://api.example.com/users",
    "per_page": 15,
    "to": 1,
    "total": 1
  }
}
```

Later chapters show how to consume this shape with a typed fetcher utility.

## Next steps

Proceed to [tooling setup](../2.project-setup/start-here) to configure Vite, TypeScript, ESLint, Tailwind, and testing infrastructure.
