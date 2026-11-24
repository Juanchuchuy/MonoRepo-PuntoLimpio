-- ============================================================
-- 02_usuarios.sql
-- Roles + usuario administrador + usuario vecino
-- Ejecutar después de 01_schema.sql
-- ============================================================
USE punto_limpio;

-- Roles
INSERT INTO roles (nombre, descripcion)
SELECT 'administrador', 'Gestiona puntos, horarios, zonas, usuarios y reportes'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'administrador');

INSERT INTO roles (nombre, descripcion)
SELECT 'usuario', 'Vecino que consulta el mapa y envía reportes'
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'usuario');

-- Usuario admin
INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo, fecha_registro)
SELECT r.id_rol, 'Admin', 'PuntoLimpio', 'admin@puntolimpio.test',
       '$2b$10$kzCaggKUT5Cxcim9fdxU4evCxYYPKwpj7d4Wu91mGxS.0bc8l2MCu',
       1, NOW()
FROM roles r
WHERE r.nombre = 'administrador'
  AND NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'admin@puntolimpio.test');

-- Usuario vecino
INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo, fecha_registro)
SELECT r.id_rol, 'Vecino', 'Prueba', 'usuario@puntolimpio.test',
       '$2b$10$9sq4iWMUSu5cMlBKH27LSOzJIN5L2j4m9/OkcQgMpG2QZq6nIhnsy',
       1, NOW()
FROM roles r
WHERE r.nombre = 'usuario'
  AND NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'usuario@puntolimpio.test');