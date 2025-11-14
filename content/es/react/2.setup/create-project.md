---
title: Crear el Proyecto
description: Configura un proyecto React con Vite, TypeScript y las herramientas esenciales para nuestra aplicación de foro.
---

# Disclaimer

:::u-alert
---
title: Los comentarios en el código son solo educativos.
description: En proyectos reales, evita comentarios irrelevantes o redundantes.
color: warning
variant: subtle
icon: i-lucide-triangle-alert
---
:::

Vamos a crear nuestro proyecto React con herramientas modernas. Usaremos **Vite** para un desarrollo ultrarrápido y **TypeScript** para seguridad de tipos.

## Crear proyecto Vite

```bash
npm create vite@latest forum-app -- --template react-ts
cd forum-app
npm install
```

Esto crea:
```text
forum-app/
├── node_modules/
├── public/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Instalar dependencias

```bash
# Routing
npm install react-router-dom

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# Styling
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Testing (lo configuraremos después)
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom

# Dev tools
npm install -D @types/node
```

## Configurar TypeScript

Actualiza `tsconfig.json` para modo estricto y path aliases:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    /* Path Aliases */
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

## Configurar Vite

Actualiza `vite.config.ts` para soportar path aliases:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

## Configurar Tailwind CSS

Actualiza `tailwind.config.js` con la paleta de colores de nuestro foro:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forum-bg': '#0f172a',           // slate-900
        'forum-surface': '#1e293b',      // slate-800
        'forum-border': '#334155',       // slate-700
        'forum-text': '#e2e8f0',         // slate-200
        'forum-text-muted': '#94a3b8',   // slate-400
        'forum-primary': '#38bdf8',      // sky-400
        'forum-primary-hover': '#0ea5e9', // sky-500
        'forum-danger': '#ef4444',       // red-500
        'forum-success': '#10b981',      // emerald-500
        'forum-warning': '#f59e0b',      // amber-500
      },
    },
  },
  plugins: [],
}
```

## Actualizar estilos globales

Reemplaza `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  * {
    @apply border-forum-border;
  }
  
  body {
    @apply bg-forum-bg text-forum-text antialiased;
  }

  /* Input styles */
  input[type="text"],
  input[type="email"],
  input[type="password"],
  input[type="search"],
  select,
  textarea {
    @apply w-full px-4 py-2.5 bg-forum-surface border border-forum-border rounded-lg;
    @apply text-forum-text placeholder:text-forum-text-muted;
    @apply focus:outline-none focus:ring-2 focus:ring-forum-primary focus:border-transparent;
    @apply transition-colors;
  }

  /* Button base */
  button {
    @apply transition-colors font-medium rounded-lg;
  }
}

@layer components {
  /* Card component */
  .card {
    @apply bg-forum-surface border border-forum-border rounded-xl p-6;
  }

  /* Primary button */
  .btn-primary {
    @apply px-4 py-2.5 bg-forum-primary text-forum-bg;
    @apply hover:bg-forum-primary-hover;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Secondary button */
  .btn-secondary {
    @apply px-4 py-2.5 bg-forum-surface text-forum-text;
    @apply border border-forum-border hover:bg-forum-border;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }

  /* Danger button */
  .btn-danger {
    @apply px-4 py-2.5 bg-forum-danger text-white;
    @apply hover:bg-forum-danger/90;
    @apply disabled:opacity-50 disabled:cursor-not-allowed;
  }
}
```

## Crear estructura de carpetas

```bash
mkdir -p src/{components/{layout,forum,ui},features/{auth,threads,posts,admin},hooks,lib,types,__tests__}
```

Estructura final:
```text
src/
├── components/
│   ├── layout/        # Navbar, Footer, Container
│   ├── forum/         # ThreadCard, PostCard, Reply
│   └── ui/            # Button, Input, Badge
├── features/
│   ├── auth/          # Sign in, Sign up
│   ├── threads/       # Thread list, detail, create
│   ├── posts/         # Post, reply, vote
│   └── admin/         # Category management
├── hooks/             # Custom hooks
├── lib/               # Utilities, API client
├── types/             # TypeScript types
├── __tests__/         # Test files
├── App.tsx
├── main.tsx
├── index.css
└── vite-env.d.ts
```

## Crear definiciones de tipos

Crea `src/types/index.ts` con nuestro modelo de dominio:

```typescript
// src/types/index.ts

export type UserRole = 'user' | 'moderator' | 'admin'

export interface User {
  id: string
  username: string
  email: string
  displayName: string
  avatarUrl: string | null
  role: UserRole
  createdAt: string
  lastActiveAt: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string | null
  parentId: string | null
  order: number
  createdAt: string
  updatedAt: string
  children?: Category[]
}

export interface Thread {
  id: string
  categoryId: string
  authorId: string
  title: string
  slug: string | null
  isPinned: boolean
  isLocked: boolean
  viewCount: number
  replyCount: number
  lastPostId: string | null
  createdAt: string
  updatedAt: string
  author?: User
  category?: Category
}

export interface Post {
  id: string
  threadId: string
  parentPostId: string | null
  authorId: string
  content: string
  voteScore: number
  isEdited: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
  author?: User
  replies?: Post[]
}
```

## Probar la configuración

Inicia el servidor de desarrollo:

```bash
npm run dev
```

Visita http://localhost:5173 — deberías ver la página por defecto de Vite + React con estilos oscuros.

## Limpiar

Elimina los archivos por defecto que no usaremos:

```bash
rm src/App.css
```

Actualiza `src/App.tsx` a una versión mínima:

```tsx
function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card max-w-md">
        <h1 className="text-3xl font-bold text-forum-text mb-4">
          Forum App
        </h1>
        <p className="text-forum-text-muted">
          Ready to build! 🚀
        </p>
      </div>
    </div>
  )
}

export default App
```

## Verificar configuración

Tu proyecto debería ahora:
- ✅ Compilar con éxito con `npm run dev`
- ✅ Mostrar tema oscuro (fondo slate)
- ✅ Soportar TypeScript en modo estricto
- ✅ Tener Tailwind CSS configurado
- ✅ Soportar import aliases con `@/`

## Next Steps

¡Proyecto listo! Ahora configuremos **testing** y escribamos nuestro primer componente usando TDD.

Next: [Setup Vitest →](/es/react/2.setup/setup-vitest)
