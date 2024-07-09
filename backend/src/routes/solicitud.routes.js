//CREADO POR JORGE DIAZ

"use strict";

// Importar el enrutador de Express

import { Router } from "express";

// Importar los controladores de solicitudes

import { createSolicitud, getSolicitudes, updateSolicitud, deleteSolicitud } from "../controllers/solicitud.controller.js";

// Importar el middleware de autenticación

import { isLoggedIn } from "../middlewares/auth.middleware.js";

// Crear una nueva instancia del enrutador

const router = Router();

// Ruta para crear una nueva solicitud, requiere que el usuario esté autenticado

router.post("/create", isLoggedIn, createSolicitud);

// Ruta para obtener las solicitudes del usuario autenticado

router.get("/login", isLoggedIn, getSolicitudes);

// Ruta para actualizar una solicitud existente, requiere que el usuario esté autenticado

router.put("/update/:id", isLoggedIn, updateSolicitud); 

// Ruta para eliminar una solicitud existente, requiere que el usuario esté autenticado

router.delete("/delete/:id", isLoggedIn, deleteSolicitud);

// Exportar el enrutador para su uso en otras partes de la aplicación

export default router;
