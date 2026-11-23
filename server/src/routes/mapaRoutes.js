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
router.put('/reportes/:id', verifyToken, requireRole('administrador'), updateReporte);
router.delete('/reportes/:id', verifyToken, requireRole('administrador'), deleteReporte);
router.get('/puntos', getPuntos);
router.get('/zonas',verifyToken, getZonas);
router.post('/zonas',verifyToken,requireRole('administrador'), postZona);
router.put('/zonas/:id',verifyToken,requireRole('administrador'), putZona);
router.delete('/zonas/:id',verifyToken,requireRole('administrador'), deleteZona);
router.get('/calles',verifyToken, getCalles);
router.post('/calles',verifyToken,requireRole('administrador'), postCalle);
router.put('/calles/:id',verifyToken,requireRole('administrador'), putCalle);
router.delete('/calles/:id',verifyToken,requireRole('administrador'), deleteCalle);
router.get('/estadisticas/impacto', getImpacto); // público: lo usa el inicio
router.get('/estadisticas', verifyToken, requireRole('administrador'), getEstadisticas); // solo admin


export default router;