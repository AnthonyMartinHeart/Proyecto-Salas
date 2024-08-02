// Importar los modelos de Solicitud y User
import Solicitud from '../models/solicitud.model.js';


// Controlador para crear una nueva solicitud
export async function createSolicitud(req, res) {
    try {
        const { tipo, recurso, fechaInicio, fechaFin } = req.body;

        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "No estás autenticado" });
        }

        const userRut = req.session.user.rut;

        const newSolicitud = new Solicitud({
            user: userRut,
            tipo,
            recurso,
            fechaInicio,
            fechaFin
        });

        await newSolicitud.save();

        res.status(201).json({
            message: "Solicitud creada exitosamente",
            data: newSolicitud
        });
    } catch (error) {
        console.error("Error en solicitud.controller.js -> createSolicitud():", error);
        res.status(500).json({
            message: "Error interno del servidor.",
            error: error.message
        });
    }
}

// Controlador para obtener todas las solicitudes de un usuario
export async function getSolicitudes(req, res) {
    try {
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "No estás autenticado" });
        }

        const userRut = req.session.user.rut;
        const solicitudes = await Solicitud.find({ user: userRut }).populate('user', 'username email');

        res.status(200).json({
            message: "Solicitudes del usuario",
            data: solicitudes
        });
    } catch (error) {
        console.log("Error en solicitud.controller.js -> getSolicitudes():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

// Controlador para actualizar una solicitud existente
export async function updateSolicitud(req, res) {
    try {
        const { id } = req.params;
        const userRut = req.session.user.rut;
        const { tipo, recurso, fechaInicio, fechaFin, estado } = req.body;

        const solicitud = await Solicitud.findOneAndUpdate(
            { _id: id, user: userRut },
            { tipo, recurso, fechaInicio, fechaFin, estado },
            { new: true }
        );

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada o no autorizada para modificar" });
        }

        res.status(200).json({
            message: "Solicitud actualizada exitosamente",
            data: solicitud
        });
    } catch (error) {
        console.log("Error en solicitud.controller.js -> updateSolicitud():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}

// Controlador para eliminar una solicitud existente
export async function deleteSolicitud(req, res) {
    try {
        const { rut } = req.params;
        const userRut = req.session.user.rut;

        const solicitud = await Solicitud.findOneAndDelete({ rut: rut, user: userRut });

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada o no autorizada para eliminar" });
        }

        res.status(200).json({
            message: "Solicitud cancelada exitosamente",
            data: solicitud
        });
    } catch (error) {
        console.log("Error en solicitud.controller.js -> deleteSolicitud():", error);
        res.status(500).json({ message: "Error interno del servidor." });
    }
}
