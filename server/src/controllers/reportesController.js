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
            SELECT rc.id_reporte, rc.id_tipo, rc.latitud, rc.longitud, rc.descripcion, rc.estado, rc.fecha_reporte, tr.nombre AS tipo 
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
    const id_usuario = req.user.id; // lo deja verifyToken a partir del JWT

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


export const updateReporte = async (req, res) => {

    const { id } = req.params;
    const { estado } = req.body;

    //validacion para mayusculas o espaciado
    const estadosPermitidos = ['Pendiente', 'En revision', 'Resuelto', 'Rechazado'];
    if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({ message: 'Estado no válido' });
    }


    try {
        const updatesql = `UPDATE reportes_ciudadanos SET estado = ? WHERE id_reporte = ?`
        const [resultado] = await pool.query(updatesql, [estado, id])

        //si intenta updatear un reporte que no existe 
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }


        res.json({ message: 'Estado actualizado correctamente' })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el reporte' })
    }

}




export const editarReporte = async (req, res) => {

    const { id } = req.params;
    const { id_tipo, descripcion } = req.body;

    if (!id_tipo || !descripcion || descripcion.trim() === '') {
        return res.status(400).json({ message: 'El tipo y la descripción son obligatorios' });
    }

    try {
        const [tipo] = await pool.query(
            'SELECT id_tipo FROM tipos_residuo WHERE id_tipo = ?',
            [id_tipo]
        );

        if (tipo.length === 0) {
            return res.status(400).json({ message: 'Tipo de residuo no válido' });
        }

        const updatesql = `
            UPDATE reportes_ciudadanos
            SET id_tipo = ?, descripcion = ?
            WHERE id_reporte = ?
        `;

        const [resultado] = await pool.query(
            updatesql,
            [id_tipo, descripcion.trim(), id]
        );

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.json({ message: 'Reporte actualizado correctamente' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar el reporte' });
    }
};




export const deleteReporte = async (req, res) => {

    const { id } = req.params;

    try {
        const deletesql = `DELETE FROM reportes_ciudadanos WHERE id_reporte = ?`
        const [resultado] = await pool.query(deletesql, [id])

        //si intenta borrar un reporte que no existe 
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Reporte no encontrado' });
        }

        res.json({ message: 'Reporte eliminado correctamente' });


    } catch (error) {
        console.error('Error al eliminar el reporte:', error);
        res.status(500).json({ error: 'Error interno al eliminar el reporte' })
    }

}

export const getPuntos = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT p.id_punto, p.nombre, p.referencia, p.latitud, p.longitud, p.activo, 
                   c.nombre AS calle, z.nombre AS zona,
                   GROUP_CONCAT(DISTINCT t.nombre SEPARATOR ', ') AS tipos,
                   GROUP_CONCAT(DISTINCT CONCAT(h.dia_semana, ' ', TIME_FORMAT(h.hora_estimada, '%H:%i'))
                       ORDER BY FIELD(h.dia_semana, 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'), h.hora_estimada
                       SEPARATOR ', ') AS horarios
            FROM puntos_recoleccion p
            JOIN calles c ON c.id_calle = p.id_calle
            JOIN zonas z ON z.id_zona = c.id_zona
            LEFT JOIN punto_tipo_residuo ptr ON ptr.id_punto = p.id_punto
            LEFT JOIN tipos_residuo t ON t.id_tipo = ptr.id_tipo
            LEFT JOIN horarios_recoleccion h ON h.id_punto = p.id_punto
            WHERE p.activo = 1
            GROUP BY p.id_punto, c.nombre, z.nombre
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los puntos de recolección' });
    }
};