import { pool } from '../config/db.js';


export const getZonas = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT z.id_zona, z.nombre, z.id_encargado, u.nombre AS encargado_nombre, u.apellido AS encargado_apellido
            FROM zonas z
            LEFT JOIN usuarios u ON z.id_encargado = u.id_usuario
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las zonas' });
    }
};


export const postZona = async (req, res) => {
    const { nombre, id_encargado } = req.body;
    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    try {
        
        const encargadoId = id_encargado ? id_encargado : null;
        const [resultado] = await pool.query(
            'INSERT INTO zonas (nombre, id_encargado) VALUES (?, ?)', 
            [nombre, encargadoId]
        );
        res.status(201).json({ id_zona: resultado.insertId, nombre, id_encargado: encargadoId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la zona' });
    }
};


export const putZona = async (req, res) => {
    const { id } = req.params;
    const { nombre, id_encargado } = req.body;

    if (!nombre || nombre.trim() === '') {
        return res.status(400).json({ message: 'El nombre es obligatorio' });
    }

    try {
        const encargadoId = id_encargado ? id_encargado : null;
        const [resultado] = await pool.query(
            'UPDATE zonas SET nombre = ?, id_encargado = ? WHERE id_zona = ?', 
            [nombre, encargadoId, id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Zona no encontrada' });
        }
        res.json({ message: 'Zona actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la zona' });
    }
};


export const deleteZona = async (req, res) => {
    const { id } = req.params;
    try {
        const [resultado] = await pool.query('DELETE FROM zonas WHERE id_zona = ?', [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Zona no encontrada' });
        }
        res.json({ message: 'Zona eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se puede eliminar la zona porque tiene calles asociadas' });
    }
};