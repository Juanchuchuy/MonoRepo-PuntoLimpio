import { pool } from '../config/db.js';


export const getCalles = async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT c.id_calle, c.nombre, c.id_zona, z.nombre AS zona_nombre
            FROM calles c
            LEFT JOIN zonas z ON c.id_zona = z.id_zona
        `);
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las calles' });
    }
};


export const postCalle = async (req, res) => {
    const { nombre, id_zona } = req.body;

    if (!nombre || nombre.trim() === '' || !id_zona) {
        return res.status(400).json({ message: 'El nombre y la zona son obligatorios' });
    }

    try {
        const [resultado] = await pool.query(
            'INSERT INTO calles (nombre, id_zona) VALUES (?, ?)', 
            [nombre, id_zona]
        );
        res.status(201).json({ id_calle: resultado.insertId, nombre, id_zona });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la calle' });
    }
};


export const putCalle = async (req, res) => {
    const { id } = req.params;
    const { nombre, id_zona } = req.body;

    if (!nombre || nombre.trim() === '' || !id_zona) {
        return res.status(400).json({ message: 'El nombre y la zona son obligatorios' });
    }

    try {
        const [resultado] = await pool.query(
            'UPDATE calles SET nombre = ?, id_zona = ? WHERE id_calle = ?', 
            [nombre, id_zona, id]
        );
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Calle no encontrada' });
        }
        res.json({ message: 'Calle actualizada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la calle' });
    }
};


export const deleteCalle = async (req, res) => {
    const { id } = req.params;
    try {
        const [resultado] = await pool.query('DELETE FROM calles WHERE id_calle = ?', [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ message: 'Calle no encontrada' });
        }
        res.json({ message: 'Calle eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'No se puede eliminar la calle porque tiene puntos de recolección asociados' });
    }
};