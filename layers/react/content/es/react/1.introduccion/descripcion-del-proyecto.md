---
title: Descripción del Proyecto
description: Entiende los objetivos de la aplicación de foro en React y cómo guía el aprendizaje en esta capa de documentación.
---

# Descripción del Proyecto

Esta capa de React enseña las prácticas modernas del ecosistema construyendo una **interfaz de foro** cercana a un producto real. Aquí vas a:

- Crear la base con **Vite + TypeScript**.
- Diseñar la interfaz con **Tailwind CSS** y un tema oscuro inspirado en los mockups.
- Implementar la navegación multi-página con **React Router**.
- Validar datos e inferir tipos con **Zod**.
- Mantener un tipado estricto en componentes, hooks, utilidades y clientes API.

Cada sección alterna entre **conceptos teóricos** y **tareas prácticas** dentro del foro. Encontrarás:

- Ejemplos de código claros y con tipos explícitos.
- Escenarios reales para categorías, hilos, publicaciones y adjuntos.
- Guías para pruebas, despliegue y extensiones futuras.

> **Consejo:** Usa la versión en inglés como referencia principal. La versión en español ofrece traducciones cuidadas y glosarios específicos del dominio del foro.

::alert{type="info"}
Esta documentación también funciona como blueprint para tus propios proyectos. Adapta los ejemplos a las necesidades de tu equipo.
::

## Ruta de aprendizaje

| Sección | Qué construirás | Enfoque de React |
| --- | --- | --- |
| Introducción | Modelo de dominio y decisiones de herramientas | Planificación, modelado tipado |
| Configuración del proyecto | Esqueleto con Vite + Tailwind + Router | Configuración de entorno |
| Fundamentos de React | Componentes base como `ForumLayout` y `ThreadList` | Composición de componentes |
| Hooks en práctica | Hooks de datos con paginación | Hooks y estado compartido |
| Enrutamiento y Layout | Rutas anidadas para hilos y posts | React Router v7 |
| Formularios y validación | Editor de hilos y formularios de auth | Control de formularios + Zod |
| Datos y CRUD | Flujo CRUD para todas las entidades | Mutaciones con UI optimista |
| UI y estilos | Componentes reutilizables en Tailwind | Sistema de diseño |
| Pruebas y calidad | Suites con Vitest y React Testing Library | Estrategia de pruebas |
| Despliegue y próximos pasos | Build de producción y extensiones | Apps listas para producción |

## Stack compartido

- **Lenguaje:** TypeScript con `"strict": true`
- **UI:** Tailwind CSS con tokens para tema oscuro
- **Ruteo:** APIs de datos de React Router, loaders y actions
- **Validación:** Esquemas Zod compartidos entre el cliente y la API ficticia
- **Formato:** ESLint (estricto) + Prettier + Husky (opcional)

## Resultados de aprendizaje

Al finalizar tendrás confianza para:

- Estructurar proyectos React escalables.
- Coordinar estado global y efectos secundarios de forma responsable.
- Construir componentes accesibles y probados con Tailwind.
- Crear documentación bilingüe basada en proyectos reales.

Cuando estés listo, pasa al [modelo de dominio](./modelo-de-dominio) para conocer las entidades principales del foro.
