---
title: Clientes REST
description: Implementa clientes tipados para operaciones CRUD del foro.
---

# Clientes REST

## Objetivos

- Crear un `ForumApiClient` que envuelva `fetch` y valide con Zod.
- Implementar helpers para categorías, hilos, posts, adjuntos y autenticación.
- Soportar paginación, filtros y actualizaciones optimistas.

## Pasos

1. Define esquemas Zod para respuestas con `data`, `links` y `meta`.
2. Implementa métodos `listCategories`, `createThread`, `updatePost`, `deleteAttachment`, etc.
3. Conecta estos métodos con hooks como `useThreadMutations` y componentes del admin.
4. Maneja errores mediante uniones discriminadas para mostrar feedback.

Continúa con [UI y estilos](../8.ui-y-estilos/sistema-de-diseno) para alinear la experiencia visual.
