import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateReport } from "../services/reporte.service.js"; // Asegúrate de que la ruta sea correcta
import { useLocation, useNavigate } from "react-router-dom";
import '../styles/EditReporte.css'

const EditReporte = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtén los datos del reporte desde la ubicación
    const reporte = location.state?.reporte;

    // Maneja el caso en que no se pasa el reporte correctamente
    if (!reporte) {
        return (
            <div>
                <Navbar />
                <div className="form-container">
                    <div className="form-wrapper">
                        <p>No se encontraron datos del reporte. Por favor, inténtalo de nuevo.</p>
                    </div>
                </div>
            </div>
        );
    }

    const modReporte = (data) => {
        console.log("Datos enviados para actualizar el reporte:", data); // Log para los datos que se envían

        updateReport(reporte._id, data)
            .then(response => {
                console.log("Reporte actualizado exitosamente:", response); // Log para la respuesta del servidor
                navigate('/obtenerreportes'); // Redirige a la página de reportes o donde desees
            })
            .catch(error => {
                console.error("Error al actualizar el reporte:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar Reporte"
                        fields={[
                            {
                                label: "Nombre del Recurso",
                                name: "resourceName",
                                placeholder: "Nombre del Recurso",
                                type: "text",
                                value: reporte.resourceName
                            },
                            {
                                label: "Frecuencia de Uso",
                                name: "usageFrequency",
                                placeholder: "Frecuencia de Uso",
                                type: "number",
                                value: reporte.usageFrequency
                            },
                            {
                                label: "Peak Hours",
                                name: "peakHours",
                                placeholder: "Peak Hours",
                                type: "text",
                                value: reporte.peakHours.join(', ') // Suponiendo que peakHours es un array de strings
                            },
                            {
                                label: "Estado del Equipo",
                                name: "equipmentStatus",
                                placeholder: "Estado del Equipo",
                                type: "select",
                                value: reporte.equipmentStatus,
                                options: ['Ok', 'Necesita mantencion', 'Fuera de Uso'] // Opciones para el select
                            },
                            {
                                label: "Última Actualización",
                                name: "lastUpdated",
                                placeholder: "Última Actualización",
                                type: "datetime-local",
                                value: new Date(reporte.lastUpdated).toISOString().slice(0, 16) // Convertir a formato 'yyyy-MM-ddTHH:mm'
                            }
                        ]}
                        buttonText="Guardar Cambios"
                        onSubmit={modReporte}
                    />
                </div>
            </div>
        </>
    );
};

export default EditReporte;
