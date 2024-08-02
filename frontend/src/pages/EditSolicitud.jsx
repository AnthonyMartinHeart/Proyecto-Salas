import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateSolicitud } from "../services/solicitud.service.js";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/EditSolicitud.css"

const EditSolicitud = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtén los datos de la solicitud desde la ubicación
    const solicitud = location.state?.solicitud;

    // Maneja el caso en que no se pasa la solicitud correctamente
    if (!solicitud) {
        return (
            <div>
                <Navbar />
                <div className="form-container">
                    <div className="form-wrapper">
                        <p>No se encontraron datos de la solicitud. Por favor, inténtalo de nuevo.</p>
                    </div>
                </div>
            </div>
        );
    }

    const modSolicitud = (data) => {
        console.log("Datos enviados para actualizar la solicitud:", data); // Log para los datos que se envían

        updateSolicitud(solicitud._id, data)
            .then(response => {
                console.log("Solicitud actualizada exitosamente:", response); // Log para la respuesta del servidor
                navigate('/obtenersolicitudes'); // Redirige a la página de solicitudes o donde desees
            })
            .catch(error => {
                console.error("Error al actualizar la solicitud:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar Solicitud"
                        fields={[
                            {
                                label: "Tipo",
                                name: "tipo",
                                placeholder: "Tipo",
                                type: "select",
                                options: [
                                    { value: 'sala', label: 'Sala' },
                                    { value: 'equipo', label: 'Equipo' }
                                ],
                                value: solicitud.tipo
                            },
                            {
                                label: "Recurso",
                                name: "recurso",
                                placeholder: "Recurso",
                                type: "text",
                                value: solicitud.recurso
                            },
                            {
                                label: "Fecha de Inicio",
                                name: "fechaInicio",
                                placeholder: "Fecha de Inicio",
                                type: "date",
                                value: solicitud.fechaInicio
                            },
                            {
                                label: "Fecha de Fin",
                                name: "fechaFin",
                                placeholder: "Fecha de Fin",
                                type: "date",
                                value: solicitud.fechaFin
                            },
                            {
                                label: "Estado",
                                name: "estado",
                                placeholder: "Estado",
                                type: "select",
                                options: [
                                    { value: 'pendiente', label: 'Pendiente' },
                                    { value: 'aprobada', label: 'Aprobada' },
                                    { value: 'rechazada', label: 'Rechazada' },
                                    { value: 'cancelada', label: 'Cancelada' }
                                ],
                                value: solicitud.estado
                            }
                        ]}
                        buttonText="Guardar Cambios"
                        onSubmit={modSolicitud}
                    />
                </div>
            </div>
        </>
    );
};

export default EditSolicitud;
