//CREADO POR BENJAMIN MANRIQUEZ

'use strict';
//importamos variables de los modelos que se usan mas adelante
import BMEquipo from '../models/BM.Model.Equipo.js';
import User from '../models/user.model.js';
import Role from '../models/role.model.js';
//importe opcional ya que el nodemailer es para el sistema de notificaciones
import { createTransport } from 'nodemailer';

// Configuración del transporte para Gmail [el cual no funciona por que la cuenta no existe]
// Esta configuración trae datos del .env de manera para que sea mas segura
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,

  }
});

// Función para obtener el rol de usuario
async function getRoles() {
  const userRole = await Role.findOne({ name: "usuario" });
  return { userRole };
}

// Función para enviar notificaciones por correo electrónico
//Esto envia a cada usuario una actualización de inventario mas la acción que se hizo
const enviarNotificacion = async (accion, equipo) => {
  try {
    const { userRole } = await getRoles(); // Obtener los roles
    // Obtener todos los usuarios con el rol de usuario
    const usuarios = await User.find({ roles: userRole._id });

    // Construir la lista de destinatarios con los correos del tipo usuario
    const destinatarios = usuarios.map(usuario => usuario.email).join(',');

    if (!destinatarios) {
      console.log('No hay destinatarios con el rol especificado.');
      return;
    }

    //Mensaje que va en el correo con los datos de los cambios
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: destinatarios,
      subject: `Inventario Actualizado - ${accion}`,
      text: `El inventario ha sido actualizado. Acción: ${accion}. Equipo: ${JSON.stringify(equipo)}`
    };
    //Verifica que se ah enviado el correo o si da error
    await transporter.sendMail(mailOptions); 
    console.log('Correo enviado');
  } catch (error) {
    console.log('Error al enviar notificación: ', error);
  }
};

// Controlador para crear un nuevo equipo
const crearEquipo = async (req, res) => {
  try {
    const nuevoEquipo = new BMEquipo(req.body);// Usa el modelo de BM.Model.Equipo.js
    const equipo = await nuevoEquipo.save(); // Guarda los datos del nuevo equipo para la notificación
    await enviarNotificacion('Adquisicion', equipo);// Envia la notificacion con la acción que se realiza
    res.status(201).send(equipo); // Codígo de estatus de la creacion y acción
    console.log('La solicitud ah tenido exito y se ah agregado un equipo correctamente.');
  } catch (error) {
    res.status(500).send(error); //Codigo y console log del error
    console.log('Error interno del servidor');
  }
};

// Controlador para actualizar un equipo existente
const actualizarEquipo = async (req, res) => {
  try {
    // Encuentra por id el equipo y lo actualiza
    const equipo = await BMEquipo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await enviarNotificacion('Actualización', equipo); // Envia la notificacion con la acción que se realiza
    res.status(200).send(equipo); // Codígo de la accion realizada con exito
    console.log('La solicitud se ah completado con exito');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor');
  }
};

// Controlador para eliminar un equipo existente
const eliminarEquipo = async (req, res) => {
  try {
    // Elimina buscando el id del equipo 
    const equipo = await BMEquipo.findByIdAndDelete(req.params.id);
    await enviarNotificacion('Eliminación', equipo); // Envia la notificacion con la acción que se realiza
    res.status(200).send(equipo);
    console.log('La solicitud se ah completado con exito');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor');
  }
};

// Controlador para listar todos los equipos
const listarEquipos = async (req, res) => {
  try {
    // Busca todos los registros de la colección BMEquipo y los muestra
    const equipos = await BMEquipo.find({});
    res.status(200).send(equipos);
    console.log('La solicitud se ah completado con exito');
  } catch (error) {
    res.status(500).send(error);
    console.log('Error interno del servidor');
  }
};

const listarUno = async (req, res) => {
  try {
    // Obtener el ID de los parámetros de la solicitud
    const id = req.params.id;

    // Buscar el equipo por ID en la base de datos
    const equipo = await BMEquipo.findById(id);

    // Verificar si se encontró el equipo
    if (!equipo) {
      return res.status(404).send({ message: 'Equipo no encontrado' });
    }

    // Enviar el equipo como respuesta
    res.status(200).send(equipo);
    console.log('Se ah encontrado el equipo');
  } catch (error) {
    // Manejar errores y enviar una respuesta de error
    res.status(500).send(error);
    console.log('Error interno del servidor');
  }
};

export {crearEquipo, actualizarEquipo, eliminarEquipo, listarEquipos, listarUno };