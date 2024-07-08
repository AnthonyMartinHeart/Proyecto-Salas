//REALIZADO POR JORGE MARTINEZ 2024-1

import mongoose from 'mongoose';

// Definición del esquema de reserva

const reservaEsquema = new mongoose.Schema({

    nombre: {
        
        type: String, // Tipo de dato para el nombre de la reserva (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    tipo: {
        type: String, // Tipo de dato para el tipo de reserva (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    capacidad: {

        type: Number // Tipo de dato para la capacidad de la reserva (número)
    },
    horario: {

        type: String, // Tipo de dato para el horario de la reserva (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    codigoAsignatura: {

        type: String, // Tipo de dato para el código de asignatura relacionada (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    codigoClase: {

        type: String, // Tipo de dato para el código de clase relacionada (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    nombreAsignatura: {

        type: String, // Tipo de dato para el nombre de la asignatura relacionada (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    nombreProfesor: {

        type: String, // Tipo de dato para el nombre del profesor relacionado (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    cantidad: {

        type: Number, // Tipo de dato para la cantidad de reserva (número)

        required: true // Campo requerido, no puede estar vacío
    },
    patrimonio: {

        type: String, // Tipo de dato para el patrimonio relacionado (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    }
}, {
    versionKey: false // Esto evita que se incluya el campo __v en los documentos de reserva
});

// Exporta el modelo de reserva basado en el esquema definido

export default mongoose.model('Reserva', reservaEsquema);