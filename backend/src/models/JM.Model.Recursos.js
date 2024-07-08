//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

import mongoose from 'mongoose';

// Definición del esquema de recurso

const recursoEsquema = new mongoose.Schema({

    patrimonio: {

        type: String, // Tipo de dato para el patrimonio del recurso (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    nombre: {

        type: String, // Tipo de dato para el nombre del recurso (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    marca: {
        type: String, // Tipo de dato para la marca del recurso (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    modelo: {
        type: String, // Tipo de dato para el modelo del recurso (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    cantidad: {

        type: Number, // Tipo de dato para la cantidad del recurso (número)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Convierte el número en un valor string
    },
    desc: {

        type: String, // Tipo de dato para la descripción del recurso (cadena de caracteres)

        trim: true // Elimina espacios en blanco al inicio y final del valor
    }
}, {

    versionKey: false // Esto evita que se incluya el campo __v en los documentos de recurso
});

// Exporta el modelo de recurso basado en el esquema definido

export default mongoose.model('Recurso', recursoEsquema);
