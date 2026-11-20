import { pool } from '../config/db.js';

export const getTipos = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id_tipo, nombre FROM tipos_residuo');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los tipos' });
    }
};

export const getReportes = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT rc.id_reporte, rc.latitud, rc.longitud, rc.descripcion, rc.estado, rc.fecha_reporte, tr.nombre AS tipo 
            FROM reportes_ciudadanos rc 
            JOIN tipos_residuo tr ON rc.id_tipo = tr.id_tipo 
            ORDER BY rc.fecha_reporte DESC
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los reportes' });
    }
};

export const postReporte = async (req, res) => {
    const { latitud, longitud, descripcion, id_tipo } = req.body || {};

    if (!latitud || !longitud || !descripcion || !id_tipo) {
        return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    if (latitud < -90 || latitud > 90 || longitud < -180 || longitud > 180) {
        return res.status(400).json({ message: 'Coordenadas fuera de rango' });
    }
    if (descripcion.trim() === '') {
        return res.status(400).json({ message: 'La descripción no puede estar vacía' });
    }

    const ubicacion = `${latitud},${longitud}`;
    const id_usuario = process.env.ID_USUARIO_PRUEBA;

    try {
        const consultasql = `INSERT INTO reportes_ciudadanos (id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?)`;
        const otraconsultasql = `
            SELECT rc.id_reporte, rc.latitud, rc.longitud, rc.descripcion, rc.estado, rc.fecha_reporte, tr.nombre AS tipo 
            FROM reportes_ciudadanos rc 
            JOIN tipos_residuo tr ON rc.id_tipo = tr.id_tipo 
            WHERE rc.id_reporte = ?
        `;

        const [resultado] = await pool.query(consultasql, [id_usuario, id_tipo, descripcion, ubicacion, latitud, longitud]);
        const [rows] = await pool.query(otraconsultasql, [resultado.insertId]);

        res.status(201).json(rows[0]);
    } catch (error) {
        console.error('Error en POST /api/reportes:', error);
        res.status(500).json({ error: 'Error al guardar el reporte' });
    }
};