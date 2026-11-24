-- ============================================================
-- 01_schema.sql
-- Creación de la base de datos y tablas
-- ============================================================
CREATE DATABASE IF NOT EXISTS punto_limpio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE punto_limpio;

-- 1. roles
CREATE TABLE IF NOT EXISTS roles (
    id_rol INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- 2. usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_rol INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_rol) REFERENCES roles(id_rol)
);

-- 3. zonas
CREATE TABLE IF NOT EXISTS zonas (
    id_zona INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    id_encargado INT,
    FOREIGN KEY (id_encargado) REFERENCES usuarios(id_usuario)
);

-- 4. calles
CREATE TABLE IF NOT EXISTS calles (
    id_calle INT AUTO_INCREMENT PRIMARY KEY,
    id_zona INT NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    UNIQUE (id_zona, nombre),
    FOREIGN KEY (id_zona) REFERENCES zonas(id_zona)
);

-- 5. tipos_residuo
CREATE TABLE IF NOT EXISTS tipos_residuo (
    id_tipo INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion VARCHAR(255)
);

-- 6. puntos_recoleccion
CREATE TABLE IF NOT EXISTS puntos_recoleccion (
    id_punto INT AUTO_INCREMENT PRIMARY KEY,
    id_calle INT NOT NULL,
    nombre VARCHAR(150),
    referencia TEXT,
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7),
    activo BOOLEAN DEFAULT TRUE,
    creado_por INT NOT NULL,
    fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    fecha_modificacion DATETIME DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_calle) REFERENCES calles(id_calle),
    FOREIGN KEY (creado_por) REFERENCES usuarios(id_usuario)
);

-- 7. punto_tipo_residuo
CREATE TABLE IF NOT EXISTS punto_tipo_residuo (
    id_punto INT NOT NULL,
    id_tipo INT NOT NULL,
    PRIMARY KEY (id_punto, id_tipo),
    FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion(id_punto),
    FOREIGN KEY (id_tipo) REFERENCES tipos_residuo(id_tipo)
);

-- 8. horarios_recoleccion
CREATE TABLE IF NOT EXISTS horarios_recoleccion (
    id_horario INT AUTO_INCREMENT PRIMARY KEY,
    id_punto INT NOT NULL,
    dia_semana ENUM(
        'Lunes','Martes','Miercoles','Jueves',
        'Viernes','Sabado','Domingo'
    ) NOT NULL,
    hora_estimada TIME NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion(id_punto)
);

-- 9. registros_recoleccion
CREATE TABLE IF NOT EXISTS registros_recoleccion (
    id_registro INT AUTO_INCREMENT PRIMARY KEY,
    id_punto INT NOT NULL,
    id_usuario INT NOT NULL,
    fecha_hora DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Realizada','No realizada') NOT NULL,
    observaciones TEXT,
    FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion(id_punto),
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- 10. reportes_ciudadanos
CREATE TABLE IF NOT EXISTS reportes_ciudadanos (
    id_reporte INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_tipo INT NOT NULL,
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    latitud DECIMAL(10,7),
    longitud DECIMAL(10,7),
    fecha_reporte DATETIME DEFAULT CURRENT_TIMESTAMP,
    estado ENUM('Pendiente','En revision','Resuelto','Rechazado')
        DEFAULT 'Pendiente',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    CONSTRAINT fk_reportes_tipo
        FOREIGN KEY (id_tipo) REFERENCES tipos_residuo(id_tipo)
);