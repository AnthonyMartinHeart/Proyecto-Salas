//CREADO POR PATRICIO ESPARZA
import { isAdmin } from '../middlewares/auth.middleware.js';

// routes/resourceUsageRoutes.js
import express from 'express';
import {
    getAllReports,
    createReport,
    getReportById,
    updateReport,
    deleteReport
    
} from '../controllers/Reporte.controller.js';

const router = express.Router();

// Ruta para obtener todos los reportes de uso de recursos
router.get('/get', getAllReports);

// Ruta para crear un nuevo reporte de uso de recursos
router.post('/create', createReport);

// Ruta para obtener un reporte específico por ID
router.get('/reporte/:id', getReportById);

// Ruta para actualizar un reporte por ID
router.put('/update/:id', updateReport);

// Ruta para eliminar un reporte por ID
router.delete('/delete/:id', isAdmin, deleteReport);

export default router;
