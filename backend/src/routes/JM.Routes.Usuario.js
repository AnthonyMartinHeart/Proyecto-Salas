//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

// Importación del módulo Router desde Express
import { Router } from 'express';

// Importación de funciones específicas desde el archivo JM.Usuario.js en la carpeta controllers

import { get, post, put, deleteUsuario, getByName, login, logout } from '../controllers/JM.Usuario.js';

// Creación de una instancia de Router

const router = Router();

// Definición de rutas y asociación con las funciones importadas

// Ruta para obtener todos los usuarios (para administradores)

router.get('/admin', get);

// Ruta para obtener un usuario por nombre

router.get('/:nombre', getByName);

// Ruta para realizar un inicio de sesión usando email y contraseña

router.post('/login', login);

// Ruta para crear un nuevo usuario

router.post('/create', post);

// Ruta para actualizar un usuario existente

router.put('/update', put);

// Ruta para eliminar un usuario

router.delete('/delete/:id', deleteUsuario);

//Ruta Para cerrar la sesion del usuario

router.post('/logout/:id', logout);

// Exportación del router para ser utilizado por Express en otros módulos
export default router;
