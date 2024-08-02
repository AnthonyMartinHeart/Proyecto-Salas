import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createSolicitud } from '../services/solicitud.service'; // Asegúrate de que la ruta sea correcta
import '../styles/CrearSolicitud.css'; // Asegúrate de tener estilos para este componente

const CrearSolicitud = () => {
  const [formData, setFormData] = useState({
    tipo: '',
    recurso: '',
    fechaInicio: '',
    fechaFin: ''
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
      await createSolicitud(formData);
      setSuccessMessage('Solicitud creada exitosamente.'); // Mensaje de éxito
      setError(''); // Limpiar mensaje de error

      // Redirigir después de un breve intervalo
      setTimeout(() => {
        navigate('/obtenersolicitudes'); // Redirigir a la página de solicitudes
      }, 2000); // Cambiar el tiempo (en milisegundos) según tus necesidades

    } catch (error) {
      setError(error.message || 'Error al crear la solicitud'); // Manejar el error aquí
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
        <form onSubmit={handleSubmit} className='solicitud-form'>
          <div className='form-group'>
            <h1 style={{ padding: '40px', maxWidth: '600px' }}>Crear Solicitud</h1>
            <div className='form-group'>
              <label>Tipo:</label>
              <select
                name='tipo'
                value={formData.tipo}
                onChange={handleChange}
                required
              >
                <option value=''>Selecciona un tipo</option>
                <option value='sala'>Sala</option>
                <option value='equipo'>Equipo</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Recurso:</label>
              <input
                type='text'
                name='recurso'
                value={formData.recurso}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Fecha de Inicio:</label>
              <input
                type='date'
                name='fechaInicio'
                value={formData.fechaInicio}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Fecha de Fin:</label>
              <input
                type='date'
                name='fechaFin'
                value={formData.fechaFin}
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' className='submit-button'>Crear Solicitud</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CrearSolicitud;
