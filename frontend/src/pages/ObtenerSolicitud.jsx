import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSolicitudes, deleteSolicitud } from '../services/solicitud.service';
import '../styles/ObtenerSolicitud.css';
import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';

const ObtenerSolicitud = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSolicitudes = async () => {
      try {
        const response = await getSolicitudes();
        const data = response.data; // Asegúrate de usar response.data
        if (Array.isArray(data)) {
          setSolicitudes(data);
        } else {
          throw new Error('La respuesta del servidor no es un array');
        }
        setError('');
      } catch (err) {
        setError(err.message || 'Error al obtener las solicitudes');
        console.error('Error: ', err);
      }
    };

    fetchSolicitudes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteSolicitud(id);
      setSolicitudes(solicitudes.filter(solicitud => solicitud._id !== id));
    } catch (error) {
      setError(error.message || 'Error al eliminar la solicitud');
      console.error("Error: ", error);
    }
  };

  const handleEdit = (id) => {
    const solicitud = solicitudes.find(s => s._id === id);
    navigate(`/edit-solicitud/${id}`, { state: { solicitud } });
  };

  return (
    <>
      <Navbar />
      <div className='error-message'>{error}</div>
      <h1 className='form-title'>Mis Solicitudes</h1>
      <div className='table-container'>
        <table className='solicitud-table'>
          <thead>
            <tr>
              <th>Recurso</th>
              <th>Tipo</th>
              <th>Fecha Inicio</th>
              <th>Fecha Fin</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((solicitud) => (
              <tr key={solicitud._id}>
                <td>{solicitud.recurso}</td>
                <td>{solicitud.tipo}</td>
                <td>{new Date(solicitud.fechaInicio).toLocaleDateString()}</td>
                <td>{new Date(solicitud.fechaFin).toLocaleDateString()}</td>
                <td>{solicitud.estado}</td>
                <td>
                  <button onClick={() => handleEdit(solicitud._id)} className='action-button' aria-label={`Editar solicitud ${solicitud.recurso}`}>
                    <img src={updateIcon} alt='Editar' className='icon' />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(solicitud._id)} className='action-button' aria-label={`Eliminar solicitud ${solicitud.recurso}`}>
                    <img src={deleteIcon} alt='Eliminar' className='icon' />
                    Cancelar Solicitud
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ObtenerSolicitud;
