---
title: Estructura de rutas
description: Define las rutas anidadas del foro con React Router y sus loaders.
---

# Estructura de rutas

## Objetivos

- Configurar un árbol `createBrowserRouter` con rutas públicas y de administración.
- Implementar loaders para listas de hilos y detalles que consumen el cliente API tipado.
- Definir actions para crear hilos, responder posts y gestionar categorías.

## Checklist

- [ ] Layout raíz con navegación, búsqueda y estado de sesión.
- [ ] Rutas anidadas para categorías (`/threads/:categorySlug?`) y detalles (`/thread/:threadId`).
- [ ] Rutas de administración protegidas por autenticación.

## Playground de rutas

Visualiza los segmentos principales sin salir de la documentación:

```mdc
<PlaygroundRouter />
```

Cada pestaña representa un tramo del enrutamiento y ayuda a relacionar la jerarquía antes de implementarla con React Router.

Continúa con [Formularios y validación](../6.formularios-y-validacion/resumen) para conectar los formularios con las rutas.
