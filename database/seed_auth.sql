-- Roles y usuarios de prueba para el login.
-- Contraseñas de prueba (solo para desarrollo): Admin1234 y Usuario1234.
-- Es seguro ejecutarlo más de una vez: no duplica filas.
--
-- Recomendado (si todavía no existe): impide dos cuentas con el mismo email.
-- ALTER TABLE usuarios ADD UNIQUE KEY uq_usuarios_email (email);

INSERT INTO roles (nombre, descripcion)
SELECT 'administrador', 'Gestiona puntos, horarios, zonas, usuarios y reportes' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'administrador');

INSERT INTO roles (nombre, descripcion)
SELECT 'usuario', 'Vecino que consulta el mapa y envía reportes' FROM DUAL
WHERE NOT EXISTS (SELECT 1 FROM roles WHERE nombre = 'usuario');

INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo, fecha_registro)
SELECT r.id_rol, 'Admin', 'PuntoLimpio', 'admin@puntolimpio.test', '$2b$10$kzCaggKUT5Cxcim9fdxU4evCxYYPKwpj7d4Wu91mGxS.0bc8l2MCu', 1, NOW()
FROM roles r
WHERE r.nombre = 'administrador'
  AND NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'admin@puntolimpio.test');

INSERT INTO usuarios (id_rol, nombre, apellido, email, password_hash, activo, fecha_registro)
SELECT r.id_rol, 'Vecino', 'Prueba', 'usuario@puntolimpio.test', '$2b$10$9sq4iWMUSu5cMlBKH27LSOzJIN5L2j4m9/OkcQgMpG2QZq6nIhnsy', 1, NOW()
FROM roles r
WHERE r.nombre = 'usuario'
  AND NOT EXISTS (SELECT 1 FROM usuarios WHERE email = 'usuario@puntolimpio.test');
