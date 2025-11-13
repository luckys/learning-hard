---
title: Estrategia
description: Asegura la calidad con Vitest, React Testing Library y pruebas end-to-end.
---

# Estrategia de pruebas

## Objetivos

- Configurar Vitest con entorno jsdom y utilidades de Testing Library.
- Probar hooks y componentes clave del foro con mocks de la API.
- Considerar pruebas end-to-end (Playwright/Cypress) para flujos críticos.

## Pasos

1. Instala `vitest`, `@testing-library/react`, `@testing-library/user-event` y `@testing-library/jest-dom`.
2. Crea `vitest.config.ts` con alias y setup para `jest-dom`.
3. Implementa utilidades `renderWithProviders` que envuelvan router y contextos.
4. Añade suites para formularios de auth y paginación de hilos.

Continúa con [Despliegue y próximos pasos](../10.despliegue-y-proximos-pasos/build-produccion).
