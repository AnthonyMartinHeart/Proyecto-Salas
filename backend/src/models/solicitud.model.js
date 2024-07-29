"use strict";
// solicitud.model.js
import mongoose from "mongoose";

const solicitudSchema = new mongoose.Schema({
  user: { type: String, required: true },
  tipo: { type: String, enum: ["sala", "equipo"], required: true },
  recurso: { type: String, required: true }, // nombre o identificación del recurso
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  estado: { type: String, enum: ["pendiente", "aprobada", "rechazada", "cancelada"], default: "pendiente" }
}, { timestamps: true });

const Solicitud = mongoose.model("Solicitud", solicitudSchema);
export default Solicitud;
