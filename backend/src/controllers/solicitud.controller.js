//CREADO POR JORGE DIAZ

"use strict";

// Importar el enrutador de Express

import { Router } from "express";

// Importar los controladores de solicitudes

import { createSolicitud, getSolicitudes, updateSolicitud, deleteSolicitud } from "../controllers/solicitud.controller.js";

<<<<<<< HEAD
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
    // Crear una nueva instancia del modelo Solicitud con los datos proporcionados
    const newSolicitud = new Solicitud({
      user: userId,
      tipo,
      recurso,
      fechaInicio,
      fechaFin
    });
=======
// Importar el middleware de autenticación

import { isAdmin, isLoggedIn } from "../middlewares/auth.middleware.js";
>>>>>>> b799c840d5134319c6d138956299c469aad2357e

// Crear una nueva instancia del enrutador

const router = Router();

// Ruta para crear una nueva solicitud, requiere que el usuario esté autenticado

<<<<<<< HEAD
// Controlador para obtener todas las solicitudes de un usuario
export async function getSolicitudes(req, res) {
  try {
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
    // Buscar todas las solicitudes del usuario y popular el campo 'user' con 'username' y 'email'
    const solicitudes = await Solicitud.find({ user: userId }).populate('user', 'username email');
=======
router.post("/create", isAdmin, createSolicitud);
>>>>>>> b799c840d5134319c6d138956299c469aad2357e

// Ruta para obtener las solicitudes del usuario autenticado

<<<<<<< HEAD
// Controlador para actualizar una solicitud existente
export async function updateSolicitud(req, res) {
  try {
    // Obtener el ID de la solicitud de los parámetros de la petición
    const { id } = req.params;
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
    // Obtener los nuevos datos de la solicitud del cuerpo de la petición
    const { tipo, recurso, fechaInicio, fechaFin, estado } = req.body;
=======
router.get("/login", isAdmin, getSolicitudes);
>>>>>>> b799c840d5134319c6d138956299c469aad2357e

// Ruta para actualizar una solicitud existente, requiere que el usuario esté autenticado

router.put("/update/:id", isAdmin, updateSolicitud); 

// Ruta para eliminar una solicitud existente, requiere que el usuario esté autenticado

<<<<<<< HEAD
// Controlador para eliminar una solicitud existente
export async function deleteSolicitud(req, res) {
  try {
    // Obtener el ID de la solicitud de los parámetros de la petición
    const { id } = req.params;
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
=======
router.delete("/delete/:id", isAdmin, deleteSolicitud);
>>>>>>> b799c840d5134319c6d138956299c469aad2357e

// Exportar el enrutador para su uso en otras partes de la aplicación

export default router;

