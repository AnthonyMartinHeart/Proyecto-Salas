import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateRecurso } from "../services/recurso.service.js";
import { useLocation, useNavigate } from "react-router-dom";

const EditRecurso = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtén los datos del recurso desde la ubicación
    const recurso = location.state?.recurso;

    // Maneja el caso en que no se pasa el recurso correctamente
    if (!recurso) {
        return (
            <div>
                <Navbar />
                <div className="form-container">
                    <div className="form-wrapper">
                        <p>No se encontraron datos del recurso. Por favor, inténtalo de nuevo.</p>
                    </div>
                </div>
            </div>
        );
    }

    const modRecurso = (data) => {
        console.log("Datos enviados para actualizar el recurso:", data); // Log para los datos que se envían

        updateRecurso(recurso._id, data)
            .then(response => {
                console.log("Recurso actualizado exitosamente:", response); // Log para la respuesta del servidor
                navigate('/obtenerrecursos'); // Redirige a la página de recursos o donde desees
            })
            .catch(error => {
                console.error("Error al actualizar el recurso:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar recurso"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                placeholder: recurso.nombre || "Nombre del recurso",
                                type: "text",
                                value: recurso.nombre
                            },
                            {
                                label: "Marca",
                                name: "marca",
                                placeholder: recurso.marca || "Marca",
                                type: "text",
                                value: recurso.marca
                            },
                            {
                                label: "Modelo",
                                name: "modelo",
                                placeholder: recurso.modelo || "Modelo",
                                type: "text",
                                value: recurso.modelo
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",
                                placeholder: recurso.cantidad || "Cantidad",
                                type: "number",
                                value: recurso.cantidad
                            },
                            {
                                label: "Descripción",
                                name: "desc",
                                placeholder: recurso.desc || "Descripción",
                                type: "text",
                                value: recurso.desc
                            },
                            {
                                label: "Patrimonio",
                                name: "patrimonio",
                                placeholder: recurso.patrimonio || "Patrimonio",
                                type: "text",
                                value: recurso.patrimonio
                            },
                        ]}
                        buttonText="Guardar cambios"
                        onSubmit={modRecurso}
                    />
                </div>
            </div>
        </>
    );
};

export default EditRecurso;
