import Form from "../components/Form.jsx";
import Navbar from "../components/Navbar.jsx";
import { updateReserva } from "../services/reserva.service.js";
import { useLocation, useNavigate } from "react-router-dom";

const EditReserva = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Obtén los datos de reserva desde la ubicación
    const reserva = location.state?.reserva;

    // Maneja el caso en que no se pasa la reserva correctamente
    if (!reserva) {
        return (
            <div>
                <Navbar />
                <div className="form-container">
                    <div className="form-wrapper">
                        <p>No se encontraron datos de reserva. Por favor, inténtalo de nuevo.</p>
                    </div>
                </div>
            </div>
        );
    }

    const modReserva = (data) => {
        console.log("Datos enviados para actualizar la reserva:", data); // Log para los datos que se envían

        updateReserva(reserva._id, data)
            .then(response => {
                console.log("Reserva actualizada exitosamente:", response); // Log para la respuesta del servidor
                navigate('/obtenerreservas'); // Redirige a la página de reservas o donde desees
            })
            .catch(error => {
                console.error("Error al actualizar la reserva:", error);
            });
    };

    return (
        <>
            <Navbar />
            <div className="form-container">
                <div className="form-wrapper">
                    <Form
                        title="Editar reserva"
                        fields={[
                            {
                                label: "Nombre",
                                name: "nombre",
                                placeholder: reserva.nombre || "Nombre de la reserva",
                                type: "text",
                                value: reserva.nombre
                            },
                            {
                                label: "Tipo",
                                name: "tipo",
                                placeholder: reserva.tipo || "Tipo de reserva",
                                type: "text",
                                value: reserva.tipo
                            },
                            {
                                label: "Capacidad",
                                name: "capacidad",
                                placeholder: reserva.capacidad || "Capacidad",
                                type: "number",
                                value: reserva.capacidad
                            },
                            {
                                label: "Horario",
                                name: "horario",
                                placeholder: reserva.horario || "Horario",
                                type: "text",
                                value: reserva.horario
                            },
                            {
                                label: "Código Asignatura",
                                name: "codigoAsignatura",
                                placeholder: reserva.codigoAsignatura || "Código Asignatura",
                                type: "text",
                                value: reserva.codigoAsignatura
                            },
                            {
                                label: "Código Clase",
                                name: "codigoClase",
                                placeholder: reserva.codigoClase || "Código Clase",
                                type: "text",
                                value: reserva.codigoClase
                            },
                            {
                                label: "Nombre Asignatura",
                                name: "nombreAsignatura",
                                placeholder: reserva.nombreAsignatura || "Nombre Asignatura",
                                type: "text",
                                value: reserva.nombreAsignatura
                            },
                            {
                                label: "Nombre Profesor",
                                name: "nombreProfesor",
                                placeholder: reserva.nombreProfesor || "Nombre Profesor",
                                type: "text",
                                value: reserva.nombreProfesor
                            },
                            {
                                label: "Cantidad",
                                name: "cantidad",
                                placeholder: reserva.cantidad || "Cantidad",
                                type: "number",
                                value: reserva.cantidad
                            },
                            {
                                label: "Patrimonio",
                                name: "patrimonio",
                                placeholder: reserva.patrimonio || "Patrimonio",
                                type: "text",
                                value: reserva.patrimonio
                            },
                        ]}
                        buttonText="Guardar cambios"
                        onSubmit={modReserva}
                    />
                </div>
            </div>
        </>
    );
};

export default EditReserva;
