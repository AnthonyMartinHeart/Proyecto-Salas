import { useState } from 'react'; // Importa el hook useState de React para manejar el estado del componente
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate de react-router-dom para la navegación
import Navbar from '../components/Navbar'; // Importa el componente de barra de navegación
import { createRecurso } from '../services/recurso.service'; // Asegúrate de que la ruta sea correcta
import '../styles/CrearRecurso.css'; // Asegúrate de tener estilos para este componente

const CrearRecurso = () => {
    // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    patrimonio: '',
    nombre: '',
    marca: '',
    modelo: '',
    cantidad: '',
    desc: ''
  });

  // Estado para manejar mensajes de error
  const [error, setError] = useState('');
  // Estado para manejar mensajes de éxito
  const [successMessage, setSuccessMessage] = useState(''); 
  // Hook de navegación
  const navigate = useNavigate();

  // Maneja los cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    try {
      // Llama al servicio para crear el recurso
      await createRecurso(formData);
    
      setSuccessMessage('Recurso creado exitosamente.'); // Mensaje de éxito
      setError(''); // Limpiar mensaje de error

      // Redirigir después de un breve intervalo
      setTimeout(() => {
        navigate('/obtenerrecursos'); // Redirigir al inicio
      }, 2000); // Cambiar el tiempo (en milisegundos) según tus necesidades

    } catch (error) {
      setError(error.message || 'Error al crear el recurso'); // Manejar el error aquí
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
        <form onSubmit={handleSubmit} className='recurso-form'>
          <div className='form-group'>
            <h1 style={{ padding: '40px', maxWidth: '600px'}}>Crear Recurso</h1>
            <label>Patrimonio:</label>
            <input
              type='text'
              name='patrimonio'
              value={formData.patrimonio}
              onChange={handleChange}
              required
            />
          </div>
          <div className='form-group'>
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
            <label>Marca:</label>
            <input
              type='text'
              name='marca'
              value={formData.marca}
              onChange={handleChange}
            />
          </div>
          <div className='form-group'>
            <label>Modelo:</label>
            <input
              type='text'
              name='modelo'
              value={formData.modelo}
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
            <label>Descripción:</label>
            <input
              type='text'
              name='desc'
              value={formData.desc}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='submit-button'>Crear Recurso</button>
        </form>
      </div>
    </>
  );
};

export default CrearRecurso;
