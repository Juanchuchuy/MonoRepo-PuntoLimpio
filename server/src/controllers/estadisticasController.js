import { pool } from '../config/db.js';

// GET /api/estadisticas/impacto (público): solo el resumen general que muestra el inicio ("Nuestro impacto").
export const getImpacto = async (req, res) => {
    try {
        const [filas] = await pool.query(`
            SELECT COUNT(*) AS total,
                   COALESCE(SUM(CASE WHEN estado = 'Resuelto' THEN 1 ELSE 0 END), 0) AS solucionados
            FROM reportes_ciudadanos
        `);
        const total = Number(filas[0].total);
        const solucionados = Number(filas[0].solucionados);
        res.json({
            reportes: total,
            solucionados,
            porcentaje: total > 0 ? Math.round((solucionados / total) * 100) : 0
        });
    } catch (error) {
        console.error("Error al obtener el impacto:", error);
        res.status(500).json({ error: 'Error al obtener el impacto' });
    }
};

// GET /api/estadisticas (solo administrador): detalle completo para la página de estadísticas y el informe PDF.
export const getEstadisticas = async (req, res) => {
    try {
        // 1. Totales (Reportes, Solucionados, Pendientes, Porcentaje)
        const [totales] = await pool.query(`
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN estado = 'Resuelto' THEN 1 ELSE 0 END) as solucionados,
                SUM(CASE WHEN estado != 'Resuelto' THEN 1 ELSE 0 END) as pendientes
            FROM reportes_ciudadanos
        `);

        const total = totales[0].total || 0;
        const solucionados = totales[0].solucionados || 0;
        const pendientes = totales[0].pendientes || 0;
        const porcentaje = total > 0 ? Math.round((solucionados / total) * 100) : 0;

        // 2. Reportes por Día (Agrupados por día de la semana)
        const [dias] = await pool.query(`
            SELECT 
                DAYNAME(fecha_reporte) as dia, 
                COUNT(*) as cantidad 
            FROM reportes_ciudadanos 
            WHERE fecha_reporte IS NOT NULL
            GROUP BY DAYNAME(fecha_reporte)
        `);
        
        // Mapeamos los días al español (MySQL los devuelve en inglés)
        const diasMap = {
            'Monday': 'Lun', 'Tuesday': 'Mar', 'Wednesday': 'Mier',
            'Thursday': 'Jue', 'Friday': 'Vier', 'Saturday': 'Sab', 'Sunday': 'Dom'
        };
        
        // Aseguramos que estén todos los días, aunque tengan 0
        const ordenDias = ['Lun', 'Mar', 'Mier', 'Jue', 'Vier', 'Sab', 'Dom'];
        const reportesPorDia = ordenDias.map(d => {
            const encontrado = dias.find(item => diasMap[item.dia] === d);
            return { dia: d, cantidad: encontrado ? encontrado.cantidad : 0 };
        });

        // 3. Reportes por Tipo de Residuo
        const [tipos] = await pool.query(`
            SELECT tr.nombre AS tipo, COUNT(*) as cantidad
            FROM reportes_ciudadanos rc
            JOIN tipos_residuo tr ON rc.id_tipo = tr.id_tipo
            GROUP BY tr.nombre
            ORDER BY cantidad DESC
        `);

        // 4. Devolvemos todo junto
        res.json({
            reportes: total,
            solucionados: solucionados,
            pendientes: pendientes,
            porcentaje: porcentaje,
            reportesPorDia: reportesPorDia,
            reportesPorTipo: tipos // <-- ACÁ CAMBIAMOS EL NOMBRE
        });

    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        res.status(500).json({ error: 'Error al obtener las estadísticas' });
    }
};