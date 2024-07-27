//REALIZADO POR JORGE MARTINEZ 2024-1

'use strict';

// Importamos mongoose para interactuar con la base de datos MongoDB

import mongoose from 'mongoose';

// Importamos el modelo Reserva que definimos en JM.Model.Reservas.js

import Reserva from '../models/JM.Model.Reservas.js';

// Controlador para obtener todas las reservas

export const get = async (req, res) => {

    try {

        // Buscamos todos los documentos en la colección de reservas

        const data = await Reserva.find({});

        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para obtener reservas por nombre, devolviendo solo nombres distintos

export const getByName = async (req, res) => {

    try {

        // Buscamos reservas cuyo nombre coincida (parcialmente y sin distinguir mayúsculas/minúsculas) con el parámetro de la URL

        const data = await Reserva.find({

            nombre: new RegExp(req.params.nombre, 'i') // 'i' para case insensitive

        }).distinct('nombre'); // Solo devolvemos nombres distintos

        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para obtener reservas por nombre

export const getByNameSala = async (req, res) => {

    try {

        // Buscamos reservas cuyo nombre coincida (parcialmente y sin distinguir mayúsculas/minúsculas) con el parámetro de la URL

        const data = await Reserva.find({

            nombre: new RegExp(req.params.nombre, 'i') // 'i' para case insensitive
        });
        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para obtener una reserva por ID

export const getById = async (req, res) => {

    try {
        // Buscamos una reserva por su ID

        const data = await Reserva.findById(req.params.id);

        // Enviamos los datos encontrados con un estado 200 (éxito)

        res.status(200).send(data);

    } catch (e) {

        // En caso de error, enviamos un estado 400 con el error

        res.status(400).send(e);
    }
};

// Controlador para crear una nueva reserva
export const post = async (req, res) => {
    try {
        const { nombre, capacidad } = req.body;

        // Verificar si la capacidad supera el límite permitido
        if (capacidad >= 40) {
            return res.status(400).send({ message: 'La capacidad de la sala no puede superar los 40 asientos' });
        }

        // Verificar si ya existe una reserva con el mismo nombre (o algún otro campo relevante)
        const existingReserva = await Reserva.findOne({ nombre });

        if (existingReserva) {
            // Si ya existe una reserva con los mismos datos relevantes, enviar un mensaje de error
            return res.status(400).send({ message: 'Ya existe una reserva con estos datos' });
        }

        // Si no existe una reserva con los mismos datos relevantes, crear una nueva instancia
        const nuevaReserva = new Reserva(req.body);

        // Guardar la nueva reserva en la base de datos
        await nuevaReserva.save();

        // Enviar una respuesta de éxito con un mensaje
        res.status(201).send({ message: 'Registrado Exitosamente' });

    } catch (error) {
        // En caso de error, enviar un estado 400 con un mensaje y el error
        res.status(400).send({ message: 'Fallo al Registrar', error });
    }
};

// Controlador para eliminar una reserva por ID

export const deleteReserva = async (req, res) => {

    try {

        const { _id } = req.body; // Asegúrate de que estás recibiendo _id en el cuerpo de la solicitud

        // Buscamos y eliminamos la reserva por su ID

        const data = await Reserva.findByIdAndDelete(_id);

        // Verificamos si se encontró y eliminó la reserva

        if (!data) {

            // Si no se encontró la reserva, enviamos un estado 404 con un mensaje

            return res.status(404).send({ message: 'Reserva no encontrada' });
        }

        // Enviamos una respuesta de éxito si se eliminó correctamente

        res.status(200).send({ message: '¡Reserva eliminada con éxito!' });

    } catch (error) {

        // En caso de error, enviamos un estado 500 con un mensaje y el error

        console.error('Error al eliminar reserva:', error);

        res.status(500).send({ message: 'No se pudo eliminar la reserva', error: error.message });
    }
};


// Controlador para actualizar una reserva por ID

export const updatedReserva = async (req, res) => {
    try {

        const { id } = req.params; // Obtener el _id de la URL

        const updateData = req.body; // Obtener los datos actualizados del cuerpo de la solicitud

        // Verificar si el ID y los datos de actualización están presentes

        if (!id || !updateData) {

            // Si falta el ID o los datos de actualización, enviamos un estado 400 con un mensaje

            return res.status(400).send({ message: 'Se requiere ID de reserva y datos para actualizar' });
        }

        // Verificar si la capacidad supera el límite permitido

        if (updateData.capacidad && updateData.capacidad >= 40) {

            return res.status(400).send({ message: 'La capacidad de la sala no puede superar los 40 asientos' });
        }

        // Actualizamos la reserva con los nuevos datos y devolvemos el documento actualizado

        const updatedReserva = await Reserva.findByIdAndUpdate(id, updateData, { new: true });

        // Verificamos si se encontró y actualizó la reserva

        if (!updatedReserva) {

            // Si no se encontró la reserva, enviamos un estado 404 con un mensaje

            return res.status(404).send({ message: 'Reserva no encontrada' });
        }

        // Enviamos una respuesta de éxito con un mensaje y los datos actualizados

        res.status(200).send({ message: '¡Reserva actualizada con éxito!', reserva: updatedReserva });

    } catch (error) {

        // En caso de error, enviamos un estado 400 con un mensaje y el error
        console.error('Error al actualizar reserva:', error);

        res.status(400).send({ message: 'No se pudo actualizar la reserva', error });
    }
};
