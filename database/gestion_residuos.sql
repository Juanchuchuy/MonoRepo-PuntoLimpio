-- =========================================================
-- Datos de ejemplo para PuntoLimpio (todas las tablas)
-- Ejecutar DESPUÉS del esquema, sobre la base vacía y ya seleccionada
-- (en Workbench: elegir la base como "default schema" o hacer USE <tu_base>;).
-- No es re-ejecutable: para cargarlo de nuevo hay que recrear la base.
--
-- Cuentas de prueba (solo para desarrollo):
--   administrador -> admin@puntolimpio.test            / Admin1234
--   administrador -> marcos.herrera@puntolimpio.test   / Admin1234
--   operario      -> carlos.rivas@puntolimpio.test     / Usuario1234
--   usuario       -> usuario@puntolimpio.test          / Usuario1234
--   (el resto de los operarios y vecinos también usan Usuario1234)
--
-- Las fechas son relativas a "hoy" para que las estadísticas y el mapa
-- siempre tengan datos recientes, sin importar cuándo se cargue el script.
-- Las coordenadas y direcciones son aproximadas y de ejemplo.
-- =========================================================

SET NAMES utf8mb4;

-- 1. roles ---------------------------------------------------------------
INSERT INTO roles (id_rol, nombre, descripcion) VALUES
(1, 'administrador', 'Gestiona puntos, horarios, zonas, usuarios y reportes'),
(2, 'usuario',       'Vecino que consulta el mapa y envía reportes'),


-- 2. usuarios ------------------------------------------------------------
-- Hash bcrypt de "Admin1234":   $2b$10$5nJF54syI4ThR7fNH0NSSuZKmc/SKNQlyfXII/w6aDqEVj.OBXCH6
-- Hash bcrypt de "Usuario1234": $2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu
INSERT INTO usuarios (id_usuario, id_rol, nombre, apellido, email, password_hash, activo, fecha_registro) VALUES
(1,  1, 'Admin',     'PuntoLimpio', 'admin@puntolimpio.test',            '$2b$10$5nJF54syI4ThR7fNH0NSSuZKmc/SKNQlyfXII/w6aDqEVj.OBXCH6', 1, NOW() - INTERVAL 120 DAY),
(2,  2, 'Vecino',    'Prueba',      'usuario@puntolimpio.test',          '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 110 DAY),
(3,  1, 'Marcos',    'Herrera',     'marcos.herrera@puntolimpio.test',   '$2b$10$5nJF54syI4ThR7fNH0NSSuZKmc/SKNQlyfXII/w6aDqEVj.OBXCH6', 1, NOW() - INTERVAL 100 DAY),
(4,  3, 'Carlos',    'Rivas',       'carlos.rivas@puntolimpio.test',     '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 95 DAY),
(5,  3, 'Sofía',     'Paz',         'sofia.paz@puntolimpio.test',        '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 90 DAY),
(6,  2, 'Ana',       'Torres',      'ana.torres@puntolimpio.test',       '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 80 DAY),
(7,  2, 'Luis',      'Medina',      'luis.medina@puntolimpio.test',      '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 70 DAY),
(8,  2, 'Camila',    'Díaz',        'camila.diaz@puntolimpio.test',      '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 60 DAY),
(9,  2, 'Diego',     'Suárez',      'diego.suarez@puntolimpio.test',     '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 0, NOW() - INTERVAL 50 DAY),
(10, 2, 'Valentina', 'Ruiz',        'valentina.ruiz@puntolimpio.test',   '$2b$10$i5dZbaJiHGbUTZBk3FBXZev94dXDGhYwtpUBlTgImhmNiBBKSNAuu', 1, NOW() - INTERVAL 30 DAY);

-- 3. zonas (el encargado es un operario; una zona queda sin encargado) -----
INSERT INTO zonas (id_zona, nombre, id_encargado) VALUES
(1, 'Centro',            4),
(2, 'Barrio Norte',      5),
(3, 'Barrio Sur',        4),
(4, 'Villa Luján',       5),
(5, 'Parque 9 de Julio', NULL);

-- 4. calles --------------------------------------------------------------
INSERT INTO calles (id_calle, id_zona, nombre) VALUES
(1,  1, 'San Martín'),
(2,  1, '24 de Septiembre'),
(3,  1, 'Laprida'),
(4,  1, 'Muñecas'),
(5,  2, 'Avenida Mate de Luna'),
(6,  2, 'Avenida Alem'),
(7,  3, 'Avenida Roca'),
(8,  3, 'Avenida Belgrano'),
(9,  3, 'Lamadrid'),
(10, 4, 'Avenida Gobernador del Campo'),
(11, 4, 'Pasaje Los Algarrobos'),
(12, 5, 'Avenida Soldati'),
(13, 5, 'Avenida Benjamín Aráoz');

-- 5. tipos_residuo -------------------------------------------------------
INSERT INTO tipos_residuo (id_tipo, nombre, descripcion) VALUES
(1, 'Plástico',              'Botellas, envases y bolsas limpias'),
(2, 'Vidrio',                'Botellas y frascos sin tapa'),
(3, 'Papel y cartón',        'Diarios, cajas y cuadernos secos'),
(4, 'Metales',               'Latas de aluminio y de conserva'),
(5, 'Pilas y baterías',      'Pilas comunes y baterías de celulares'),
(6, 'Aceite usado',          'Aceite de cocina en botella cerrada'),
(7, 'Residuos electrónicos', 'Celulares, cables y computadoras en desuso'),
(8, 'Medicamentos vencidos', 'Medicamentos en desuso o vencidos');

-- 6. puntos_recoleccion (el punto 10 está inactivo) ------------------------
INSERT INTO puntos_recoleccion (id_punto, id_calle, nombre, referencia, latitud, longitud, activo, creado_por) VALUES
(1,  2,  'Punto Plaza Independencia',    'Frente a la plaza, lado 24 de Septiembre',    -26.8310000, -65.2040000, 1, 1),
(2,  4,  'Punto Peatonal Muñecas',       'Esquina con Mendoza, junto al cesto grande',  -26.8330000, -65.2060000, 1, 1),
(3,  1,  'Punto San Martín y Laprida',   'Frente a la farmacia',                        -26.8350000, -65.2045000, 1, 3),
(4,  5,  'Punto Avenida Mate de Luna',   'Altura 1500, vereda par',                     -26.8125000, -65.2110000, 1, 3),
(5,  6,  'Punto Avenida Alem Norte',     'Junto a la parada de colectivo',              -26.8085000, -65.2075000, 1, 1),
(6,  7,  'Punto Avenida Roca',           'Frente a la escuela, contenedor verde',       -26.8490000, -65.2000000, 1, 3),
(7,  8,  'Punto Belgrano Sur',           'Esquina con Lamadrid',                        -26.8450000, -65.2150000, 1, 3),
(8,  10, 'Punto Villa Luján',            'Plazoleta del barrio',                        -26.8520000, -65.2300000, 1, 1),
(9,  12, 'Punto Parque 9 de Julio',      'Entrada principal por Avenida Soldati',       -26.8200000, -65.2300000, 1, 1),
(10, 13, 'Punto Parque (en reparación)', 'Contenedor retirado por obras',               -26.8215000, -65.2335000, 0, 1);

-- 7. punto_tipo_residuo (qué tipos recibe cada punto) ----------------------
INSERT INTO punto_tipo_residuo (id_punto, id_tipo) VALUES
(1, 1), (1, 2), (1, 3), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 1), (3, 2), (3, 3),
(4, 1), (4, 3), (4, 4), (4, 6),
(5, 1), (5, 5), (5, 7),
(6, 1), (6, 2), (6, 4),
(7, 3), (7, 5), (7, 8),
(8, 1), (8, 2), (8, 3), (8, 6),
(9, 1), (9, 2), (9, 3), (9, 4), (9, 5), (9, 7),
(10, 1), (10, 3);

-- 8. horarios_recoleccion (el punto 10 no tiene: está inactivo) ------------
INSERT INTO horarios_recoleccion (id_punto, dia_semana, hora_estimada, observaciones) VALUES
(1, 'Lunes',     '07:30:00', 'Camión compactador'),
(1, 'Miercoles', '07:30:00', 'Camión compactador'),
(1, 'Viernes',   '07:30:00', NULL),
(2, 'Martes',    '08:00:00', NULL),
(2, 'Jueves',    '08:00:00', NULL),
(3, 'Lunes',     '09:00:00', NULL),
(3, 'Jueves',    '09:00:00', 'Se retira también el cartón'),
(4, 'Martes',    '07:00:00', NULL),
(4, 'Sabado',    '07:00:00', 'Horario reducido los fines de semana'),
(5, 'Miercoles', '10:00:00', NULL),
(6, 'Lunes',     '10:30:00', NULL),
(6, 'Viernes',   '10:30:00', NULL),
(7, 'Martes',    '09:30:00', NULL),
(7, 'Sabado',    '09:30:00', NULL),
(8, 'Jueves',    '08:30:00', 'Pasa después del barrido de calles'),
(9, 'Lunes',     '08:00:00', NULL),
(9, 'Miercoles', '08:00:00', NULL),
(9, 'Viernes',   '08:00:00', NULL),
(9, 'Domingo',   '09:00:00', 'Servicio especial de fin de semana');

-- 9. registros_recoleccion (los cargan los operarios; últimos 30 días) -----
INSERT INTO registros_recoleccion (id_punto, id_usuario, fecha_hora, estado, observaciones) VALUES
(1, 4, TIMESTAMP(CURDATE() - INTERVAL 1 DAY,  '07:42:00'), 'Realizada',    NULL),
(2, 4, TIMESTAMP(CURDATE() - INTERVAL 1 DAY,  '08:10:00'), 'Realizada',    NULL),
(3, 5, TIMESTAMP(CURDATE() - INTERVAL 2 DAY,  '09:05:00'), 'Realizada',    NULL),
(4, 5, TIMESTAMP(CURDATE() - INTERVAL 3 DAY,  '07:15:00'), 'Realizada',    'Contenedor casi lleno'),
(5, 4, TIMESTAMP(CURDATE() - INTERVAL 4 DAY,  '10:20:00'), 'No realizada', 'Camión averiado, se reprograma'),
(6, 5, TIMESTAMP(CURDATE() - INTERVAL 5 DAY,  '10:45:00'), 'Realizada',    NULL),
(7, 4, TIMESTAMP(CURDATE() - INTERVAL 6 DAY,  '09:40:00'), 'Realizada',    NULL),
(8, 5, TIMESTAMP(CURDATE() - INTERVAL 7 DAY,  '08:35:00'), 'Realizada',    NULL),
(9, 4, TIMESTAMP(CURDATE() - INTERVAL 8 DAY,  '08:05:00'), 'Realizada',    'Mucho volumen de cartón'),
(1, 5, TIMESTAMP(CURDATE() - INTERVAL 9 DAY,  '07:35:00'), 'Realizada',    NULL),
(2, 4, TIMESTAMP(CURDATE() - INTERVAL 10 DAY, '08:00:00'), 'No realizada', 'Calle cortada por obras'),
(3, 5, TIMESTAMP(CURDATE() - INTERVAL 12 DAY, '09:10:00'), 'Realizada',    NULL),
(4, 4, TIMESTAMP(CURDATE() - INTERVAL 13 DAY, '07:05:00'), 'Realizada',    NULL),
(5, 5, TIMESTAMP(CURDATE() - INTERVAL 14 DAY, '10:05:00'), 'Realizada',    NULL),
(6, 4, TIMESTAMP(CURDATE() - INTERVAL 15 DAY, '10:35:00'), 'No realizada', 'Lluvia intensa'),
(7, 5, TIMESTAMP(CURDATE() - INTERVAL 17 DAY, '09:35:00'), 'Realizada',    NULL),
(8, 4, TIMESTAMP(CURDATE() - INTERVAL 19 DAY, '08:40:00'), 'Realizada',    NULL),
(9, 5, TIMESTAMP(CURDATE() - INTERVAL 20 DAY, '08:00:00'), 'Realizada',    NULL),
(1, 4, TIMESTAMP(CURDATE() - INTERVAL 22 DAY, '07:30:00'), 'Realizada',    NULL),
(2, 5, TIMESTAMP(CURDATE() - INTERVAL 24 DAY, '08:15:00'), 'Realizada',    NULL),
(3, 4, TIMESTAMP(CURDATE() - INTERVAL 26 DAY, '09:00:00'), 'No realizada', 'Contenedor inaccesible por auto mal estacionado'),
(4, 5, TIMESTAMP(CURDATE() - INTERVAL 27 DAY, '07:10:00'), 'Realizada',    NULL),
(9, 1, TIMESTAMP(CURDATE() - INTERVAL 28 DAY, '08:20:00'), 'Realizada',    'Registrado por el administrador'),
(6, 5, TIMESTAMP(CURDATE() - INTERVAL 29 DAY, '10:30:00'), 'Realizada',    NULL);

-- 10. reportes_ciudadanos (últimos ~3 meses, con los 4 estados) ------------
INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud, fecha_reporte, estado) VALUES
(2,  1, 'El contenedor está desbordado hace varios días',            'Avenida Mate de Luna 1500',            -26.8128000, -65.2112000, NOW() - INTERVAL 2 DAY,  'Pendiente'),
(6,  3, 'Cartón apilado que obstruye la vereda',                     'Laprida y San Martín',                 -26.8352000, -65.2043000, NOW() - INTERVAL 3 DAY,  'Pendiente'),
(7,  5, 'Pilas y baterías tiradas junto al contenedor',              'Avenida Alem 800',                     -26.8090000, -65.2070000, NOW() - INTERVAL 5 DAY,  'En revision'),
(8,  1, 'Basural a cielo abierto en un lote baldío',                 'Avenida Roca 2100',                    -26.8495000, -65.1995000, NOW() - INTERVAL 8 DAY,  'En revision'),
(10, 6, 'Aceite derramado en la vereda frente a un comercio',        'Muñecas 450',                          -26.8332000, -65.2058000, NOW() - INTERVAL 12 DAY, 'Pendiente'),
(2,  2, 'Vidrios rotos en la esquina, peligro para los chicos',      'Avenida Belgrano y Lamadrid',          -26.8455000, -65.2148000, NOW() - INTERVAL 20 DAY, 'Resuelto'),
(6,  7, 'Residuos electrónicos abandonados en la plazoleta',         'Plazoleta de Villa Luján',             -26.8518000, -65.2305000, NOW() - INTERVAL 28 DAY, 'Resuelto'),
(9,  1, 'Bolsas de residuos sin recolectar desde el fin de semana',  'Avenida Soldati 300',                  -26.8205000, -65.2298000, NOW() - INTERVAL 35 DAY, 'Resuelto'),
(7,  8, 'Medicamentos vencidos arrojados en el parque',              'Parque 9 de Julio, entrada principal', -26.8198000, -65.2302000, NOW() - INTERVAL 41 DAY, 'Resuelto'),
(8,  3, 'Papeles y cajas sueltos que vuela el viento',               '24 de Septiembre y Congreso',          -26.8312000, -65.2038000, NOW() - INTERVAL 50 DAY, 'Resuelto'),
(10, 4, 'Latas y escombros acumulados detrás de la escuela',         'Avenida Roca 1900',                    -26.8488000, -65.2003000, NOW() - INTERVAL 58 DAY, 'Resuelto'),
(2,  1, 'Reporte repetido del mismo contenedor ya atendido',         'Avenida Mate de Luna 1500',            -26.8128000, -65.2112000, NOW() - INTERVAL 66 DAY, 'Rechazado'),
(6,  2, 'Botellas de vidrio acumuladas en la esquina',               'Avenida Alem y Muñecas',               -26.8087000, -65.2078000, NOW() - INTERVAL 74 DAY, 'Resuelto'),
(8,  6, 'Aceite de cocina vertido en la alcantarilla',               'Pasaje Los Algarrobos 120',            -26.8525000, -65.2290000, NOW() - INTERVAL 85 DAY, 'Resuelto');