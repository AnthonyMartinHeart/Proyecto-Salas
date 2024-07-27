'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

import { isAdmin } from '../middlewares/auth.middleware.js';

// Importación de funciones específicas desde el archivo JM.Reservas.js en la carpeta controllers

import { get, getByName, getByNameSala, getById, post, deleteReserva, updatedReserva } from '../controllers/JM.Reservas.js';


// Creación de una instancia de Router
const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener todas las reservas
router.get('/get',isAdmin, get);

// Ruta para obtener una reserva por nombre
router.get('/name',isAdmin, getByName);

// Ruta para obtener reservas por nombre de sala
router.get('/salas',isAdmin, getByNameSala);

// Ruta para obtener una reserva por ID (para administradores)
router.get('/id',isAdmin, getById);

// Ruta para crear una nueva reserva
router.post('/new',isAdmin, post);

// Ruta para eliminar una reserva
router.delete('/delete',isAdmin, deleteReserva);


router.put('/update/:id', updatedReserva);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
