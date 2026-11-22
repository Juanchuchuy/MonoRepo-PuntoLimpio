import { Router } from 'express';
import {
    getTipos,
    getReportes,
    postReporte,
    updateReporte,
    deleteReporte,
    getPuntos
} from '../controllers/reportesController.js';

import { getEstadisticas } from '../controllers/estadisticasController.js';

const router = Router();

router.get('/tipos', getTipos);
router.get('/reportes', getReportes);
router.post('/reportes', postReporte);
router.put('/reportes/:id', updateReporte);
router.delete('/reportes/:id', deleteReporte);
router.get('/puntos', getPuntos);
router.get('/estadisticas', getEstadisticas);

export default router;