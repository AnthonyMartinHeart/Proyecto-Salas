'use strict';
// Importe del modulo Router desde express
import { Router } from 'express';
const router = Router(); //Creacion de la instancia router
// Importe de la funcion isAdmin desde el middleware de autentificación
import { isAdmin } from '../middlewares/auth.middleware.js';
//Importe de funciones especificas desde los controladores de equipos para el CRUD
import { crearRegistros, actualizarRegistros, eliminarRegistros, listarRegistros } from '../controllers/AL.C_Registros.js';

// Ruta para crear o añadir un nuevo prestamo (Para administradores)
router.post('/crear', isAdmin, crearRegistros);
// Ruta para actualizar los datos del prestamo (Para administradores)
router.put('/actualizar/:id', isAdmin, actualizarRegistros);
// Ruta para eliminar un registro de prestamo (Para administradores)
router.delete('/eliminar/:id', isAdmin, eliminarRegistros);
// Ruta para listar los prestamos (Para cualquier usuario)
router.get('/lista', listarRegistros);

// Exportacion del router para ser usado por express en otros modulos
export default router;