//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

// Importamos mongoose para interactuar con la base de datos MongoDB

import mongoose from 'mongoose';

// Importamos el modelo Recurso que definimos en JM.Model.Recursos.js

import Recurso from '../models/JM.Model.Recursos.js';

// Controlador para obtener todos los recursos

export const getAll = async (req, res) => {

    try {

        // Buscamos todos los documentos en la colección de recursos

        const data = await Recurso.find({});

        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para crear un nuevo recurso

export const post = async (req, res) => {
    try {
        const { nombre } = req.body;

        // Verificar si ya existe un recurso con el mismo nombre
        const existingRecurso = await Recurso.findOne({ nombre });

        if (existingRecurso) {
            // Si ya existe un recurso con el mismo nombre, enviar un mensaje de error
            return res.status(400).send({ message: 'Ya existe un recurso con este nombre' });
        }

        // Si no existe un recurso con el mismo nombre, crear uno nuevo
        const nuevoRecurso = new Recurso(req.body);

        // Guardar el nuevo recurso en la base de datos
        await nuevoRecurso.save();

        // Enviar una respuesta de éxito con un mensaje
        res.status(201).send({ message: 'Registrado Exitosamente' });

    } catch (error) {
        // En caso de error, enviar un estado 400 con un mensaje y el error
        res.status(400).send({ message: 'Fallo Al Registrar', error });
    }
};

// Controlador para obtener recursos por nombre

export const getByName = async (req, res) => {
    try {

        // Buscamos recursos cuyo nombre coincida (parcialmente y sin distinguir mayúsculas/minúsculas) con el parámetro de la URL

        const data = await Recurso.find({

            nombre: new RegExp(req.params.name, 'i') // 'i' para case insensitive

        });

        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para eliminar un recurso por ID

export const deleteRecurso = async (req, res) => {

    try {

        const { id } = req.params; // Obtener el ID del parámetro de la URL

        // Intentar encontrar y eliminar el recurso

        const data = await Recurso.findByIdAndDelete(id);

        // Verificar si se encontró y eliminó el recurso

        if (!data) {
            // Si no se encontró el recurso, enviamos un estado 404 con un mensaje

            return res.status(404).send({ message: 'Recurso no encontrado' });
        }

        // Enviar respuesta de éxito si se eliminó correctamente

        return res.status(200).send({ message: '¡Recurso eliminado con éxito!' });

    } catch (error) {

        // En caso de error, enviamos un estado 500 con un mensaje y el error

        console.error('Error al eliminar el recurso:', error);

        return res.status(500).send({ message: 'Error al intentar eliminar el recurso', error: error.message });
    }
};

// Controlador para actualizar un recurso

export const put = async (req, res) => {
    try {
        const { _id, patrimonio, nombre, marca, modelo, cantidad, desc } = req.body;

        // Actualizamos el recurso con los nuevos datos y devolvemos el documento actualizado

        const data = await Recurso.findByIdAndUpdate(
            _id,
            { patrimonio, nombre, marca, modelo, cantidad, desc },

            { new: true }
        );


        // Verificar si se encontró y actualizó el recurso

        if (!data) {

            // Si no se encontró el recurso, enviamos un estado 404 con un mensaje

            res.status(404).send({ message: 'Recurso no encontrado' });

            return;
        }

        // Enviamos una respuesta de éxito con un mensaje

        res.status(200).send({ message: 'Actualizado Exitosamente' });

    } catch (e) {
        // En caso de error, enviamos un estado 400 con un mensaje y el error

        res.status(400).send({ message: 'Fallo al Actualizar', data: e });
    }
};
