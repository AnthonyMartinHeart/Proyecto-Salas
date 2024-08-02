import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getServices, delService } from '../services/Equipo.service';
import '../styles/Listar.css';
import deleteIcon from '../assets/deleteIcon.svg'; // Asegúrate de que la ruta del icono sea correcta
import updateIcon from '../assets/updateIcon.svg'; // Asegúrate de que la ruta del icono sea correcta

export const Listar = () => {
    const [equipos, setEquipos] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipos = async () => {
            try {
                const response = await getServices();
                setEquipos(response.data);
                setError('');
            } catch (err) {
                setError(err.message || 'Error al obtener la lista de equipos.');
                console.error('Error: ', err);
            }
        };

        fetchEquipos();
    }, []);

    const handleDelete = async (id) => {
        try {
            await delService(id);
            setEquipos(equipos.filter(equipo => equipo._id !== id));
        } catch (error) {
            setError(error.message || 'Error al eliminar el equipo');
            console.error('Error: ', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/Equipo/actualizar/${id}`);
    };

    return (
        <>
            <Navbar />
            <div className='error-message'>{error}</div>
            <h1 className='form-title'>Lista de Equipos</h1>
            <div className='table-container'>
                <table className='listar-table'>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Descripción</th>
                            <th>Especificaciones</th>
                            <th>Cantidad</th>
                            <th>Condición de Uso</th>
                            <th>Estado</th>
                            <th>Mantenimiento</th>
                            <th>Fecha de Adquisición</th>
                            <th>Fecha de Actualización</th>
                            <th>Acción</th> {/* Columna para las acciones */}
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.map((equipo) => (
                            <tr key={equipo._id}>
                                <td>{equipo.nombre}</td>
                                <td>{equipo.descripcion}</td>
                                <td>{equipo.especificaciones}</td>
                                <td>{equipo.cantidad}</td>
                                <td>{equipo.condicionUso}</td>
                                <td>{equipo.estado}</td>
                                <td>{equipo.mantenimiento}</td>
                                <td>{new Date(equipo.fechaAdquisicion).toLocaleDateString()}</td>
                                <td>{new Date(equipo.fechaActualizacion).toLocaleDateString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(equipo._id)} className='action-button'>
                                        <img src={updateIcon} alt='Actualizar' className='icon' />
                                        Actualizar
                                    </button>
                                    <button onClick={() => handleDelete(equipo._id)} className='action-button'>
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

export default Listar;