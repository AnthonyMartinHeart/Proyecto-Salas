//CREADO POR BENJAMIN MANRIQUEZ

'use strict';
// Importe del modulo Router desde express
import { Router } from 'express';
const router = Router(); //Creacion de la instancia router
// Importe de la funcion isAdmin desde el middleware de autentificación
import { isAdmin } from '../middlewares/auth.middleware.js';
//Importe de funciones especificas desde los controladores de equipos para el CRUD
import { crearEquipo, actualizarEquipo, eliminarEquipo, listarEquipos } from '../controllers/BM.C_Equipos.js';

// Ruta para crear o añadir un nuevo equipamiento (Para administradores)
router.post('/crear', isAdmin, crearEquipo);
// Ruta para actualizar los datos del equipo (Para administradores)
router.put('/actualizar/:id', isAdmin, actualizarEquipo);
// Ruta para eliminar el equipamiento (Para administradores)
router.delete('/eliminar/:id', isAdmin, eliminarEquipo);
// Ruta para listar el equipamiento (Para cualquier usuario)
router.get('/lista', listarEquipos);

// Exportacion del router para ser usado por express en otros modulos
export default router;
