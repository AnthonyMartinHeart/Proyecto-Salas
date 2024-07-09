// routes/resourceUsageRoutes.js
import express from 'express';
import {
    getAllReports,
    createReport,
    getReportById,
    updateReport,
    deleteReport
    
} from '../controllers/resourceUsageController.js';

const router = express.Router();

// Ruta para obtener todos los reportes de uso de recursos
router.get('/', getAllReports);

// Ruta para crear un nuevo reporte de uso de recursos
router.post('/create', createReport);

// Ruta para obtener un reporte específico por ID
router.get('/:id', getReportById);

// Ruta para actualizar un reporte por ID
router.put('/:id', updateReport);

// Ruta para eliminar un reporte por ID
router.delete('/:id', deleteReport);

export default router;
