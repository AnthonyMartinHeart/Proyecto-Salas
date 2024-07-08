'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

// Importación de funciones específicas desde el archivo JM.Reservas.js en la carpeta controllers

import { get, getByName, getByNameSala, getById, post, deleteReserva, updatedReserva } from '../controllers/JM.Reservas.js';
import { put } from '../controllers/JM.Recursos.js';

// Creación de una instancia de Router
const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener todas las reservas
router.get('/get', get);

// Ruta para obtener una reserva por nombre
router.get('/name', getByName);

// Ruta para obtener reservas por nombre de sala
router.get('/salas', getByNameSala);

// Ruta para obtener una reserva por ID (para administradores)
router.get('/id', getById);

// Ruta para crear una nueva reserva
router.post('/new', post);

// Ruta para eliminar una reserva
router.delete('/delete', deleteReserva);

router.put('/update/:id', updatedReserva);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
