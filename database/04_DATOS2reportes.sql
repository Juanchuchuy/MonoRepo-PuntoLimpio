-- ============================================================
-- 04_reportes_ciudadanos.sql
-- 72 reportes ciudadanos distribuidos de lunes a domingo.
-- Semana: 2026-11-16 (lunes) a 2026-11-22 (domingo)
-- Usuario: Vecino Prueba (usuario@puntolimpio.test)
-- Ejecutar después de 03_datos_base.sql
-- ============================================================
USE punto_limpio;

-- ============================================================
-- LUNES 2026-11-16  (10 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Basura acumulada en 25 de Mayo y San Martín',
       '25 de Mayo y San Martín, San Miguel de Tucumán',
       -26.8306000, -65.2197000, '2026-11-16 07:10:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Basura acumulada en 25 de Mayo y San Martín');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Contenedor desbordado frente al Parque 9 de Julio',
       'Av. Sarmiento, Parque 9 de Julio, San Miguel de Tucumán',
       -26.8249000, -65.2104000, '2026-11-16 08:05:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Contenedor desbordado frente al Parque 9 de Julio');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles abandonados en Av. Roca al 500',
       'Av. Roca al 500, San Miguel de Tucumán',
       -26.8393000, -65.2182000, '2026-11-16 09:20:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles abandonados en Av. Roca al 500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Restos de poda en Av. Kirchner y Lavalle',
       'Av. Kirchner y Lavalle, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8166000, -65.2049000, '2026-11-16 10:15:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Restos de poda en Av. Kirchner y Lavalle');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pilas arrojadas cerca de Casa de Gobierno',
       'San Martín frente a Casa de Gobierno, San Miguel de Tucumán',
       -26.8298000, -65.2171000, '2026-11-16 11:30:00', 'Resuelto'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pilas arrojadas cerca de Casa de Gobierno');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Bolsas rotas en Crisóstomo Álvarez al 800',
       'Crisóstomo Álvarez al 800, San Miguel de Tucumán',
       -26.8272000, -65.2148000, '2026-11-16 12:45:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Bolsas rotas en Crisóstomo Álvarez al 800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Escombros en Bernabé Aráoz al 1200',
       'Bernabé Aráoz al 1200, San Miguel de Tucumán',
       -26.8421000, -65.2215000, '2026-11-16 14:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Escombros en Bernabé Aráoz al 1200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Plásticos dispersos en Lavalle al 300',
       'Lavalle al 300, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8152000, -65.2031000, '2026-11-16 15:30:00', 'Rechazado'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Plásticos dispersos en Lavalle al 300');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos mezclados en Congreso al 400',
       'Congreso al 400, San Miguel de Tucumán',
       -26.8319000, -65.2156000, '2026-11-16 17:10:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos mezclados en Congreso al 400');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos orgánicos sin recolectar en Av. Sarmiento al 1200',
       'Av. Sarmiento al 1200, San Miguel de Tucumán',
       -26.8251000, -65.2102000, '2026-11-16 18:40:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos orgánicos sin recolectar en Av. Sarmiento al 1200');

-- ============================================================
-- MARTES 2026-11-17  (7 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Colchones viejos en Av. Roca al 900',
       'Av. Roca al 900, San Miguel de Tucumán',
       -26.8408000, -65.2199000, '2026-11-17 07:25:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Colchones viejos en Av. Roca al 900');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pinturas abandonadas en Av. Kirchner al 1500',
       'Av. Kirchner al 1500, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8149000, -65.2018000, '2026-11-17 09:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pinturas abandonadas en Av. Kirchner al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Cartones dispersos en Plaza Independencia',
       'Plaza Independencia, San Miguel de Tucumán',
       -26.8304000, -65.2199000, '2026-11-17 10:30:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Cartones dispersos en Plaza Independencia');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Restos de comida en Crisóstomo Álvarez al 1500',
       'Crisóstomo Álvarez al 1500, San Miguel de Tucumán',
       -26.8286000, -65.2131000, '2026-11-17 12:15:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Restos de comida en Crisóstomo Álvarez al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Electrodomésticos en Bernabé Aráoz al 600',
       'Bernabé Aráoz al 600, San Miguel de Tucumán',
       -26.8435000, -65.2231000, '2026-11-17 14:40:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Electrodomésticos en Bernabé Aráoz al 600');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Lavalle al 900',
       'Lavalle al 900, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8182000, -65.2056000, '2026-11-17 16:20:00', 'Rechazado'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Lavalle al 900');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Vidrios rotos en San Martín al 600',
       'San Martín al 600, San Miguel de Tucumán',
       -26.8323000, -65.2184000, '2026-11-17 18:55:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Vidrios rotos en San Martín al 600');

-- ============================================================
-- MIÉRCOLES 2026-11-18  (12 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Contenedor de orgánicos desbordado en Av. Sarmiento al 2000',
       'Av. Sarmiento al 2000, San Miguel de Tucumán',
       -26.8234000, -65.2089000, '2026-11-18 06:50:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Contenedor de orgánicos desbordado en Av. Sarmiento al 2000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Neumáticos en Av. Roca al 1800',
       'Av. Roca al 1800, San Miguel de Tucumán',
       -26.8452000, -65.2256000, '2026-11-18 08:10:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Neumáticos en Av. Roca al 1800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pilas y luminarias en Av. Kirchner al 2200',
       'Av. Kirchner al 2200, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8131000, -65.1992000, '2026-11-18 09:30:00', 'Resuelto'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pilas y luminarias en Av. Kirchner al 2200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Bolsas rotas en Congreso al 1000',
       'Congreso al 1000, San Miguel de Tucumán',
       -26.8338000, -65.2142000, '2026-11-18 10:45:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Bolsas rotas en Congreso al 1000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Papeles acumulados en Crisóstomo Álvarez al 2000',
       'Crisóstomo Álvarez al 2000, San Miguel de Tucumán',
       -26.8299000, -65.2120000, '2026-11-18 12:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Papeles acumulados en Crisóstomo Álvarez al 2000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en Bernabé Aráoz al 2000',
       'Bernabé Aráoz al 2000, San Miguel de Tucumán',
       -26.8467000, -65.2273000, '2026-11-18 13:20:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en Bernabé Aráoz al 2000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos orgánicos en Lavalle al 1500',
       'Lavalle al 1500, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8195000, -65.2071000, '2026-11-18 14:35:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos orgánicos en Lavalle al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Botellas en 25 de Mayo al 200',
       '25 de Mayo al 200, San Miguel de Tucumán',
       -26.8291000, -65.2215000, '2026-11-18 15:50:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Botellas en 25 de Mayo al 200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Restos de comida en el parque sobre Av. Sarmiento al 2500',
       'Av. Sarmiento al 2500, San Miguel de Tucumán',
       -26.8221000, -65.2075000, '2026-11-18 17:05:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Restos de comida en el parque sobre Av. Sarmiento al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Escombros en Av. Roca al 2500',
       'Av. Roca al 2500, San Miguel de Tucumán',
       -26.8481000, -65.2298000, '2026-11-18 18:20:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Escombros en Av. Roca al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Aceites derramados en Av. Kirchner al 3000',
       'Av. Kirchner al 3000, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8118000, -65.1965000, '2026-11-18 19:40:00', 'Rechazado'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Aceites derramados en Av. Kirchner al 3000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Cartones en San Martín al 1200',
       'San Martín al 1200, San Miguel de Tucumán',
       -26.8345000, -65.2170000, '2026-11-18 20:55:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Cartones en San Martín al 1200');

-- ============================================================
-- JUEVES 2026-11-19  (24 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Basura en 25 de Mayo al 400',
       '25 de Mayo al 400, San Miguel de Tucumán',
       -26.8312000, -65.2203000, '2026-11-19 06:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Basura en 25 de Mayo al 400');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Plásticos en San Martín al 800',
       'San Martín al 800, San Miguel de Tucumán',
       -26.8330000, -65.2178000, '2026-11-19 07:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Plásticos en San Martín al 800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en Congreso al 600',
       'Congreso al 600, San Miguel de Tucumán',
       -26.8325000, -65.2150000, '2026-11-19 07:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en Congreso al 600');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pilas en Av. Sarmiento al 300',
       'Av. Sarmiento al 300, San Miguel de Tucumán',
       -26.8260000, -65.2120000, '2026-11-19 08:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pilas en Av. Sarmiento al 300');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Crisóstomo Álvarez al 500',
       'Crisóstomo Álvarez al 500, San Miguel de Tucumán',
       -26.8265000, -65.2155000, '2026-11-19 08:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Crisóstomo Álvarez al 500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Escombros en Av. Roca al 300',
       'Av. Roca al 300, San Miguel de Tucumán',
       -26.8385000, -65.2175000, '2026-11-19 09:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Escombros en Av. Roca al 300');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Vidrios en Bernabé Aráoz al 400',
       'Bernabé Aráoz al 400, San Miguel de Tucumán',
       -26.8428000, -65.2220000, '2026-11-19 09:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Vidrios en Bernabé Aráoz al 400');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos orgánicos en Av. Kirchner al 700',
       'Av. Kirchner al 700, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8160000, -65.2035000, '2026-11-19 10:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos orgánicos en Av. Kirchner al 700');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Cartones en Lavalle al 500',
       'Lavalle al 500, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8158000, -65.2040000, '2026-11-19 10:30:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Cartones en Lavalle al 500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en 25 de Mayo al 600',
       '25 de Mayo al 600, San Miguel de Tucumán',
       -26.8320000, -65.2210000, '2026-11-19 11:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en 25 de Mayo al 600');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pinturas en San Martín al 1500',
       'San Martín al 1500, San Miguel de Tucumán',
       -26.8352000, -65.2165000, '2026-11-19 11:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pinturas en San Martín al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Bolsas rotas en Congreso al 1200',
       'Congreso al 1200, San Miguel de Tucumán',
       -26.8345000, -65.2135000, '2026-11-19 12:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Bolsas rotas en Congreso al 1200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Papeles en Av. Sarmiento al 1500',
       'Av. Sarmiento al 1500, San Miguel de Tucumán',
       -26.8243000, -65.2095000, '2026-11-19 12:30:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Papeles en Av. Sarmiento al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Colchones en Crisóstomo Álvarez al 1000',
       'Crisóstomo Álvarez al 1000, San Miguel de Tucumán',
       -26.8280000, -65.2138000, '2026-11-19 13:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Colchones en Crisóstomo Álvarez al 1000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Restos de comida en Av. Roca al 1500',
       'Av. Roca al 1500, San Miguel de Tucumán',
       -26.8440000, -65.2240000, '2026-11-19 13:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Restos de comida en Av. Roca al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Escombros en Bernabé Aráoz al 900',
       'Bernabé Aráoz al 900, San Miguel de Tucumán',
       -26.8432000, -65.2235000, '2026-11-19 14:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Escombros en Bernabé Aráoz al 900');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Botellas en Av. Kirchner al 1000',
       'Av. Kirchner al 1000, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8155000, -65.2025000, '2026-11-19 14:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Botellas en Av. Kirchner al 1000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Lavalle al 1200',
       'Lavalle al 1200, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8188000, -65.2062000, '2026-11-19 15:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Lavalle al 1200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pilas en 25 de Mayo al 800',
       '25 de Mayo al 800, San Miguel de Tucumán',
       -26.8330000, -65.2220000, '2026-11-19 15:30:00', 'Resuelto'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pilas en 25 de Mayo al 800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Vidrios en San Martín al 1800',
       'San Martín al 1800, San Miguel de Tucumán',
       -26.8360000, -65.2160000, '2026-11-19 16:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Vidrios en San Martín al 1800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos orgánicos en Congreso al 1500',
       'Congreso al 1500, San Miguel de Tucumán',
       -26.8355000, -65.2130000, '2026-11-19 16:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos orgánicos en Congreso al 1500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en Av. Sarmiento al 3000',
       'Av. Sarmiento al 3000, San Miguel de Tucumán',
       -26.8210000, -65.2065000, '2026-11-19 17:00:00', 'Rechazado'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en Av. Sarmiento al 3000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Cartones en Av. Roca al 3000',
       'Av. Roca al 3000, San Miguel de Tucumán',
       -26.8500000, -65.2320000, '2026-11-19 17:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Cartones en Av. Roca al 3000');

-- ============================================================
-- VIERNES 2026-11-20  (8 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Bolsas rotas en 25 de Mayo al 1000',
       '25 de Mayo al 1000, San Miguel de Tucumán',
       -26.8340000, -65.2225000, '2026-11-20 07:15:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Bolsas rotas en 25 de Mayo al 1000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Plásticos en San Martín al 2000',
       'San Martín al 2000, San Miguel de Tucumán',
       -26.8365000, -65.2155000, '2026-11-20 09:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Plásticos en San Martín al 2000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Colchones en Congreso al 1800',
       'Congreso al 1800, San Miguel de Tucumán',
       -26.8362000, -65.2125000, '2026-11-20 10:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Colchones en Congreso al 1800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pinturas en Av. Sarmiento al 3500',
       'Av. Sarmiento al 3500, San Miguel de Tucumán',
       -26.8200000, -65.2055000, '2026-11-20 12:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pinturas en Av. Sarmiento al 3500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Crisóstomo Álvarez al 2500',
       'Crisóstomo Álvarez al 2500, San Miguel de Tucumán',
       -26.8305000, -65.2110000, '2026-11-20 13:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Crisóstomo Álvarez al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Escombros en Av. Roca al 3500',
       'Av. Roca al 3500, San Miguel de Tucumán',
       -26.8515000, -65.2340000, '2026-11-20 15:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Escombros en Av. Roca al 3500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Botellas en Bernabé Aráoz al 2500',
       'Bernabé Aráoz al 2500, San Miguel de Tucumán',
       -26.8480000, -65.2290000, '2026-11-20 16:30:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Botellas en Bernabé Aráoz al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Residuos orgánicos en Lavalle al 2000',
       'Lavalle al 2000, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8205000, -65.2080000, '2026-11-20 18:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Residuos orgánicos en Lavalle al 2000');

-- ============================================================
-- SÁBADO 2026-11-21  (6 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Av. Kirchner al 2500',
       'Av. Kirchner al 2500, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8125000, -65.1980000, '2026-11-21 08:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Av. Kirchner al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Vidrios en Lavalle al 1800',
       'Lavalle al 1800, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8198000, -65.2073000, '2026-11-21 10:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Vidrios en Lavalle al 1800');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en 25 de Mayo al 1200',
       '25 de Mayo al 1200, San Miguel de Tucumán',
       -26.8350000, -65.2230000, '2026-11-21 12:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en 25 de Mayo al 1200');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pilas en San Martín al 2500',
       'San Martín al 2500, San Miguel de Tucumán',
       -26.8375000, -65.2150000, '2026-11-21 14:00:00', 'Resuelto'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pilas en San Martín al 2500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Restos de comida en Av. Sarmiento al 4000',
       'Av. Sarmiento al 4000, San Miguel de Tucumán',
       -26.8185000, -65.2040000, '2026-11-21 16:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Restos de comida en Av. Sarmiento al 4000');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Cartones en Av. Roca al 4000',
       'Av. Roca al 4000, San Miguel de Tucumán',
       -26.8530000, -65.2360000, '2026-11-21 18:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Cartones en Av. Roca al 4000');

-- ============================================================
-- DOMINGO 2026-11-22  (5 reportes)
-- ============================================================
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Botellas en Plaza Independencia',
       'Plaza Independencia, San Miguel de Tucumán',
       -26.8304000, -65.2199000, '2026-11-22 09:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Reciclable'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Botellas en Plaza Independencia');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Poda en Av. Sarmiento al 500',
       'Av. Sarmiento al 500, San Miguel de Tucumán',
       -26.8255000, -65.2115000, '2026-11-22 11:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Poda en Av. Sarmiento al 500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Muebles en Av. Roca al 700',
       'Av. Roca al 700, San Miguel de Tucumán',
       -26.8398000, -65.2190000, '2026-11-22 13:00:00', 'En revision'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Voluminoso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Muebles en Av. Roca al 700');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Pinturas en Av. Kirchner al 500',
       'Av. Kirchner al 500, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8162000, -65.2043000, '2026-11-22 15:00:00', 'Rechazado'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Peligroso'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Pinturas en Av. Kirchner al 500');

INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado)
SELECT u.id_usuario, t.id_tipo, 'Bolsas rotas en Lavalle al 2000',
       'Lavalle al 2000, Villa 9 de Julio, San Miguel de Tucumán',
       -26.8205000, -65.2080000, '2026-11-22 17:00:00', 'Pendiente'
FROM usuarios u, tipos_residuo t
WHERE u.email='usuario@puntolimpio.test' AND t.nombre='Orgánico'
  AND NOT EXISTS (SELECT 1 FROM reportes_ciudadanos r WHERE r.descripcion='Bolsas rotas en Lavalle al 2000');