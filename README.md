# 365 Cartas

Diario digital construido con React, Vite y Firebase.

## Arquitectura

El código de `src` se organiza por responsabilidad:

```text
src/
├── components/
│   ├── layout/       # Estructuras visuales compartidas
│   └── ui/           # Controles reutilizables (botones, etc.)
├── context/          # Proveedores de contexto global
├── features/
│   ├── admin/        # Panel y componentes de administración
│   ├── auth/         # Interfaz de autenticación
│   └── letters/      # Banner, cuerpo, secciones, cartas y modales
├── hooks/            # Hooks compartidos
├── pages/            # Composición de cada pantalla
├── services/         # Acceso a Firebase y APIs
└── styles/           # Estilos globales y por área
```

Las páginas solo coordinan datos y componen *features*. Cada feature contiene
sus componentes específicos, mientras que los elementos genéricos viven en
`components/ui` o `components/layout`.

## Scripts

- `yarn dev`: inicia el servidor de desarrollo.
- `yarn build`: genera el paquete de producción.
- `yarn lint`: ejecuta las validaciones estáticas.
- `yarn preview`: sirve localmente el paquete de producción.
