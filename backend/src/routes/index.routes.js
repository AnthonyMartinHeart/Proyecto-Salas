
"use strict";

// Importa el modulo 'express' para crear las rutas

import { Router } from "express";

/** Enrutador de usuarios  */
import userRoutes from "./user.routes.js";


/** Enrutador de autenticación */
import authRoutes from "./auth.routes.js";


/** Enrutador De Recursos */
import JMRecursosRoutes from './JM.Routes.Recursos.js';


/** Enrutador De Reservas **/

import JMReservas from "./JM.Routes.Reservas.js";

/**  Enrutador De Usuarios **/

import JMUsuario from "./JM.Routes.Usuario.js";





// Se realiza una instancia de express

const router = Router();


// Define las rutas para los usuarios /api/users

router.use("/user",  userRoutes);


// Define las rutas para la autenticación /api/auth

router.use("/auth", authRoutes);


router.use("/Reservas", JMReservas);


router.use('/Recursos', JMRecursosRoutes);


router.use("/Usuario", JMUsuario);


export default router;
