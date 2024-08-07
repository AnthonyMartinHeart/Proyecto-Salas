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
        const { nombre, cantidad } = req.body;

        // Verificar si la capacidad supera el límite permitido
        if (cantidad >= 40) {
            return res.status(400).send({ message: 'Limite De cantidad Alcanzado' });
        }

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

export const updateRecurso = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el _id de la URL
        const updateData = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

        // Verificar si el ID y los datos de actualización están presentes
        if (!id || !updateData) {
            return res.status(400).send({ message: 'Se requiere ID del recurso y datos para actualizar' });
        }

        // Verificar si la cantidad es un número positivo
        if (updateData.cantidad && (updateData.cantidad <= 0 || isNaN(updateData.cantidad))) {
            return res.status(400).send({ message: 'La cantidad debe ser un número positivo' });
        }

        // Actualizar el recurso con los nuevos datos y devolver el documento actualizado
        const updatedRecurso = await Recurso.findByIdAndUpdate(id, updateData, { new: true });

        // Verificar si se encontró y actualizó el recurso
        if (!updatedRecurso) {
            return res.status(404).send({ message: 'Recurso no encontrado' });
        }

        // Enviar una respuesta de éxito con un mensaje y los datos actualizados
        res.status(200).send({ message: '¡Recurso actualizado con éxito!', recurso: updatedRecurso });

    } catch (error) {
        // En caso de error, enviar un estado 400 con un mensaje y el error
        console.error('Error al actualizar recurso:', error);
        res.status(400).send({ message: 'No se pudo actualizar el recurso', error });
    }
};
