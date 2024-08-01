import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getAllReservas, deleteReserva } from '../services/reserva.service'; // Asegúrate de que la ruta sea correcta
import '../styles/ObtenerReserva.css'; // Asegúrate de tener estilos para este componente
import deleteIcon from '../assets/deleteIcon.svg';
import updateIcon from '../assets/updateIcon.svg';

const ObtenerReserva = () => {
  const [reservas, setReservas] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const data = await getAllReservas();
        setReservas(data);
        setError('');
      } catch (err) {
        setError(err.message || 'Error al obtener las reservas');
        console.error('Error: ', err);
      }
    };

    fetchReservas();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteReserva(id);
      setReservas(reservas.filter(reserva => reserva._id !== id));
    } catch (error) {
      setError(error.message || 'Error al eliminar la reserva');
      console.error("Error: ", error);
    }
  };

  const handleEdit = (id) => {
    const reserva = reservas.find(r => r._id === id);
    navigate(`/edit-reserva/${id}`, { state: { reserva } });
  };

  return (
    <>
      <Navbar />
      <div className='main-container'>
        {error && <div className='error-message'>{error}</div>}
        <table className='reserva-table'>
          <thead>
            <h1 className='form-title'>Obtener Reservas</h1>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Capacidad</th>
              <th>Horario</th>
              <th>Código Asignatura</th>
              <th>Código Clase</th>
              <th>Nombre Asignatura</th>
              <th>Nombre Profesor</th>
              <th>Cantidad</th>
              <th>Patrimonio</th>
              <th>Acción</th> {/* Columna para las acciones */}
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva._id}>
                <td>{reserva.nombre}</td>
                <td>{reserva.tipo}</td>
                <td>{reserva.capacidad}</td>
                <td>{reserva.horario}</td>
                <td>{reserva.codigoAsignatura}</td>
                <td>{reserva.codigoClase}</td>
                <td>{reserva.nombreAsignatura}</td>
                <td>{reserva.nombreProfesor}</td>
                <td>{reserva.cantidad}</td>
                <td>{reserva.patrimonio}</td>
                <td>
                  <button onClick={() => handleEdit(reserva._id)} className='action-button'>
                    <img src={updateIcon} alt='Editar' className='icon' />
                    Editar
                  </button>
                  <button onClick={() => handleDelete(reserva._id)} className='action-button'>
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

export default ObtenerReserva;
