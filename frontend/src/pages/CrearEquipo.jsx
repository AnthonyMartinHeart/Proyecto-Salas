import React, { useState } from 'react';
import { postService } from '../services/Equipo.service';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'; // Importa el Navbar
import '../styles/Crear.css';

export const Crear = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [especificaciones, setEspecificaciones] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [condicionUso, setCondicionUso] = useState('');
  const [estado, setEstado] = useState('');
  const [mantenimiento, setMantenimiento] = useState('');
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};
    if (!nombre) errors.nombre = 'El nombre es requerido';
    if (!descripcion) errors.descripcion = 'La descripción es requerida';
    if (!especificaciones) errors.especificaciones = 'Las especificaciones son requeridas';
    if (cantidad < 1 || isNaN(cantidad)) errors.cantidad = 'La cantidad debe ser un número positivo mayor o igual a 1';
    if (!condicionUso) errors.condicionUso = 'La condición de uso es requerida';
    if (!estado) errors.estado = 'El estado es requerido';
    if (!mantenimiento) errors.mantenimiento = 'El mantenimiento es requerido';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      await postService({
        nombre,
        descripcion,
        especificaciones,
        cantidad,
        condicionUso,
        estado,
        mantenimiento,
      });
      navigate('/Equipo/Listar'); // Redirige a la lista de equipos después de la creación
    } catch (error) {
      setError('Error al crear el equipo.');
    }
  };

  return (
    <div className="crear-container">
      <Navbar /> {/* Añadir el Navbar aquí */}
      <h2>Crear Nuevo Equipo</h2>
      <form onSubmit={handleSubmit} className="crear-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {formErrors.nombre && <p className="error">{formErrors.nombre}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
          {formErrors.descripcion && <p className="error">{formErrors.descripcion}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="especificaciones">Especificaciones:</label>
          <textarea
            id="especificaciones"
            value={especificaciones}
            onChange={(e) => setEspecificaciones(e.target.value)}
          />
          {formErrors.especificaciones && <p className="error">{formErrors.especificaciones}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cantidad">Cantidad:</label>
          <input
            type="number"
            id="cantidad"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            min="1" // Restricción para no permitir valores menores a 1
          />
          {formErrors.cantidad && <p className="error">{formErrors.cantidad}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="condicionUso">Condición de Uso:</label>
          <input
            type="text"
            id="condicionUso"
            value={condicionUso}
            onChange={(e) => setCondicionUso(e.target.value)}
          />
          {formErrors.condicionUso && <p className="error">{formErrors.condicionUso}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <input
            type="text"
            id="estado"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
          {formErrors.estado && <p className="error">{formErrors.estado}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="mantenimiento">Mantenimiento:</label>
          <input
            type="text"
            id="mantenimiento"
            value={mantenimiento}
            onChange={(e) => setMantenimiento(e.target.value)}
          />
          {formErrors.mantenimiento && <p className="error">{formErrors.mantenimiento}</p>}
        </div>
        <button type="submit">Crear Equipo</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Crear;