---
title: Build de producción
description: Prepara ForumApp para deployment y valida la navegación bilingüe.
---

# Build de producción

## Scripts y tooling

```json [package.json]
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint \"src/**/*.{ts,tsx}\""
  }
}
```

## Configuración de Vite

```ts [vite.config.ts]
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['react-router-dom'],
        },
      },
    },
  },
})
```

## Checklist de despliegue

- [ ] Variables de entorno (`VITE_API_URL`, `VITE_SENTRY_DSN`).
- [ ] Almacenamiento para adjuntos (mock local + proveedor real opcional).
- [ ] HTTPS habilitado en el hosting.
- [ ] Monitorización y analítica configuradas.

## Preview local y QA bilingüe

```bash [Terminal]
npm run build
npm run preview
```

1. Abre `http://localhost:4173/en/react` y `http://localhost:4173/es/react`.
2. Revisa navegación lateral, breadcrumbs y búsqueda en ambos idiomas.
3. Comprueba que los botones y llamadas a la acción se traducen correctamente.
4. Documenta cualquier falta de traducción o bug visual.

## Opciones de hosting

- **Vercel** – build `npm run build`, salida `dist/`.
- **Netlify** – comandos iguales con publish dir `dist`.
- **Cloudflare Pages** – Node >= 18, output `dist/`.

Cierra el ciclo con una checklist de release (tags, notas y plan de rollback).
