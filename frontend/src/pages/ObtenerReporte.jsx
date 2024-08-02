import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllReports, deleteReport } from '../services/reporte.service'; // Asegúrate de que la ruta sea correcta
import '../styles/ObtenerReporte.css'; // Asegúrate de tener estilos para este componente
import deleteIcon from '../assets/deleteIcon.svg'; // Asegúrate de que la ruta sea correcta
import updateIcon from '../assets/updateIcon.svg'; // Asegúrate de que la ruta sea correcta

const ObtenerReporte = () => {
  const [reportes, setReportes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReportes = async () => {
      try {
        const response = await getAllReports();
        const data = response; // Asegúrate de usar response directamente si no hay un data en la respuesta
        if (Array.isArray(data)) {
          setReportes(data);
        } else {
          throw new Error('La respuesta del servidor no es un array');
        }
        setError('');
      } catch (err) {
        setError(err.message || 'Error al obtener los reportes');
        console.error('Error: ', err);
      }
    };

    fetchReportes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReport(id);
      setReportes(reportes.filter(reporte => reporte._id !== id));
    } catch (error) {
      setError(error.message || 'Error al eliminar el reporte');
      console.error("Error: ", error);
    }
  };

  const handleEdit = (id) => {
    const reporte = reportes.find(r => r._id === id);
    navigate(`/edit-reporte/${id}`, { state: { reporte } });
  };

  return (
    <>
      <Navbar />
      <div className='error-message'>{error}</div>
      <h1 className='form-title'>Mis Reportes</h1>
      <div className='table-container'>
        <table className='reporte-table'>
          <thead>
            <tr>
              <th>Nombre del Recurso</th>
              <th>Frecuencia de Uso</th>
              <th>Peak Hours</th>
              <th>Estado del Equipo</th>
              <th>Última Actualización</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {reportes.map((reporte) => (
              <tr key={reporte._id}>
                <td>{reporte.resourceName || 'No Disponible'}</td>
                <td>{reporte.usageFrequency || 'No Disponible'}</td>
                <td>{reporte.peakHours ? reporte.peakHours.join(', ') : 'No Disponible'}</td>
                <td>{reporte.equipmentStatus || 'No Disponible'}</td>
                <td>{reporte.lastUpdated ? new Date(reporte.lastUpdated).toLocaleString() : 'No Disponible'}</td>
                <td>
                  <button onClick={() => handleEdit(reporte._id)} className='action-button' aria-label={`Editar reporte ${reporte.resourceName}`}>
                    <img src={updateIcon} alt='Editar' className='icon' />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(reporte._id)} className='action-button' aria-label={`Eliminar reporte ${reporte.resourceName}`}>
                    <img src={deleteIcon} alt='Eliminar' className='icon' />
                    Eliminar Reporte
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

export default ObtenerReporte;
