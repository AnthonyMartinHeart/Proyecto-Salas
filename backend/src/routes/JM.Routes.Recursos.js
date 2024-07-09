//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

// Importación de funciones específicas desde el archivo JM.Recursos.js en la carpeta controllers

import { getAll, post, getByName, deleteRecurso, put } from '../controllers/JM.Recursos.js';



// Creación de una instancia de Router
const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener todos los recursos (para administradores)
router.get('/admin', getAll);

// Ruta para obtener un recurso por nombre
router.get('/name', getByName);

// Ruta para crear un nuevo recurso
router.post('/create', post);

// Ruta para eliminar un recurso
router.delete('/delete/:id', deleteRecurso);

// Ruta para actualizar un recurso existente
router.put('/update/:id', put);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
