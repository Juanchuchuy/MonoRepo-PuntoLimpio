# MonoRepo-PuntoLimpio

Aplicación web full stack para gestionar la recolección de residuos de una localidad. Los vecinos pueden consultar en un mapa los puntos de recolección, conocer qué residuos se reciben y realizar reportes ciudadanos. El administrador puede gestionar la información y supervisar las operaciones del sistema.

## Descripción del sistema

PuntoLimpio centraliza la información sobre la recolección de residuos: dónde se encuentran los puntos, qué tipos de residuos reciben y cuáles son sus horarios. También permite que los ciudadanos informen la presencia de basurales o acumulaciones de residuos.

### Funcionalidades principales

- Mapa interactivo con puntos de recolección y reportes ciudadanos.
- Registro e inicio de sesión mediante JWT y contraseñas protegidas con bcrypt.
- Acceso diferenciado según el rol del usuario.
- Panel del usuario con información de sus reportes.
- Panel de administración para gestionar:
  - Roles y usuarios.
  - Tipos de residuos.
  - Zonas y calles.
  - Puntos de recolección y tipos de residuos que reciben.
  - Horarios y registros de recolección.
  - Reportes ciudadanos.
- Estadísticas e información de impacto, con exportación a PDF.
- Sección educativa «Aprende a reciclar» y asistente EcoBot.

Las rutas protegidas se verifican tanto en el frontend como en el backend. El servidor valida el token y los permisos antes de permitir las operaciones restringidas.

## Integrantes

| Integrante          | Rol / aporte                                                                                 |
| ------------------- | -------------------------------------------------------------------------------------------- |
| Chuchuy Linares     | Backend de autenticación y seguridad                                                        |
| Maximiliano Lorenzo | Panel de administración y de usuario, módulo de estadísticas, puntos y diseño de página |
| Montero Yonathan    | Módulo de mapa, reportes, zonas y calles                                                    |

## Tecnologías

| Capa          | Tecnologías                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------- |
| Frontend      | React 19, Vite 8, React Router 7, Zustand, Leaflet, react-leaflet, lucide-react, jsPDF y CSS |
| Backend       | Node.js, Express 5, mysql2, jsonwebtoken, bcrypt, zod, cors y dotenv                         |
| Base de datos | MySQL 8                                                                                      |
| Herramientas  | pnpm, Git y GitHub                                                                           |

## Estructura del repositorio

El proyecto está organizado como un monorepo:

```text
MonoRepo-PuntoLimpio/
├── client/       # Aplicación frontend desarrollada con React
├── server/       # API REST desarrollada con Node.js y Express
└── database/     # Scripts SQL, datos de prueba y diagrama de la base de datos
```

## Requisitos previos

Antes de instalar el proyecto, es necesario contar con:

- Node.js 20.19 o superior (o 22.12 o superior).
- pnpm 9 o superior.
- MySQL 8.0 o superior.
- Git.
- Un cliente para ejecutar scripts SQL, como MySQL Workbench, DBeaver o la consola de MySQL.

Puertos utilizados por defecto:

- Frontend: `5173`.
- Backend/API: `3000`.
- MySQL: `3306`.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/Juanchuchuy/MonoRepo-PuntoLimpio.git
cd MonoRepo-PuntoLimpio
```

### 2. Preparar la base de datos

Los scripts SQL de creación y carga de datos de prueba se encuentran dentro de la carpeta `database/`.

Si los archivos se distribuyen comprimidos en `database.rar`, primero hay que extraer su contenido dentro de la carpeta `database/`. Una vez extraídos, **los cuatro scripts deben ejecutarse en orden numérico**, respetando la siguiente secuencia:

1. `01_CrearDByTablas.sql` — creación de la base de datos y sus tablas.
2. `02_CrearUsers.sql` — creación/carga de los usuarios necesarios para el sistema.
3. `03_DATOS1.sql` — carga del primer conjunto de datos de prueba.
4. `04_DATOS2reportes.sql` — carga del segundo conjunto de datos de prueba, incluidos los reportes.

Se pueden ejecutar desde MySQL Workbench, DBeaver o la consola de MySQL. Es importante respetar el orden indicado para que las tablas y los datos relacionados estén disponibles cuando se ejecuten los scripts posteriores.

**No ejecutar los archivos fuera de orden.** Si se necesita volver a cargar la base de datos desde cero, seguir nuevamente la secuencia completa sobre una base limpia, teniendo en cuenta que los scripts de inserción pueden generar errores si los registros ya existen.

### 3. Configurar las variables de entorno del backend

Desde la carpeta `server/`, crear un archivo `.env` copiando el archivo de ejemplo:

```bash
cd server
```

En Windows:

```powershell
Copy-Item .env.example .env
```

En Linux o macOS:

```bash
cp .env.example .env
```

Editar `server/.env` y completar los valores correspondientes a la instalación local de MySQL:

```env
# Base de datos
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CLAVE_MYSQL
DB_NAME=punto_limpio

# Servidor
PORT=3000
CLIENT_URL=http://localhost:5173

# Seguridad
JWT_SECRET=REEMPLAZAR_POR_UNA_CLAVE_SECRETA_PROPIA
ID_USUARIO_PRUEBA=1
```

Reemplazar `DB_USER`, `DB_PASSWORD` y `DB_NAME` según la configuración local. También se debe establecer un valor propio y seguro para `JWT_SECRET`. No compartir ni subir el archivo `.env` al repositorio.

### 4. Instalar dependencias e iniciar el backend

Desde la carpeta `server/`:

```bash
pnpm install
pnpm dev
```

El servidor se ejecutará por defecto en:

```text
http://localhost:3000
```

Para iniciar el backend en modo producción:

```bash
pnpm start
```

### 5. Instalar dependencias e iniciar el frontend

Abrir otra terminal y ejecutar:

```bash
cd client
pnpm install
pnpm dev
```

Vite mostrará la dirección local del frontend, normalmente:

```text
http://localhost:5173
```

El frontend se comunica con la API del backend. Si la dirección de la API debe cambiarse, revisar la configuración de `VITE_API_URL` utilizada por el cliente.

## Usuarios de prueba

Los usuarios de demostración se cargan mediante los scripts SQL ubicados en `database/`. Una vez ejecutados, se pueden utilizar las cuentas de prueba definidas en esos scripts para comprobar los distintos roles y permisos.

Las credenciales de prueba son exclusivamente para desarrollo y demostración local. No deben utilizarse en un entorno de producción.

## Diagrama entidad-relación

El diagrama de la base de datos se encuentra en la carpeta `database/`, junto con los scripts SQL.

![Diagrama entidad-relación de PuntoLimpio](<database/Relacion%20DB.png>)

## Base de datos

La base de datos es relacional y está compuesta por tablas vinculadas mediante claves primarias y foráneas. El diagrama entidad-relación se encuentra en la carpeta `database/`.

Los scripts de la base de datos deben ejecutarse en el orden numérico indicado en la sección «Preparar la base de datos».

## Consideraciones

- El backend comprueba la conexión con MySQL al iniciarse. Si no puede conectarse, no inicia el servidor.
- El backend requiere que `JWT_SECRET` esté definido en el archivo `.env`.
- El token de autenticación se envía desde el frontend mediante el encabezado `Authorization: Bearer`.
- Las operaciones restringidas verifican la autenticación y el rol en el backend.
- No subir archivos `.env`, contraseñas reales ni claves secretas al repositorio.

## Equipo y repositorio

Repositorio: [MonoRepo-PuntoLimpio](https://github.com/Juanchuchuy/MonoRepo-PuntoLimpio)
