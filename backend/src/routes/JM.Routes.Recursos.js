'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

import { isAdmin } from '../middlewares/auth.middleware.js';

import { isUser } from '../middlewares/user.middleware.js';

// Importación de funciones específicas desde el archivo JM.Recursos.js en la carpeta controllers

import { post, getByName, deleteRecurso, updateRecurso} from '../controllers/JM.Recursos.js';



// Creación de una instancia de Router
const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener un recurso por nombre
router.get('/name' , getByName );

// Ruta para crear un nuevo recurso
router.post('/create' , post);

// Ruta para eliminar un recurso
router.delete('/delete/:id', isAdmin, deleteRecurso);

// Ruta para actualizar un recurso existente
router.put('/update/:id', updateRecurso);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
