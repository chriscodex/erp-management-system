# Copilot Instructions

Este proyecto es una aplicación web construida con Next.js 13, usando el App Router. Utiliza TailwindCSS y MongoDB para manejar la base de datos.

## Convenciones de código

- Todo lo relacionado a funciones asíncronas, se deben usar dentro de una sentencia try-catch

- Todas las rutas están en la carpeta `app/`
- Preferimos Server Components excepto donde sea necesario usar Client
- Formato con Prettier y eslint
- Usa `use client` solo cuando sea indispensable
- Los formularios usan React Hook Form
- La autenticación está basada en NextAuth
