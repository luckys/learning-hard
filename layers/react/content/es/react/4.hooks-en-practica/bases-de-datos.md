---
title: Bases de datos
description: Crea hooks reutilizables para consumir la API del foro con tipado estricto y estados predecibles.
---

# Hooks de datos

## Objetivos

- Definir un cliente HTTP tipado que use Zod para validar respuestas.
- Implementar `useForumQuery` y hooks concretos como `useCategories`.
- Gestionar estados de carga, error y paginación para las vistas del foro.

## Pasos

1. Crear `src/lib/http.ts` con un helper `fetchJson` tipado.
2. Implementar `useForumQuery<TData>` con argumentos `{ key, fetcher }`.
3. Construir hooks específicos para categorías, hilos y posts.
4. Mostrar datos en `ThreadsPage` con estados vacíos y mensajes de error.

## Resultado

- Hooks listos para integrarse con React Router loaders.
- Estado consistente (`isLoading`, `error`, `refetch`) disponible para la UI.

Continúa con [Mutaciones](./mutaciones) para manejar operaciones CRUD.
