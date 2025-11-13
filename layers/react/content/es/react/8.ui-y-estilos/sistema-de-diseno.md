---
title: Sistema de diseño
description: Construye un sistema de diseño con Tailwind inspirado en los mockups del foro.
---

# Sistema de diseño

## Objetivos

- Configurar tokens de Tailwind para colores, tipografía y espaciado del tema oscuro.
- Crear componentes reutilizables: botones, badges, tarjetas, avatares, alertas y paginación.
- Documentar variantes y estados para mantener consistencia visual.

## Pasos

1. Extiende `tailwind.config.ts` con la paleta personalizada (`surface`, `primary`, `accent`).
2. Define utilidades o plugins para tokens semánticos (`--surface-muted`, `--border-strong`).
3. Implementa componentes en `src/components/ui/` con props tipadas (`variant`, `size`).
4. Documenta los componentes en un `styleguide` o Storybook.

Continúa con [Pruebas y calidad](../9.pruebas-y-calidad/estrategia) para asegurar la robustez.
