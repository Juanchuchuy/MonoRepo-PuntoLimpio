import { Router } from 'express';
import { getTipos, getReportes, postReporte } from '../controllers/reportesController.js';

const router = Router();

router.get('/tipos', getTipos);
router.get('/reportes', getReportes);
router.post('/reportes', postReporte);

export default router;