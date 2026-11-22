import { Router } from 'express';
import { getTipos, getReportes, postReporte, updateReporte, deleteReporte, getPuntos } from '../controllers/reportesController.js';
import { getZonas, postZona, putZona, deleteZona } from '../controllers/zonasController.js';
import { getCalles, postCalle, putCalle, deleteCalle } from '../controllers/callesController.js';
import { getEstadisticas, getImpacto } from '../controllers/estadisticasController.js';
import verifyToken from '../middlewares/verifyToken.js';
import requireRole from '../middlewares/requireRole.js';



const router = Router();

router.get('/tipos', getTipos);
router.get('/reportes', getReportes);
router.post('/reportes', verifyToken, postReporte);
router.put('/reportes/:id', updateReporte);
router.delete('/reportes/:id', deleteReporte);
router.get('/puntos', getPuntos);
router.get('/zonas', getZonas);
router.post('/zonas', postZona);
router.put('/zonas/:id', putZona);
router.delete('/zonas/:id', deleteZona);
router.get('/calles', getCalles);
router.post('/calles', postCalle);
router.put('/calles/:id', putCalle);
router.delete('/calles/:id', deleteCalle);
router.get('/estadisticas/impacto', getImpacto); // público: lo usa el inicio
router.get('/estadisticas', verifyToken, requireRole('administrador'), getEstadisticas); // solo admin


export default router;