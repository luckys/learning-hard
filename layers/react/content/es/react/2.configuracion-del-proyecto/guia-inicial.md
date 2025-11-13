---
title: Guía inicial
description: Prepara el entorno con Vite, TypeScript, Tailwind, React Router y Zod para la aplicación de foro.
---

# Guía inicial

## Objetivos

- Crear el proyecto con `npm create vite@latest forum-app -- --template react-ts`.
- Activar `"strict": true` en `tsconfig.json` y configurar ESLint con reglas estrictas.
- Instalar Tailwind CSS con `npm install -D tailwindcss postcss autoprefixer` y generar `tailwind.config.ts`.
- Agregar React Router (`npm install react-router-dom`) y definir rutas para foro, administración y autenticación.
- Incluir Zod (`npm install zod`) para validar datos y derivar tipos.

## Entregables

1. **Esqueleto del proyecto** con `src/main.tsx` y proveedores de router.
2. **Tema base de Tailwind** que refleje el diseño oscuro de los mockups.
3. **Herramientas de desarrollo**: scripts de npm, ESLint + Prettier, hooks opcionales de Husky.

## Checklist

- [ ] Proyecto inicializado con plantilla React + TS.
- [ ] ESLint funcionando con reglas estrictas.
- [ ] Tailwind configurado y tokens de color definidos.
- [ ] React Router instalado con rutas base.
- [ ] Zod instalado y listo para validaciones.

Continúa con **3. Fundamentos de React** para profundizar en la arquitectura.
