import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createReserva } from '../services/reserva.service'; // Asegúrate de que la ruta sea correcta
import '../styles/CrearReserva.css'; // Asegúrate de tener estilos para este componente

const CrearReserva = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    tipo: '',
    capacidad: '',
    horario: '',
    codigoAsignatura: '',
    codigoClase: '',
    nombreAsignatura: '',
    nombreProfesor: '',
    cantidad: '',
    patrimonio: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReserva(formData);
      setSuccessMessage('Reserva creada exitosamente.'); // Mensaje de éxito
      setError(''); // Limpiar mensaje de error

      // Redirigir después de un breve intervalo
      setTimeout(() => {
        navigate('/obtenerreservas'); // Redirigir al inicio
      }, 2000); // Cambiar el tiempo (en milisegundos) según tus necesidades

    } catch (error) {
      setError(error.message || 'Error al crear la reserva'); // Manejar el error aquí
      setSuccessMessage(''); // Limpiar mensaje de éxito si hay un error
      console.error('Error: ', error);
    }
  };

  return (
    <>
      <Navbar />
      
      <div className='main-container'>
        
        {error && <div className='error-message'>{error}</div>} {/* Mostrar el mensaje de error */}
        {successMessage && <div className='success-message'>{successMessage}</div>} {/* Mensaje de éxito */}
        <form onSubmit={handleSubmit} className='reserva-form'>
          <div className='form-group'>
            <h1  style={{ padding: '40px', maxWidth: '600px'}}>Crear Reserva</h1>
            <label>Nombre:</label>
            <input
              type='text'
              name='nombre'
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
            <label>Tipo:</label>
            <input
              type='text'
              name='tipo'
              value={formData.tipo}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Capacidad:</label>
            <input
              type='number'
              name='capacidad'
              value={formData.capacidad}
              onChange={handleChange}
              required
              min='1'
              max='40'
            />
          </div>
          <div className='form-group'>
            <label>Horario:</label>
            <input
              type='text'
              name='horario'
              value={formData.horario}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Código de Asignatura:</label>
            <input
              type='text'
              name='codigoAsignatura'
              value={formData.codigoAsignatura}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Código de Clase:</label>
            <input
              type='text'
              name='codigoClase'
              value={formData.codigoClase}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Nombre de Asignatura:</label>
            <input
              type='text'
              name='nombreAsignatura'
              value={formData.nombreAsignatura}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Nombre del Profesor:</label>
            <input
              type='text'
              name='nombreProfesor'
              value={formData.nombreProfesor}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Cantidad:</label>
            <input
              type='number'
              name='cantidad'
              value={formData.cantidad}
              onChange={handleChange}
              required
              min='1'
            />
          </div>
          <div className='form-group'>
            <label>Patrimonio:</label>
            <input
              type='text'
              name='patrimonio'
              value={formData.patrimonio}
              onChange={handleChange}
              required
            />
          </div>
          <button type='submit' className='submit-button'>Crear Reserva</button>
        </form>
      </div>
    </>
  );
};

export default CrearReserva;
