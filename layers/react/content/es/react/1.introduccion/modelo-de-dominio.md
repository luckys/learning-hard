---
title: Modelo de dominio
description: Explora las entidades principales del foro antes de implementar las características en React.
---

# Modelo de dominio

| Entidad | Propósito | Relaciones clave |
| --- | --- | --- |
| Usuario | Identifica miembros del foro | tiene Perfil, Hilos, Posts, Adjuntos |
| Perfil | Información pública | pertenece a Usuario |
| Categoría | Agrupa hilos por tema | soporte jerarquía padre-hijo |
| Hilo | Discusión principal | pertenece a Categoría y Usuario |
| Post | Respuesta dentro de un hilo | puede responder a otro Post |
| Adjunto | Archivo de un post | pertenece a Post y Usuario |

## Interfaces TypeScript

```ts
export type Rol = 'user' | 'moderator' | 'admin'

export interface Usuario {
  id: string
  username: string
  email: string
  passwordHash: string
  displayName: string
  avatarUrl: string | null
  role: Rol
  createdAt: string
  lastActiveAt: string
}
// ... resto de interfaces similares a la versión en inglés
```

## Respuesta API

```json
{
  "data": [],
  "links": {},
  "meta": {}
}
```

Consulta la versión en inglés para el listado completo y utilízalo como guía para tus propios contratos.
