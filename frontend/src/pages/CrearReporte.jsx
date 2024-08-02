import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createReport } from '../services/reporte.service'; // Asegúrate de que la ruta sea correcta
import '../styles/CrearReporte.css'; // Asegúrate de tener estilos para este componente

const CrearReporte = () => {
  const [formData, setFormData] = useState({
    resourceName: '',
    usageFrequency: '',
    peakHours: '',
    equipmentStatus: '', // Estado inicial vacío
    lastUpdated: new Date().toISOString()
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

  const handlePeakHoursChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      peakHours: value
    });
  };

  const validateTimeRange = (timeRange) => {
    // Expresión regular para validar el formato HH:mm-HH:mm
    const timeRangeRegex = /^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRangeRegex.test(timeRange);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verificar valores de formData
      console.log('Form Data:', formData);

      // Validar campo resourceName
      if (!formData.resourceName.trim()) {
        throw new Error('El nombre del recurso no puede estar vacío.');
      }

      const timeRanges = formData.peakHours
        .split(',')
        .map(hourRange => hourRange.trim())
        .filter(hourRange => hourRange && validateTimeRange(hourRange)); // Validar cada rango de horas

      if (timeRanges.length === 0) {
        throw new Error('Por favor, ingrese al menos un rango de horas válido.');
      }

      const reportData = {
        ...formData,
        peakHours: timeRanges
      };

      await createReport(reportData);
      setSuccessMessage('Reporte creado exitosamente.'); // Mensaje de éxito
      setError(''); // Limpiar mensaje de error

      // Redirigir después de un breve intervalo
      setTimeout(() => {
        navigate('/obtenerreportes'); // Redirigir a la página de reportes
      }, 2000); // Cambiar el tiempo (en milisegundos) según tus necesidades

    } catch (error) {
      setError(error.message || 'Error al crear el reporte'); // Manejar el error aquí
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
        <form onSubmit={handleSubmit} className='reporte-form'>
          <div className='form-group'>
            <h1 style={{ padding: '40px', maxWidth: '600px' }}>Crear Reporte</h1>
            <div className='form-group'>
              <label>Nombre del Recurso:</label>
              <input
                type='text'
                name='resourceName'
                value={formData.resourceName}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Frecuencia de Uso:</label>
              <input
                type='number'
                name='usageFrequency'
                value={formData.usageFrequency}
                onChange={handleChange}
                required
              />
            </div>
            <div className='form-group'>
              <label>Horas (formato HH:mm-HH:mm, separado por comas):</label>
              <input
                type='text'
                name='peakHours'
                value={formData.peakHours}
                onChange={handlePeakHoursChange}
                required
                placeholder="08:00-10:00, 18:00-20:00"
              />
              <small>Ejemplo: 08:00-10:00, 18:00-20:00</small>
            </div>
            <div className='form-group'>
              <label>Estado del Equipo:</label>
              <select
                name='equipmentStatus'
                value={formData.equipmentStatus}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona un estado</option>
                <option value="Ok">Ok</option>
                <option value="Necesita mantencion">Necesita mantención</option>
                <option value="Fuera de Uso">Fuera de Uso</option>
              </select>
            </div>
            <div className='form-group'>
              <label>Última Actualización:</label>
              <input
                type='datetime-local'
                name='lastUpdated'
                value={new Date(formData.lastUpdated).toISOString().slice(0, 16)} // Formato para datetime-local
                onChange={handleChange}
                required
              />
            </div>
            <button type='submit' className='submit-button'>Crear Reporte</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CrearReporte;
