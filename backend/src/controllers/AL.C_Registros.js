// controllers/AL.C_Registros.js
'use strict';
import RegistroPrestamo from '../models/AL.Model.Registro.js';
import BMEquipo from '../models/BM.Model.Equipo.js';

// Controlador para crear un nuevo registro de préstamo
const crearRegistros = async (req, res) => {
  try {
    const { idEquipo, cantidad } = req.body;

    // Verificar si el equipo existe
    const equipo = await BMEquipo.findById(idEquipo);
    if (!equipo) {
      return res.status(404).send({ message: 'Equipo no encontrado' });
    }

    // Verificar si hay cantidad suficiente
    if (equipo.cantidad < cantidad) {
      return res.status(400).send({ message: 'Cantidad insuficiente de equipo disponible' });
    }

    // Crear y guardar el nuevo registro de préstamo
    const nuevoRegistro = new RegistroPrestamo(req.body);
    const registro = await nuevoRegistro.save();

    // Actualizar la cantidad del equipo
    equipo.cantidad -= cantidad;
    await equipo.save();

    res.status(201).send(registro);
    console.log('La solicitud ha tenido éxito y se ha agregado un registro correctamente.');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor', error);
  }
};

// Controlador para actualizar un registro de préstamo existente
const actualizarRegistros = async (req, res) => {
  try {
    const { id } = req.params;
    const { idEquipo, cantidad, cantidadAnterior } = req.body;

    // Verificar si el equipo existe
    const equipo = await BMEquipo.findById(idEquipo);
    if (!equipo) {
      return res.status(404).send({ message: 'Equipo no encontrado' });
    }

    // Verificar si hay cantidad suficiente para la actualización
    const diferenciaCantidad = cantidad - cantidadAnterior;
    if (equipo.cantidad < diferenciaCantidad) {
      return res.status(400).send({ message: 'Cantidad insuficiente de equipo disponible' });
    }

    // Actualizar el registro de préstamo
    const registro = await RegistroPrestamo.findByIdAndUpdate(id, req.body, { new: true });
    if (!registro) {
      return res.status(404).send({ message: 'Registro no encontrado' });
    }

    // Actualizar la cantidad del equipo
    equipo.cantidad -= diferenciaCantidad;
    await equipo.save();

    res.status(200).send(registro);
    console.log('Registro de préstamo actualizado exitosamente.');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor', error);
  }
};

// Controlador para eliminar un registro de préstamo existente
const eliminarRegistros = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar el registro de préstamo y la cantidad del equipo
    const registro = await RegistroPrestamo.findById(id);
    if (!registro) {
      return res.status(404).send({ message: 'Registro no encontrado' });
    }

    const equipo = await BMEquipo.findById(registro.idEquipo);
    if (!equipo) {
      return res.status(404).send({ message: 'Equipo no encontrado' });
    }

    // Actualizar la cantidad del equipo
    equipo.cantidad += registro.cantidad;
    await equipo.save();

    // Eliminar el registro de préstamo
    await RegistroPrestamo.findByIdAndDelete(id);

    res.status(200).send(registro);
    console.log('Registro de préstamo eliminado exitosamente.');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor', error);
  }
};

// Controlador para listar todos los registros de préstamo
const listarRegistros = async (req, res) => {
  try {
    // Buscar todos los registros de préstamo
    const registros = await RegistroPrestamo.find({}).populate('idEquipo', 'nombre descripcion');
    res.status(200).send(registros);
    console.log('Registros de préstamo listados exitosamente.');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor', error);
  }
};

export { crearRegistros, actualizarRegistros, eliminarRegistros, listarRegistros };