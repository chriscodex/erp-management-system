## 🧩 Estructura del Frontend

Este proyecto utiliza **Next.js 14 con App Router**, organizado por **dominios funcionales** en la carpeta `app/`. Se busca mantener una estructura modular, reusable y escalable, basada en buenas prácticas y UI consistente.

### 🧱 Tecnologías principales

- **Next.js 14** (App Router, layouts, loading.js, server actions)
- **TailwindCSS** + **shadcn/ui** para el diseño de interfaces
- **React Hook Form** + **Zod** para validación de formularios
- **NextAuth.js** para autenticación con JWT
- **Framer Motion** para animaciones
- **Axios** (con funciones wrapper en `src/lib/fetchData.js`)
- **Radix UI (headless)** y **Lucide Icons**

### 📁 Organización general

- `app/` contiene subcarpetas por dominio (como `usuarios`, `inventario`, `ventas`, etc.).
- Cada dominio incluye:
  - Su propio `page.jsx`
  - Su propio `loading.jsx`
  - En algunos casos, `layout.jsx` y subcarpetas como `_components` y `_services`
- `src/components/` contiene componentes globales compartidos (como `Navbar`, `Sidebar`, `LoadingSkeleton`, etc.)
- `src/hooks/` contiene hooks globales como `useMobile`
- `src/lib/` agrupa lógica utilitaria, validadores, formateadores de fechas y funciones de acceso a datos (`fetchData`, `urls`, etc.)

### 🔒 Autenticación

- El login se realiza con `next-auth` usando **credenciales (DNI + contraseña)**.
- Se protege el acceso por rol desde el server side (ej: si el usuario no es `Administrador`, se llama a `notFound()`).
- La sesión se valida y refresca usando JWT. Se cancela si el usuario fue eliminado o su token expiró.

### ⚙️ Flujo de uso

- Las vistas tipo CRUD se basan en formularios controlados por React Hook Form y validación con Zod.
- Cada módulo tiene su propio archivo `requests.js` dentro de `_services/`, donde se hacen llamadas al backend.
- Las llamadas del frontend acceden directamente a **servicios de la capa backend** (`@/backend/*/application/*.service.js`) gracias a la integración monorepo con acceso compartido.

### 💡 Consideraciones para Copilot

- Copilot debe sugerir código React con JSX moderno y semántico.
- Los formularios deben usar `react-hook-form` y manejar errores con `formState.errors`.
- Los estilos deben seguir los patrones de Tailwind + clases utilitarias definidas por shadcn.
- Para iconos, se usa principalmente `lucide-react`.
- Las sugerencias de diseño deben considerar la estructura del layout (navbar dinámico, uso de `<Card>`, `Label`, etc.).

## 🧭 Estructura y Convenciones de las Vistas (Front)

Las interfaces principales del sistema están ubicadas dentro del directorio `app/`, organizadas por módulos funcionales. Cada módulo tiene una estructura CRUD predecible:

### 🧱 Convención por módulo

Cada módulo del sistema tiene su propia subcarpeta dentro de `app/`, por ejemplo: `usuarios/`, `ventas/`, `inventario/`, `gastos-generales/`, etc. La estructura es:

- `/modulo/` – Lista de todos los elementos (por ejemplo, usuarios)
- `/modulo/nuevo` – Formulario para agregar un nuevo elemento
- `/modulo/[id]` – Vista de detalle o edición (ruta dinámica en Next.js)

**Ejemplo real**:

- `/usuarios/` – Lista de usuarios
- `/usuarios/nuevo` – Formulario para crear un usuario
- `/usuarios/[id]` – Detalle o edición del usuario

Las rutas dinámicas usan la convención de Next.js (`[id]`) y algunas operaciones como eliminar se ejecutan mediante `AlertDialog`.

### 🧩 Estructura general de cada `page.jsx`

Una página típica contiene:

- `getServerSession(authOptions)` para validar la sesión actual
- Validación de permisos según el rol (`Administrador`, `Vendedor`, `Técnico`)
- Condición `notFound()` si el usuario no tiene permiso para la vista
- Layout estructurado con `NavbarSimple`, `Card`, `Label`, íconos de Lucide
- Acciones como "Agregar" enlazadas con `<Link>` a `/modulo/nuevo`
- Renderizado de tablas con `<DataTable />`, usando columnas y datos ordenados

### 🧑‍⚖️ Control por Rol

- El rol se obtiene desde la sesión (`session.user.rol`)
- Si el usuario no tiene el rol necesario, se llama directamente a `notFound()`
- Solo el **Administrador** tiene acceso completo. Los **Vendedores** y **Técnicos** tienen restricciones tanto de rutas como de acciones (botones ocultos o bloqueados).

### 🗂 Módulos disponibles actualmente

Cada uno de estos módulos tiene CRUD:

- **Usuarios**: Gestión de usuarios del sistema
- **Contactos**: Gestión de contactos de clientes (clientes y proveedores)
- **Empresas**: Gestión de empresas asociadas
- **Inventario**: Gestión de almacenes, categorías, marcas, motos y productos.
- **Ventas**: Registro de ventas y cobros
- **Gastos Generales**: Registro de gastos del negocio
- **Configuración**: Parámetros del sistema (moneda, impuestos, etc.)

Nota: `home/`, `dashboard/` y `estadisticas/` son vistas especiales sin estructura CRUD tradicional. Estas se renderizan en base a datos agregados, gráficos o cards de resumen.
