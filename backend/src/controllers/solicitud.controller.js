//CREADO POR JORGE DIAZ

// Importar los modelos de Solicitud y User

import Solicitud from '../models/solicitud.model.js';

import User from '../models/user.model.js';

// Controlador para crear una nueva solicitud
export async function createSolicitud(req, res) {
  try {
    // Obtener los datos de la solicitud del cuerpo de la petición
    const { tipo, recurso, fechaInicio, fechaFin } = req.body;

    // Verificar que el usuario esté autenticado
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: "No estás autenticado" });
    }

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

    // Guardar la nueva solicitud en la base de datos
    await newSolicitud.save();

    // Responder con un mensaje de éxito y la nueva solicitud creada
    res.status(201).json({ message: "Solicitud creada exitosamente", data: newSolicitud });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error interno del servidor
    console.error("Error en solicitud.controller.js -> createSolicitud():", error);
    res.status(500).json({ message: "Error interno del servidor.", error: error.message });
  }
}


// Controlador para obtener todas las solicitudes de un usuario
export async function getSolicitudes(req, res) {
  try {
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
    // Buscar todas las solicitudes del usuario y popular el campo 'user' con 'username' y 'email'
    const solicitudes = await Solicitud.find({ user: userId }).populate('user', 'username email');

    // Responder con un mensaje de éxito y las solicitudes encontradas
    res.status(200).json({ message: "Solicitudes del usuario", data: solicitudes });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error interno del servidor
    console.log("Error en solicitud.controller.js -> getSolicitudes():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para actualizar una solicitud existente
export async function updateSolicitud(req, res) {
  try {
    // Obtener el ID de la solicitud de los parámetros de la petición
    const { id } = req.params;
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;
    // Obtener los nuevos datos de la solicitud del cuerpo de la petición
    const { tipo, recurso, fechaInicio, fechaFin, estado } = req.body;

    // Buscar la solicitud por ID y usuario, y actualizarla con los nuevos datos
    const solicitud = await Solicitud.findOneAndUpdate(
      { _id: id, user: userId },
      { tipo, recurso, fechaInicio, fechaFin, estado },
      { new: true } // Devolver el documento actualizado
    );

    // Si no se encuentra la solicitud, responder con un mensaje de error
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada o no autorizada para modificar" });
    }

    // Responder con un mensaje de éxito y la solicitud actualizada
    res.status(200).json({ message: "Solicitud actualizada exitosamente", data: solicitud });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error interno del servidor
    console.log("Error en solicitud.controller.js -> updateSolicitud():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}

// Controlador para eliminar una solicitud existente
export async function deleteSolicitud(req, res) {
  try {
    // Obtener el ID de la solicitud de los parámetros de la petición
    const { rut } = req.params;
    // Obtener el ID del usuario de la sesión
    const userId = req.session.user.rut;

    // Buscar la solicitud por ID y usuario, y eliminarla
    const solicitud = await Solicitud.findOneAndDelete({ rut: rut, user: userId });

    // Si no se encuentra la solicitud, responder con un mensaje de error
    if (!solicitud) {
      return res.status(404).json({ message: "Solicitud no encontrada o no autorizada para eliminar" });
    }

    // Responder con un mensaje de éxito y la solicitud eliminada
    res.status(200).json({ message: "Solicitud cancelada exitosamente", data: solicitud });
  } catch (error) {
    // Manejar errores y responder con un mensaje de error interno del servidor
    console.log("Error en solicitud.controller.js -> deleteSolicitud():", error);
    res.status(500).json({ message: "Error interno del servidor." });
  }
}
