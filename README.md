# Business Management System - ERP for Retail <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white"> <img src="https://img.shields.io/badge/React-1c2c4c?style=flat&logo=react&logoColor=61DAFB"> <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white"> <img src="https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=radixui&logoColor=white"> <img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"> <img src="https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white"> <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white"> <img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"> <img src="https://img.shields.io/badge/Git-F1502F?style=flat&logo=git&logoColor=white"> <img src="https://img.shields.io/badge/GitHub-000000?style=flat&logo=github&logoColor=white">


This repository contains the core web platform of an ERP system built with Next.js 14 using server side ecosystem. The solution follows clean, modular architectural principles and is designed to scale horizontally, with a structure that can be decoupled into microservices as the platform grows. It supports core operational workflows—including sales, inventory, expenses, companies, and user management—while ensuring consistent user experience, maintainability, and long-term extensibility.

---

## 🧱 Core Technologies

- **Next.js 14** (App Router, layouts, loading.js, server actions)
- **TailwindCSS** + **shadcn/ui** for UI styling
- **React Hook Form** + **Zod** for form validation
- **NextAuth.js** using JWT
- **Framer Motion** for animations
- **Axios** with a custom wrapper (`src/lib/fetchData.js`)
- **Radix UI** (headless) and **Lucide Icons**

---

## 🧩 Frontend Architecture

The project follows a domain-based structure inside `app/`, ensuring clean separation between pages, components, and service logic.

### 📁 General Structure

```
app/
  users/
    page.jsx
    loading.jsx
    layout.jsx
    _components/
    _services/
  inventory/
  sales/
  ...
src/
  components/   # Global shared components
  hooks/        # Shared hooks
  lib/          # Utilities, validators, fetchData, URL helpers, formatters
```

---

## 🔒 Authentication & Authorization

Authentication is implemented with **NextAuth.js** using username/password credentials.

### Key Features

- Secure sessions with **JWT**
- Server-side validation via `getServerSession`
- Role-based access control using `session.user.role`
- Unauthorized users are redirected to `notFound()`
- Automatic session invalidation if the user is deleted or the token expires

---

## ⚙️ View Layer Workflow

All CRUD views follow a uniform and predictable pattern.

### 📝 Forms

- Built with **React Hook Form**
- Schema validation with **Zod**
- Error handling via `formState.errors`
- Reusable UI components from shadcn (Input, Select, FormField, etc.)

### 🔗 Service Layer

Each module includes a `requests.js` file inside `_services/`, which:

- Performs HTTP requests to the backend
- Handles errors and response transformation
- Accesses backend services inside the monorepo, such as:

```
@/backend/*/application/*.service.js
```

### 📊 Tables & Lists

- Implemented with `<DataTable />`
- Typed columns
- Integrated sorting
- Edit/Delete actions through `AlertDialog`

---

## 🧭 Routing & Module Conventions

Each module inside `app/` follows the same path structure:

```
/module/        → List view
/module/new     → Create form
/module/[id]    → Detail or edit view
```

Example:

```
/users/
/users/new
/users/[id]
```

### Typical `page.jsx` Structure

- Session validation with `getServerSession(authOptions)`
- Permission checking
- Layout using `NavbarSimple`, `Card`, `Label`, and Lucide icons
- “Add” button linking to `/module/new`
- Table rendering via `<DataTable />`

---

## 🧑‍⚖️ Role Management

Supported roles:

- **Administrator**
- **Seller**
- **Technician**

Rules:

- Only **Administrator** has full access
- Unauthorized access → `notFound()`
- Restricted visibility or disabled actions depending on the role

---

## 🗂 Available Modules

Each module implements full CRUD operations:

- **Users** – System user management  
- **Contacts** – Clients and suppliers  
- **Companies** – Associated businesses  
- **Inventory** – Categories, brands, warehouses, products, and motorcycles  
- **Sales** – Sales records and customer payments  
- **General Expenses** – Business expense tracking  
- **Settings** – System configuration (currency, taxes, etc.)

### Special dashboards (non-CRUD)

- **home/**
- **dashboard/**
- **statistics/**

These render aggregated data, metrics, charts, and summary cards.

---

## 💡 Copilot Style Guidelines

To maintain consistency across the project:

- Suggest modern React code with clean JSX
- Forms must use **react-hook-form** + **Zod**
- Styling with Tailwind + shadcn
- Animations with **Framer Motion**
- Icons from **lucide-react**
- Follow established patterns for layout, spacing, and typography

---

## 📦 Installation & Running

```bash
npm install
npm run dev
```

> The frontend requires the backend included in the monorepo to retrieve real data.

---

## 📜 License

Internal use only — academic and demonstration purposes.
