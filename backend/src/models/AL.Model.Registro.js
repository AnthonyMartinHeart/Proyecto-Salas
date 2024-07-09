//CREADO POR ALEJANDRO LATORRE

'use strict';
// Se importa mongoose para interactuar con la base de datos de MongoDB
import mongoose from "mongoose";

// Definicion del esquema o estructura del registro
const registroSchema = new mongoose.Schema({
    nombrePrestamista: {
        type: String, // Definimos del tipo string
        required: true, // Definimos que es necesario llenar este campo
        trim: true // Definimos que elimine los espacios en blanco al inicio y final del valor
    },
    idEquipo: { // Descripcion del equipamiento
        type: String,
        required: true,
        trim: true
    },
    cantidad:{
        type: Number,
        required: true,
        trim: true
    },
    condicionUso:{ // Especifica las condiciones para el uso del equipamiento
        type: String,
        required: true,
        trim: true
    },
    estadoEntrega: { // Estado actual del equipamiento
        type: String,
        required: true,
        trim: true
    },
    estadoDevolucion:{ // En caso de que se presente fallas o daños
        type: String,
        required: true,
        trim: true,
    },
    fechaPrestamo:{ // Fecha de prestamo del equipamiento
        type: Date, // Definimos que el tipo de dato es del tipo fecha
        default: Date.now // Definimos que de manera default sea la fecha de hoy
    },
    // Fecha devolucion del prestamo
    fechaDevolucion: {
        type: Date,
        default: Date.now
    },
},{
    versionKey:false // Esto evita que se incluya el campo de version o ___v en los registros
});

// Middleware para actualizar la fecha de actualización antes de cada actualización
// Actualiza la fecha de prestamo a la fecha actual para los cambios en el tiempo
registroSchema.pre('findOneAndUpdate', function(next) {
    this.set({ fechaDevolucion: new Date() });
    next();
});
// Creamos un modelo en Mongoose basado en el esquema definido para poder interactuar de manera mas facil
// despues y exportarlo.
const registroPrestamo = mongoose.model('Registro', registroSchema);
export default registroPrestamo;
