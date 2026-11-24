-- ============================================================
-- 03_datos_base.sql
-- Zonas, calles, tipos de residuo, puntos, relaciones,
-- horarios y registros de recolección.
-- NO incluye reportes ciudadanos.
-- Ejecutar después de 02_usuarios.sql
-- ============================================================
USE punto_limpio;

-- ============================================================
-- 1) ZONAS de San Miguel de Tucumán
-- ============================================================
INSERT INTO zonas (nombre, id_encargado)
SELECT 'Centro', u.id_usuario FROM usuarios u
WHERE u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM zonas WHERE nombre = 'Centro');

INSERT INTO zonas (nombre, id_encargado)
SELECT 'Barrio Norte', u.id_usuario FROM usuarios u
WHERE u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM zonas WHERE nombre = 'Barrio Norte');

INSERT INTO zonas (nombre, id_encargado)
SELECT 'Barrio Sur', u.id_usuario FROM usuarios u
WHERE u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM zonas WHERE nombre = 'Barrio Sur');

INSERT INTO zonas (nombre, id_encargado)
SELECT 'Villa 9 de Julio', u.id_usuario FROM usuarios u
WHERE u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM zonas WHERE nombre = 'Villa 9 de Julio');

-- ============================================================
-- 2) CALLES
-- ============================================================
INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, '25 de Mayo' FROM zonas z
WHERE z.nombre = 'Centro'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = '25 de Mayo');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'San Martín' FROM zonas z
WHERE z.nombre = 'Centro'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'San Martín');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Congreso' FROM zonas z
WHERE z.nombre = 'Centro'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Congreso');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Avenida Sarmiento' FROM zonas z
WHERE z.nombre = 'Barrio Norte'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Avenida Sarmiento');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Crisóstomo Álvarez' FROM zonas z
WHERE z.nombre = 'Barrio Norte'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Crisóstomo Álvarez');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Avenida Roca' FROM zonas z
WHERE z.nombre = 'Barrio Sur'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Avenida Roca');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Bernabé Aráoz' FROM zonas z
WHERE z.nombre = 'Barrio Sur'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Bernabé Aráoz');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Avenida Kirchner' FROM zonas z
WHERE z.nombre = 'Villa 9 de Julio'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Avenida Kirchner');

INSERT INTO calles (id_zona, nombre)
SELECT z.id_zona, 'Lavalle' FROM zonas z
WHERE z.nombre = 'Villa 9 de Julio'
  AND NOT EXISTS (SELECT 1 FROM calles c WHERE c.id_zona = z.id_zona AND c.nombre = 'Lavalle');

-- ============================================================
-- 3) TIPOS DE RESIDUO
-- ============================================================
INSERT INTO tipos_residuo (nombre, descripcion)
SELECT 'Orgánico', 'Restos de comida, poda y residuos biodegradables'
WHERE NOT EXISTS (SELECT 1 FROM tipos_residuo WHERE nombre = 'Orgánico');

INSERT INTO tipos_residuo (nombre, descripcion)
SELECT 'Reciclable', 'Plástico, vidrio, papel y cartón'
WHERE NOT EXISTS (SELECT 1 FROM tipos_residuo WHERE nombre = 'Reciclable');

INSERT INTO tipos_residuo (nombre, descripcion)
SELECT 'Voluminoso', 'Muebles, electrodomésticos y escombros menores'
WHERE NOT EXISTS (SELECT 1 FROM tipos_residuo WHERE nombre = 'Voluminoso');

INSERT INTO tipos_residuo (nombre, descripcion)
SELECT 'Peligroso', 'Pilas, baterías, pinturas y residuos patológicos'
WHERE NOT EXISTS (SELECT 1 FROM tipos_residuo WHERE nombre = 'Peligroso');

-- ============================================================
-- 4) PUNTOS DE RECOLECCIÓN
-- ============================================================
INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
SELECT c.id_calle, 'Punto Plaza Independencia', 'Esquina 25 de Mayo y San Martín',
       -26.8305000, -65.2198000, 1, u.id_usuario
FROM calles c
JOIN zonas z ON z.id_zona = c.id_zona
JOIN usuarios u ON u.email = 'admin@puntolimpio.test'
WHERE z.nombre = 'Centro' AND c.nombre = '25 de Mayo'
  AND NOT EXISTS (SELECT 1 FROM puntos_recoleccion p WHERE p.nombre = 'Punto Plaza Independencia');

INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
SELECT c.id_calle, 'Punto Casa de Gobierno', 'Frente a Casa de Gobierno',
       -26.8297000, -65.2172000, 1, u.id_usuario
FROM calles c
JOIN zonas z ON z.id_zona = c.id_zona
JOIN usuarios u ON u.email = 'admin@puntolimpio.test'
WHERE z.nombre = 'Centro' AND c.nombre = 'San Martín'
  AND NOT EXISTS (SELECT 1 FROM puntos_recoleccion p WHERE p.nombre = 'Punto Casa de Gobierno');

INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
SELECT c.id_calle, 'Punto Parque 9 de Julio', 'Ingreso por Av. Sarmiento',
       -26.8248000, -65.2105000, 1, u.id_usuario
FROM calles c
JOIN zonas z ON z.id_zona = c.id_zona
JOIN usuarios u ON u.email = 'admin@puntolimpio.test'
WHERE z.nombre = 'Barrio Norte' AND c.nombre = 'Avenida Sarmiento'
  AND NOT EXISTS (SELECT 1 FROM puntos_recoleccion p WHERE p.nombre = 'Punto Parque 9 de Julio');

INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
SELECT c.id_calle, 'Punto Estación Tucumán', 'Av. Roca y Bernabé Aráoz',
       -26.8392000, -65.2183000, 1, u.id_usuario
FROM calles c
JOIN zonas z ON z.id_zona = c.id_zona
JOIN usuarios u ON u.email = 'admin@puntolimpio.test'
WHERE z.nombre = 'Barrio Sur' AND c.nombre = 'Avenida Roca'
  AND NOT EXISTS (SELECT 1 FROM puntos_recoleccion p WHERE p.nombre = 'Punto Estación Tucumán');

INSERT INTO puntos_recoleccion (id_calle, nombre, referencia, latitud, longitud, activo, creado_por)
SELECT c.id_calle, 'Punto Villa 9 de Julio', 'Av. Kirchner y Lavalle',
       -26.8165000, -65.2050000, 1, u.id_usuario
FROM calles c
JOIN zonas z ON z.id_zona = c.id_zona
JOIN usuarios u ON u.email = 'admin@puntolimpio.test'
WHERE z.nombre = 'Villa 9 de Julio' AND c.nombre = 'Avenida Kirchner'
  AND NOT EXISTS (SELECT 1 FROM puntos_recoleccion p WHERE p.nombre = 'Punto Villa 9 de Julio');

-- ============================================================
-- 5) PUNTO - TIPO RESIDUO
-- ============================================================
INSERT INTO punto_tipo_residuo (id_punto, id_tipo)
SELECT p.id_punto, t.id_tipo
FROM puntos_recoleccion p, tipos_residuo t
WHERE p.nombre = 'Punto Plaza Independencia' AND t.nombre IN ('Orgánico','Reciclable')
  AND NOT EXISTS (SELECT 1 FROM punto_tipo_residuo x
                  WHERE x.id_punto = p.id_punto AND x.id_tipo = t.id_tipo);

INSERT INTO punto_tipo_residuo (id_punto, id_tipo)
SELECT p.id_punto, t.id_tipo
FROM puntos_recoleccion p, tipos_residuo t
WHERE p.nombre = 'Punto Casa de Gobierno' AND t.nombre IN ('Reciclable','Peligroso')
  AND NOT EXISTS (SELECT 1 FROM punto_tipo_residuo x
                  WHERE x.id_punto = p.id_punto AND x.id_tipo = t.id_tipo);

INSERT INTO punto_tipo_residuo (id_punto, id_tipo)
SELECT p.id_punto, t.id_tipo
FROM puntos_recoleccion p, tipos_residuo t
WHERE p.nombre = 'Punto Parque 9 de Julio' AND t.nombre IN ('Orgánico','Voluminoso')
  AND NOT EXISTS (SELECT 1 FROM punto_tipo_residuo x
                  WHERE x.id_punto = p.id_punto AND x.id_tipo = t.id_tipo);

INSERT INTO punto_tipo_residuo (id_punto, id_tipo)
SELECT p.id_punto, t.id_tipo
FROM puntos_recoleccion p, tipos_residuo t
WHERE p.nombre = 'Punto Estación Tucumán' AND t.nombre = 'Reciclable'
  AND NOT EXISTS (SELECT 1 FROM punto_tipo_residuo x
                  WHERE x.id_punto = p.id_punto AND x.id_tipo = t.id_tipo);

INSERT INTO punto_tipo_residuo (id_punto, id_tipo)
SELECT p.id_punto, t.id_tipo
FROM puntos_recoleccion p, tipos_residuo t
WHERE p.nombre = 'Punto Villa 9 de Julio' AND t.nombre IN ('Orgánico','Reciclable','Voluminoso')
  AND NOT EXISTS (SELECT 1 FROM punto_tipo_residuo x
                  WHERE x.id_punto = p.id_punto AND x.id_tipo = t.id_tipo);

-- ============================================================
-- 6) HORARIOS DE RECOLECCIÓN (lunes a domingo)
-- ============================================================
INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Lunes', '07:00:00', 'Recolección de orgánicos'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Plaza Independencia'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Lunes');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Martes', '07:30:00', 'Recolección de reciclables'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Casa de Gobierno'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Martes');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Miercoles', '08:00:00', 'Recolección de voluminosos'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Parque 9 de Julio'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Miercoles');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Jueves', '08:30:00', 'Recolección de reciclables'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Estación Tucumán'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Jueves');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Viernes', '09:00:00', 'Recolección general'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Villa 9 de Julio'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Viernes');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Sabado', '09:30:00', 'Recolección de reciclables'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Plaza Independencia'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Sabado');

INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones)
SELECT p.id_punto, 'Domingo', '10:00:00', 'Recolección de orgánicos'
FROM puntos_recoleccion p WHERE p.nombre = 'Punto Parque 9 de Julio'
  AND NOT EXISTS (SELECT 1 FROM horarios_recoleccion h
                  WHERE h.id_punto = p.id_punto AND h.dia_semana = 'Domingo');

-- ============================================================
-- 7) REGISTROS DE RECOLECCIÓN
-- ============================================================
INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones)
SELECT p.id_punto, u.id_usuario, '2026-11-16 07:10:00', 'Realizada', 'Recolección completada sin novedad'
FROM puntos_recoleccion p, usuarios u
WHERE p.nombre = 'Punto Plaza Independencia' AND u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM registros_recoleccion r
                  WHERE r.id_punto = p.id_punto AND r.fecha_hora = '2026-11-16 07:10:00');

INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones)
SELECT p.id_punto, u.id_usuario, '2026-11-17 07:45:00', 'Realizada', 'Se retiraron reciclables'
FROM puntos_recoleccion p, usuarios u
WHERE p.nombre = 'Punto Casa de Gobierno' AND u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM registros_recoleccion r
                  WHERE r.id_punto = p.id_punto AND r.fecha_hora = '2026-11-17 07:45:00');

INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones)
SELECT p.id_punto, u.id_usuario, '2026-11-18 08:20:00', 'No realizada', 'Camión no pudo acceder por obra'
FROM puntos_recoleccion p, usuarios u
WHERE p.nombre = 'Punto Parque 9 de Julio' AND u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM registros_recoleccion r
                  WHERE r.id_punto = p.id_punto AND r.fecha_hora = '2026-11-18 08:20:00');

INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones)
SELECT p.id_punto, u.id_usuario, '2026-11-19 08:40:00', 'Realizada', 'Recolección normal'
FROM puntos_recoleccion p, usuarios u
WHERE p.nombre = 'Punto Estación Tucumán' AND u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM registros_recoleccion r
                  WHERE r.id_punto = p.id_punto AND r.fecha_hora = '2026-11-19 08:40:00');

INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones)
SELECT p.id_punto, u.id_usuario, '2026-11-20 09:10:00', 'Realizada', 'Se retiraron voluminosos'
FROM puntos_recoleccion p, usuarios u
WHERE p.nombre = 'Punto Villa 9 de Julio' AND u.email = 'admin@puntolimpio.test'
  AND NOT EXISTS (SELECT 1 FROM registros_recoleccion r
                  WHERE r.id_punto = p.id_punto AND r.fecha_hora = '2026-11-20 09:10:00');