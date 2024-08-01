import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getNameRecursos, deleteRecurso } from '../services/recurso.service'; // Asegúrate de que la ruta sea correcta
import '../styles/ObtenerRecurso.css'; // Asegúrate de tener estilos para este componente
import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';

const ObtenerRecurso = () => {
  const [recursos, setRecursos] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecursos = async () => {
      try {
        const data = await getNameRecursos();
        setRecursos(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Error al obtener los recursos');
        console.error('Error: ', err);
      }
    };

    fetchRecursos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteRecurso(id);
      setRecursos(recursos.filter(recurso => recurso._id !== id));
    } catch (error) {
      setError(error.message || 'Error al eliminar el recurso');
      console.error("Error: ", error);
    }
  };

  const handleEdit = (id) => {
    const recurso = recursos.find(r => r._id === id);
    navigate(`/edit-recurso/${id}`, { state: { recurso } });
  };

  return (
    <>
      <Navbar />
      <div className='main-container'>
        {error && <div className='error-message'>{error}</div>}
        <table className='recurso-table'>
          <thead>
            <h1 className='form-title'>Obtener Recursos</h1>
            <tr>
              <th>Nombre</th>
              <th>Marca</th>
              <th>Modelo</th>
              <th>Cantidad</th>
              <th>Descripción</th>
              <th>Patrimonio</th>
              <th>Acción</th> {/* Columna para las acciones */}
            </tr>
          </thead>
          <tbody>
            {recursos.map((recurso) => (
              <tr key={recurso._id}>
                <td>{recurso.nombre}</td>
                <td>{recurso.marca}</td>
                <td>{recurso.modelo}</td>
                <td>{recurso.cantidad}</td>
                <td>{recurso.desc}</td>
                <td>{recurso.patrimonio}</td>
                <td>
                  <button onClick={() => handleEdit(recurso._id)} className='action-button'>
                    <img src={updateIcon} alt='Editar' className='icon' />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(recurso._id)} className='action-button'>
                    <img src={deleteIcon} alt='Eliminar' className='icon' />
                    Eliminar
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

export default ObtenerRecurso;
