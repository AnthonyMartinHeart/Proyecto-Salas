'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

import { isAdmin } from '../middlewares/auth.middleware.js';

// Importación de funciones específicas desde el archivo JM.Recursos.js en la carpeta controllers

import { getAll, post, getByName, deleteRecurso, updateRecurso} from '../controllers/JM.Recursos.js';



// Creación de una instancia de Router
const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener todos los recursos (para administradores)
//router.get('/admin', isAdmin, getAll);

// Ruta para obtener un recurso por nombre
router.get('/name', getByName);

// Ruta para crear un nuevo recurso
router.post('/create', isAdmin ,post);

// Ruta para eliminar un recurso
router.delete('/delete/:id', isAdmin, deleteRecurso);

// Ruta para actualizar un recurso existente
router.put('/update/:id', isAdmin, updateRecurso);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
