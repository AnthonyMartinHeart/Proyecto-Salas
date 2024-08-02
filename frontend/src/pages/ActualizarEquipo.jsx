import React, { useEffect, useState } from 'react';
import { putService, getServiceUno } from '../services/Equipo.service';
import { useNavigate, useParams } from 'react-router-dom';
import Form from '../components/Form.jsx';
import Navbar from '../components/Navbar.jsx'; // Asegúrate de tener el componente Navbar importado
import '../styles/Actualizar.css';

export const Actualizar = () => {
  const { id } = useParams();
  const [equipo, setEquipo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipo = async () => {
      try {
        const response = await getServiceUno(id);
        setEquipo(response.data);
      } catch (error) {
        setError('Error al obtener los datos del equipo.');
      }
    };

    fetchEquipo();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      await putService(id, {
        ...data,
        fechaActualizacion: new Date(),
      });
      navigate('/Equipo/Listar');
    } catch (error) {
      setError('Error al actualizar el equipo.');
    }
  };

  if (!equipo) return <p>Cargando...</p>;

  return (
    <div className="actualizar-container">
      <Navbar /> {/* Agregado el Navbar aquí */}
      <Form
        title="Actualizar Equipo"
        fields={[
          {
            label: 'Nombre',
            name: 'nombre',
            placeholder: equipo.nombre || 'Nombre del equipo',
            type: 'text',
            value: equipo.nombre
          },
          {
            label: 'Descripción',
            name: 'descripcion',
            placeholder: equipo.descripcion || 'Descripción del equipo',
            type: 'text',
            value: equipo.descripcion
          },
          {
            label: 'Especificaciones',
            name: 'especificaciones',
            placeholder: equipo.especificaciones || 'Especificaciones',
            type: 'text',
            value: equipo.especificaciones
          },
          {
            label: 'Cantidad',
            name: 'cantidad',
            placeholder: equipo.cantidad || 'Cantidad',
            type: 'number',
            value: equipo.cantidad
          },
          {
            label: 'Condición de Uso',
            name: 'condicionUso',
            placeholder: equipo.condicionUso || 'Condición de uso',
            type: 'text',
            value: equipo.condicionUso
          },
          {
            label: 'Estado',
            name: 'estado',
            placeholder: equipo.estado || 'Estado',
            type: 'text',
            value: equipo.estado
          },
          {
            label: 'Mantenimiento',
            name: 'mantenimiento',
            placeholder: equipo.mantenimiento || 'Mantenimiento',
            type: 'text',
            value: equipo.mantenimiento
          }
        ]}
        buttonText="Actualizar Equipo"
        onSubmit={handleSubmit}
        footerContent={error && <p className="error">{error}</p>}
      />
    </div>
  );
};

export default Actualizar;