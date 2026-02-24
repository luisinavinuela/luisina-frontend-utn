# 💻 Catálogo de Productos - Frontend Client

Este repositorio contiene la interfaz de usuario desarrollada en React para la gestión de productos y autenticación de usuarios, integrada con una API REST profesional.

## 🛠️ Tecnologías y Librerías
* **Framework:** React.js (Vite)
* **Enrutamiento:** React Router (BrowserRouter, Routes, Navigate)
* **Peticiones HTTP:** Fetch API (Nativo)
* **Notificaciones:** SweetAlert2 (vía `generatePopup`)
* **Estilos:** CSS Modules e Inline Styles
* **Documentación IA:** DeepWiki

## 🏗️ Estructura del Proyecto
La arquitectura se organiza en componentes modulares y servicios centralizados:

* **Páginas (`src/pages/`):** Login, Register, Home (Catálogo), About y NotFound.
* **Componentes Globales:** * `Header`: Navegación condicional basada en el estado del usuario.
    * `ProtectedRoute`: Componente de orden superior para restringir acceso a rutas privadas.
* **Contexto (`AuthContext`):** Gestión global de la autenticación y persistencia del usuario.
* **Servicios (`src/services/api.js`):** Funciones CRUD optimizadas para interactuar con los endpoints de productos.

## 🔑 Sistema de Autenticación (JWT)
El frontend gestiona la seguridad de la siguiente manera:
1.  **Persistencia:** El token JWT se almacena en `localStorage` bajo la clave `'token'`.
2.  **Estado Global:** El hook `useAuth()` expone funciones para login, registro y logout en toda la app.
3.  **Seguridad:** Si no se detecta un token válido, el componente `ProtectedRoute` redirige automáticamente al usuario hacia `/login`.

## 🔌 Conexión con la API
La comunicación con el servidor se realiza mediante los siguientes puntos de acceso:
* **Auth:** `http://localhost:50000/auth`
* **Productos:** `http://localhost:50000/products`

> **Nota:** Todas las peticiones a productos incluyen el encabezado `Authorization: Bearer ${token}`.

## 📌 Principales Librerías y Usos
| Librería | Propósito |
| :--- | :--- |
| **React** | Construcción de la UI mediante Hooks (useState, useEffect, useContext). |
| **React Router** | Gestión de navegación y protección de rutas. |
| **SweetAlert2** | Feedback visual para confirmaciones, éxitos y errores. |
| **Fetch API** | Cliente nativo para el intercambio de datos con el Backend. |
 
**[Ver Wiki del Frontend en DeepWiki] https://deepwiki.com/luisinavinuela/luisina-frontend-utn **
