-- PuntoLimpio · Esquema de la base de datos (MySQL 8)
-- Crea la base y las 10 tablas del diagrama entidad-relación.
-- ATENCIÓN: al volver a ejecutarlo borra las tablas y TODOS sus datos (útil para rehacer la base desde cero).
-- Orden de ejecución: 01_schema.sql -> seed_auth.sql (roles y usuarios de prueba) -> demás seeds.

CREATE DATABASE IF NOT EXISTS puntolimpio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE puntolimpio;

-- Se borra en orden inverso a las dependencias (primero las tablas que referencian a otras).
DROP TABLE IF EXISTS registros_recoleccion;
DROP TABLE IF EXISTS reportes_ciudadanos;
DROP TABLE IF EXISTS horarios_recoleccion;
DROP TABLE IF EXISTS punto_tipo_residuo;
DROP TABLE IF EXISTS puntos_recoleccion;
DROP TABLE IF EXISTS calles;
DROP TABLE IF EXISTS zonas;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS tipos_residuo;
DROP TABLE IF EXISTS roles;

-- ---------------------------------------------------------------- Seguridad
CREATE TABLE roles (
  id_rol      INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(30)  NOT NULL,
  descripcion VARCHAR(150) NULL,
  PRIMARY KEY (id_rol),
  UNIQUE KEY uq_roles_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE usuarios (
  id_usuario     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_rol         INT UNSIGNED NOT NULL,
  nombre         VARCHAR(50)  NOT NULL,
  apellido       VARCHAR(50)  NOT NULL,
  email          VARCHAR(100) NOT NULL,
  password_hash  VARCHAR(255) NOT NULL,           -- hash de bcrypt, nunca la contraseña
  activo         TINYINT(1)   NOT NULL DEFAULT 1, -- 0 = cuenta desactivada (no puede iniciar sesión)
  fecha_registro DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario),
  UNIQUE KEY uq_usuarios_email (email),
  CONSTRAINT fk_usuarios_rol FOREIGN KEY (id_rol) REFERENCES roles (id_rol)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------- Territorio
CREATE TABLE zonas (
  id_zona      INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre       VARCHAR(80)  NOT NULL,
  id_encargado INT UNSIGNED NULL,                 -- usuario responsable de la zona
  PRIMARY KEY (id_zona),
  UNIQUE KEY uq_zonas_nombre (nombre),
  CONSTRAINT fk_zonas_encargado FOREIGN KEY (id_encargado) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE TABLE calles (
  id_calle INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_zona  INT UNSIGNED NOT NULL,
  nombre   VARCHAR(100) NOT NULL,
  PRIMARY KEY (id_calle),
  UNIQUE KEY uq_calles_zona_nombre (id_zona, nombre),
  CONSTRAINT fk_calles_zona FOREIGN KEY (id_zona) REFERENCES zonas (id_zona)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------- Recolección
CREATE TABLE tipos_residuo (
  id_tipo     INT UNSIGNED NOT NULL AUTO_INCREMENT,
  nombre      VARCHAR(50)  NOT NULL,
  descripcion VARCHAR(150) NULL,
  PRIMARY KEY (id_tipo),
  UNIQUE KEY uq_tipos_residuo_nombre (nombre)
) ENGINE=InnoDB;

CREATE TABLE puntos_recoleccion (
  id_punto           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  id_calle           INT UNSIGNED  NOT NULL,
  nombre             VARCHAR(100)  NOT NULL,
  referencia         VARCHAR(200)  NULL,
  latitud            DECIMAL(10,7) NOT NULL,
  longitud           DECIMAL(10,7) NOT NULL,
  activo             TINYINT(1)    NOT NULL DEFAULT 1,
  creado_por         INT UNSIGNED  NULL,
  fecha_creacion     DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_modificacion DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id_punto),
  CONSTRAINT fk_puntos_calle FOREIGN KEY (id_calle) REFERENCES calles (id_calle)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_puntos_creador FOREIGN KEY (creado_por) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE SET NULL
) ENGINE=InnoDB;

-- Relación muchos a muchos: qué tipos de residuo recibe cada punto.
CREATE TABLE punto_tipo_residuo (
  id_punto INT UNSIGNED NOT NULL,
  id_tipo  INT UNSIGNED NOT NULL,
  PRIMARY KEY (id_punto, id_tipo),
  CONSTRAINT fk_ptr_punto FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion (id_punto)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_ptr_tipo FOREIGN KEY (id_tipo) REFERENCES tipos_residuo (id_tipo)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

CREATE TABLE horarios_recoleccion (
  id_horario    INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_punto      INT UNSIGNED NOT NULL,
  dia_semana    ENUM('lunes','martes','miercoles','jueves','viernes','sabado','domingo') NOT NULL,
  hora_estimada TIME         NOT NULL,
  observaciones VARCHAR(200) NULL,
  PRIMARY KEY (id_horario),
  UNIQUE KEY uq_horario_punto_dia_hora (id_punto, dia_semana, hora_estimada),
  CONSTRAINT fk_horarios_punto FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion (id_punto)
    ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB;

-- Historial: cada vez que se registra que un punto fue (o no) recolectado.
CREATE TABLE registros_recoleccion (
  id_registro   INT UNSIGNED NOT NULL AUTO_INCREMENT,
  id_punto      INT UNSIGNED NOT NULL,
  id_usuario    INT UNSIGNED NOT NULL,            -- quién hizo el registro
  fecha_hora    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado        ENUM('recolectado','no_recolectado','pendiente') NOT NULL DEFAULT 'pendiente',
  observaciones VARCHAR(200) NULL,
  PRIMARY KEY (id_registro),
  CONSTRAINT fk_registros_punto FOREIGN KEY (id_punto) REFERENCES puntos_recoleccion (id_punto)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_registros_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ---------------------------------------------------------------- Reportes de vecinos
CREATE TABLE reportes_ciudadanos (
  id_reporte    INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  id_usuario    INT UNSIGNED  NOT NULL,
  id_tipo       INT UNSIGNED  NOT NULL,           -- AGREGADO al diagrama: el formulario del mapa pide el tipo de residuo
  descripcion   VARCHAR(500)  NOT NULL,
  ubicacion     VARCHAR(200)  NULL,               -- dirección o referencia en texto
  latitud       DECIMAL(10,7) NOT NULL,
  longitud      DECIMAL(10,7) NOT NULL,
  fecha_reporte DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado        ENUM('pendiente','en_proceso','resuelto') NOT NULL DEFAULT 'pendiente',
  PRIMARY KEY (id_reporte),
  CONSTRAINT fk_reportes_usuario FOREIGN KEY (id_usuario) REFERENCES usuarios (id_usuario)
    ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_reportes_tipo FOREIGN KEY (id_tipo) REFERENCES tipos_residuo (id_tipo)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;
