# Punto Limpio

Aplicación web full stack para gestionar la recolección de residuos de una localidad. Los vecinos consultan en un mapa interactivo los puntos de recolección, aprenden a reciclar y reportan basurales; el administrador (municipalidad) gestiona los datos del sistema.

## Descripción del sistema

**Qué resuelve:** concentra en un solo lugar la información de la recolección de residuos (dónde, cuándo y qué tipo de residuo se recibe) y permite que los ciudadanos avisen de acumulaciones de basura para que puedan ser atendidas.

**Funcionalidades principales**

- **Mapa interactivo** (Leaflet y OpenStreetMap) con los puntos de recolección y los reportes ciudadanos de basurales.
  - Un usuario con sesión iniciada puede marcar un basural en el mapa, con una descripción y un tipo de residuo.
  - El administrador puede, además, cargar puntos de recolección desde el mapa.
- **Registro e inicio de sesión** con JWT y contraseñas cifradas con bcrypt, con dos roles: `administrador` y `usuario`.
- **Panel del usuario** (`/mi-panel`), con el resumen de sus reportes.
- **Panel de administración** (`/admin`, solo para administradores) con gestión completa (alta, listado, modificación y baja) de:
  - roles y usuarios,
  - tipos de residuo,
  - zonas y calles,
  - puntos de recolección y los tipos de residuo que recibe cada uno,
  - horarios de recolección y registros de recolección,
  - reportes ciudadanos.
- **Estadísticas e impacto** (solo administrador), con posibilidad de exportar a PDF.
- **Sección «Aprende a reciclar»** y asistente **EcoBot** en la página de inicio.

Las rutas protegidas se validan en el backend (token y rol), no solo ocultando botones en la interfaz.

## Integrantes

| Nombre y apellido | Rol / aporte |
|---|---|
| Chuchuy Linares| Backend de Autenticación y Seguridad |
| Maximiliano Lorenzo | Panel de Administración ,de Usuario,Modulo Estadistica ,Puntos y Diseño de pagina |
| Montero Yonathan | Módulo de Mapa, Reportes, Zonas y Calles |

## Tecnologías

| Capa | Tecnologías |
|---|---|
| Frontend | React 19, Vite 8, React Router 7, Zustand (estado global), Leaflet y react-leaflet, lucide-react, jsPDF, CSS propio |
| Backend | Node.js, Express 5, mysql2 (consultas parametrizadas), jsonwebtoken, bcrypt, express-validator, cors, dotenv, nodemon |
| Base de datos | MySQL 8 (10 tablas relacionadas) |
| Herramientas | pnpm, Git y GitHub |

El repositorio es un monorepo con tres carpetas principales:

- `client/`: aplicación React.
- `server/`: API REST con Express.
- `database/`: documento con el esquema de la base de datos y el script con los datos iniciales.

## Requisitos

- **Node.js** 20.19 o superior (o 22.12 o superior). Se desarrolló con Node.js 22 y 24.
- **pnpm** 9 o superior (se usó la versión 12).
- **MySQL** 8.0 o superior, y un cliente para ejecutar sentencias SQL (MySQL Workbench, DBeaver o la línea de comandos `mysql`).
- **Git**.

Puertos que usa el proyecto: `3000` para la API, `5173` para el frontend y `3306` para MySQL.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Juanchuchuy/MonoRepo-PuntoLimpio.git
cd MonoRepo-PuntoLimpio