//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

import mongoose from 'mongoose';

import Usuario from '../models/JM.Model.Usuario.js'; // Importar el modelo de Usuario

// import { sendEmail } from '../csv/sendEmail.js'; // Descomentar cuando se use (importar función para enviar correos) AUN ES UN PROTOTIPO

// Controlador para obtener todos los usuarios

export const get = async (req, res) => {

    try {
        
        const data = await Usuario.find({}); // Buscar todos los usuarios en la base de datos

        res.status(200).send(data); // Enviar los datos obtenidos como respuesta

    } catch (e) {

        res.status(400).send(e); // Manejar errores enviando un mensaje de error con estado 400
    }
};

// Controlador para registrar un nuevo usuario

export const post = async (req, res) => {

    try {

        const { nombre, email } = req.body;

        // Verificar si ya existe un usuario con el mismo nombre o correo electrónico

        const existeNombreUsuario = await Usuario.findOne({ nombre });

        const existeEmailUsuario = await Usuario.findOne({ email });

        if (existeNombreUsuario) {

            return res.status(400).send({ message: 'Ya existe un usuario con ese nombre' });

        }

        if (existeEmailUsuario) {

            return res.status(400).send({ message: 'Ya existe un usuario con ese correo electrónico' });
        }

        // Crear un nuevo usuario

        const usuario = new Usuario(req.body);

        await usuario.save(); // Guardar el nuevo usuario en la base de datos

        // Enviar correo electrónico (descomentar cuando esté listo)

        // sendEmail(usuario); PROTOTIPO NO TERMINADO

        res.status(201).send({ message: 'Registrado Exitosamente' }); // Enviar mensaje de éxito con estado 201

    } catch (e) {

        res.status(400).send({ message: 'Fallo Al Registrar', data: e }); // Manejar errores de registro
    }
};

// Controlador para actualizar un usuario por ID

export const put = async (req, res) => {

    try {

        const { _id, nombre, email } = req.body;

        await Usuario.updateOne({ _id }, { $set: { nombre, email } }); // Actualizar el usuario por su ID


        res.status(200).send({ message: 'Actualizado Correctamente' }); // Enviar mensaje de éxito con estado 200


    } catch (e) {

        res.status(400).send({ message: 'Fallo Al Actualizar', data: e }); // Manejar errores de actualización
    }
};

// Controlador para eliminar un usuario por ID

export const deleteUsuario = async (req, res) => {

    try {

        const { id } = req.params; // Obtener el ID del usuario a eliminar desde los parámetros de la URL

        // Intentar encontrar y eliminar el usuario

        const data = await Usuario.findOneAndDelete({ _id: id });

        // Verificar si se encontró y eliminó el usuario

        if (!data) {

            return res.status(404).send({ message: 'Usuario no encontrado' }); // Enviar error si el usuario no fue encontrado
        }

        // Enviar respuesta de éxito si se eliminó correctamente

        return res.status(200).send({ message: '¡Usuario eliminado exitosamente!' });

    } catch (error) {

        console.error('Error al eliminar el usuario:', error); // Registrar errores en la consola

        return res.status(500).send({ message: 'Error al intentar eliminar el usuario', error: error.message }); // Enviar error interno del servidor
    }
};

// Controlador para buscar usuarios por nombre (con coincidencia parcial e insensible a mayúsculas/minúsculas)

export const getByName = async (req, res) => {

    try {
        const data = await Usuario.find({ nombre: new RegExp(req.params.nombre, 'i') }); // Buscar usuarios por nombre

        res.status(200).send(data); // Enviar los datos obtenidos como respuesta

    } catch (e) {

        res.status(400).send(e); // Manejar errores enviando un mensaje de error con estado 400
    }
};

// Controlador para iniciar sesión

export const login = async (req, res) => {

    try {

        const { email, contraseña } = req.body; // Obtener email y contraseña del cuerpo de la solicitud

        // Buscar usuario por email

        let usuario = await Usuario.findOne({ email });

        // Verificar si el usuario existe

        if (!usuario) {

            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Verificar si la sesión ya está iniciada

        if (usuario.sesionIniciada === true) {

            return res.status(200).send({ message: 'Sesión ya iniciada', usuario });
        }

        // Verificar la contraseña

        if (contraseña !== usuario.contraseña1 && contraseña !== usuario.contraseña2) {

            return res.status(401).send({ message: 'Credenciales inválidas' });
        }

        // Marcar la sesión como iniciada

        usuario.sesionIniciada = true;

        await usuario.save();

        // Enviar usuario encontrado como respuesta

        res.status(200).send({ message: 'Inicio de sesión exitoso', usuario });

    } catch (error) {

        console.error('Error al iniciar sesión:', error);

        res.status(500).send({ message: 'Error al intentar iniciar sesión', error: error.message });
    }
};

// Controlador para cerrar sesión

export const logout = async (req, res) => {

    try {

        const usuarioId = req.params.id; // Obtener el ID del usuario desde los parámetros de la URL

        // Buscar usuario por ID

        const usuario = await Usuario.findById(usuarioId);

        // Verificar si el usuario existe

        if (!usuario) {

            return res.status(404).send({ message: 'Usuario no encontrado' });
        }

        // Marcar la sesión como cerrada

        usuario.sesionIniciada = false;

        await usuario.save();

        // Enviar mensaje de éxito

        res.status(200).send({ message: 'Sesión cerrada correctamente' });

    } catch (error) {
        
        console.error('Error al cerrar sesión:', error);

        res.status(500).send({ message: 'Error al intentar cerrar sesión', error: error.message });
    }
};