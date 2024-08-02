//CREADO POR BENJAMIN MANRIQUEZ

'use strict';
// Se importa mongoose para interactuar con la base de datos de MongoDB
import mongoose from "mongoose";

// Definicion del esquema o estructura del registro
const equipoSchema = new mongoose.Schema({
    nombre: {
        type: String, // Definimos del tipo string
        required: true, // Definimos que es necesario llenar este campo
        trim: true // Definimos que elimine los espacios en blanco al inicio y final del valor
    },
    descripcion: { // Descripcion del equipamiento
        type: String,
        required: true,
        trim: true
    },
    especificaciones: { // Especificaciones tecnicas del equipamiento
        type: String,
        required: true,
        trim: true
    },
    cantidad:{
        type: Number,
        required: true,
        min:[0,'La cantidad no puede ser negativa'],
        trim: true
    },
    condicionUso:{ // Especifica las condiciones para el uso del equipamiento
        type: String,
        required: true,
        trim: true
    },
    estado: { // Estado actual del equipamiento
        type: String,
        required: true,
        trim: true
    },
    mantenimiento:{ // Si se le ah hecho mantenimiento (por lo menos actualizar cada 3 semanas)
        type: String,
        required: true,
        trim: true,
    },
    fechaAdquisicion:{ // Fecha de adquisicion del equipamiento
        type: Date, // Definimos que el tipo de dato es del tipo fecha
        default: Date.now // Definimos que de manera default sea la fecha de hoy
    },
    // Fecha de actualizacion del registro (Sirve para ubicar cuando se le hizo mantencion)
    fechaActualizacion: {
        type: Date,
        default: Date.now
    },
},{
    versionKey:false // Esto evita que se incluya el campo de version o ___v en los registros
});

// Middleware para actualizar la fecha de actualización antes de cada actualización
// Actualiza la fecha de actualizacion a la fecha actual para los cambios en el tiempo
equipoSchema.pre('findOneAndUpdate', function(next) {
    this.set({ fechaActualizacion: new Date() });
    next();
});
// Creamos un modelo en Mongoose basado en el esquema definido para poder interactuar de manera mas facil
// despues y exportarlo.
const BMEquipo = mongoose.model('Equipo', equipoSchema);
export default BMEquipo;