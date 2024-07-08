//REALIZADO POR JORGE MARTINEZ 2024-1

import mongoose from 'mongoose';

// Definición del esquema de usuario

const usuarioEsquema = new mongoose.Schema({

    nombre: {
        type: String, // Tipo de dato para el nombre del usuario (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    email: {

        type: String, // Tipo de dato para el correo electrónico del usuario (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    contraseña1: {

        type: String, // Tipo de dato para la primera contraseña del usuario (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    },
    contraseña2: {

        type: String, // Tipo de dato para la confirmación de contraseña del usuario (cadena de caracteres)

        required: true, // Campo requerido, no puede estar vacío

        trim: true // Elimina espacios en blanco al inicio y final del valor
    }
    
}, {

    versionKey: false // Esto evita que se incluya el campo __v en los documentos de usuario
});

// Exporta el modelo de usuario basado en el esquema definido

export default mongoose.model('Usuario', usuarioEsquema);
