---
title: Visión general
description: Comprende la arquitectura de componentes, estado y tipos que mantiene al foro organizado.
---

# Visión general

## Taxonomía de componentes

| Capa | Responsabilidad | Ejemplos |
| --- | --- | --- |
| Páginas | Conectan loaders/actions de React Router con la UI | `ThreadListPage`, `ThreadDetailPage` |
| Layouts | Estructura persistente | `ForumLayout`, `AdminLayout` |
| Componentes UI | Elementos reutilizables | `ThreadCard`, `CategoryBadge`, `Avatar` |
| Hooks y utilidades | Lógica de datos y comportamiento | `useForumApi`, `usePagination`, `formatDate` |

## Estrategia de estado

- **Cache de servidor**: hooks dedicados para lecturas que usan clientes con Zod.
- **Estado local**: `useState` o `useReducer` para formularios complejos.
- **Contexto**: `AuthContext` comparte el usuario autenticado.

## Tipado estricto

- Comparte interfaces desde `types.ts` (ver [Modelo de dominio](/es/react/1.introduccion/modelo-de-dominio)).
- Esquemas Zod reflejan esas interfaces y validan respuestas.
- Los props de componentes siempre deben tiparse explícitamente.

## Estructura de carpetas

```
src/
  components/
  features/
  hooks/
  lib/
  routes/
  styles/
```

Continúa con los fundamentos de componentes en detalle.
